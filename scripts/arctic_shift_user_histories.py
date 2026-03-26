#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import sys
import time
import urllib.parse
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Iterable

ROOT = Path('/Users/joeyq/Desktop/bromance')
RAW_ROOT = ROOT / 'raw' / 'user_histories'
MANIFEST_PATH = ROOT / 'raw' / 'user_history_manifest.csv'
CHECKLIST_PATH = ROOT / 'raw' / 'user_history_batch_checklist.md'
API_BASE = 'https://arctic-shift.photon-reddit.com'
USER_AGENT = 'codex-arctic-shift-downloader/1.0'
MANIFEST_COLUMNS = [
    'source_type',
    'source_name',
    'date_start',
    'date_end',
    'posts_downloaded',
    'comments_downloaded',
    'posts_path',
    'comments_path',
    'status',
    'notes',
]
FIRST_BATCH_USERS = [
    'ForbiddenBromance-ModTeam', 'cha3bghachim', 'amazing9999', 'CruntyMcNugget', 'victoryismind', 'TheGooblyGamer', 'Worldineatydays', 'ConnorStreetmann',
    'levnon14', 'EmperorChaos', 'LevantinePlantCult', 'IbnEzra613', 'FriendlyJewThrowaway', 'MajorTechnology8827', 'Tamtumtam', 'OptimismNeeded',
    'DaDerpyDude', 'Current-Meal9360', 'Glad-Difference-3238', 'MuskyScent972', 'Israelidru', 'tFighterPilot', 'Curious_Diver1005', 'Anonymous-Balls',
    'AdVivid8910', 'No-Mathematician5020', '62TiredOfLiving', 'Basic_Suggestion3476',
]
EXCLUDED_USERS = {'[deleted]', 'AutoModerator'}


@dataclass
class DownloadResult:
    rows: int
    min_created_utc: int | None
    max_created_utc: int | None
    output_path: Path


def iso_date_to_timestamp(date_str: str) -> int:
    dt = datetime.strptime(date_str, '%Y-%m-%d').replace(tzinfo=timezone.utc)
    return int(dt.timestamp())


def build_search_url(kind: str, username: str, after_ms: int, before_ms: int | None) -> str:
    params = {
        'author': username,
        'limit': 'auto',
        'sort': 'asc',
        'after': str(after_ms),
        'meta-app': 'download-tool',
    }
    if before_ms is not None:
        params['before'] = str(before_ms)
    return f"{API_BASE}/api/{kind}/search?{urllib.parse.urlencode(params)}"


def compute_next_after_ms(current_after_ms: int, last_created_utc: int, wrote_new_rows: bool) -> int:
    base_after_ms = last_created_utc * 1000
    if not wrote_new_rows:
        return base_after_ms + 1000
    if base_after_ms == current_after_ms:
        return base_after_ms + 1000
    return base_after_ms


def http_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def atomic_write_csv(path: Path, rows: list[dict[str, str]]) -> None:
    ensure_parent(path)
    with NamedTemporaryFile('w', delete=False, dir=str(path.parent), encoding='utf-8', newline='') as tmp:
        writer = csv.DictWriter(tmp, fieldnames=MANIFEST_COLUMNS)
        writer.writeheader()
        writer.writerows(rows)
        tmp_path = Path(tmp.name)
    tmp_path.replace(path)


def read_manifest(path: Path = MANIFEST_PATH) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open('r', encoding='utf-8', newline='') as fh:
        return list(csv.DictReader(fh))


def write_manifest(rows: list[dict[str, str]], path: Path = MANIFEST_PATH) -> None:
    atomic_write_csv(path, rows)


def init_batch(root: Path = ROOT, usernames: list[str] | None = None, start_date: str = '2019-01-01', end_date: str = 'now') -> Path:
    usernames = usernames or FIRST_BATCH_USERS
    raw_root = root / 'raw' / 'user_histories'
    manifest_path = root / 'raw' / 'user_history_manifest.csv'
    raw_root.mkdir(parents=True, exist_ok=True)

    existing = {row['source_name']: row for row in read_manifest(manifest_path)}
    rows: list[dict[str, str]] = []
    for username in usernames:
        user_dir = raw_root / username
        user_dir.mkdir(parents=True, exist_ok=True)
        row = existing.get(username, {
            'source_type': 'u',
            'source_name': username,
            'date_start': start_date,
            'date_end': end_date,
            'posts_downloaded': '',
            'comments_downloaded': '',
            'posts_path': str(user_dir / 'posts.jsonl'),
            'comments_path': str(user_dir / 'comments.jsonl'),
            'status': 'pending',
            'notes': '',
        })
        rows.append({k: row.get(k, '') for k in MANIFEST_COLUMNS})

    write_manifest(rows, manifest_path)
    write_checklist(root, usernames, start_date, end_date)
    return manifest_path


def write_checklist(root: Path, usernames: list[str], start_date: str, end_date: str) -> None:
    lines = [
        '# Arctic Shift User History Batch Checklist',
        '',
        f'- Date range: `{start_date}` to `{end_date}`',
        '- Source type: `u/`',
        '- Save raw files untouched as `posts.jsonl` and `comments.jsonl` under `raw/user_histories/<username>/`',
        '',
        '## Usernames',
    ]
    lines.extend([f'- `{u}`' for u in usernames])
    ensure_parent(root / 'raw' / 'user_history_batch_checklist.md')
    (root / 'raw' / 'user_history_batch_checklist.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')


def stream_download(kind: str, username: str, start_ms: int, before_ms: int | None, output_path: Path, sleep_seconds: float = 0.25) -> DownloadResult:
    ensure_parent(output_path)
    current_ms = start_ms
    total_rows = 0
    min_created_utc = None
    max_created_utc = None
    seen_ids: set[str] = set()

    with NamedTemporaryFile('w', delete=False, dir=str(output_path.parent), encoding='utf-8', newline='') as tmp:
        tmp_path = Path(tmp.name)
        while True:
            url = build_search_url(kind, username, current_ms, before_ms)
            payload = http_json(url)
            if payload.get('error'):
                raise RuntimeError(payload['error'])
            data = payload.get('data') or []
            if not data:
                break
            wrote_new_rows = False
            for item in data:
                item_id = item.get('id')
                if isinstance(item_id, str) and item_id in seen_ids:
                    continue
                if isinstance(item_id, str):
                    seen_ids.add(item_id)
                tmp.write(json.dumps(item, ensure_ascii=False))
                tmp.write('\n')
                total_rows += 1
                wrote_new_rows = True
                created = item.get('created_utc')
                if isinstance(created, int):
                    min_created_utc = created if min_created_utc is None else min(min_created_utc, created)
                    max_created_utc = created if max_created_utc is None else max(max_created_utc, created)
            last_created = data[-1].get('created_utc')
            if not isinstance(last_created, int):
                break
            current_ms = compute_next_after_ms(current_ms, last_created, wrote_new_rows)
            time.sleep(sleep_seconds)
    tmp_path.replace(output_path)
    return DownloadResult(total_rows, min_created_utc, max_created_utc, output_path)


def validate_download_file(path: Path, start_ts: int, end_ts: int) -> dict:
    rows = 0
    min_created_utc = None
    max_created_utc = None
    valid = True
    errors: list[str] = []

    if not path.exists():
        return {'valid': False, 'rows': 0, 'min_created_utc': None, 'max_created_utc': None, 'errors': ['missing file']}

    with path.open('r', encoding='utf-8') as fh:
        for lineno, line in enumerate(fh, start=1):
            if not line.strip():
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError as exc:
                valid = False
                errors.append(f'line {lineno}: invalid json ({exc})')
                continue
            rows += 1
            created = obj.get('created_utc')
            if not isinstance(created, int):
                valid = False
                errors.append(f'line {lineno}: missing created_utc')
                continue
            min_created_utc = created if min_created_utc is None else min(min_created_utc, created)
            max_created_utc = created if max_created_utc is None else max(max_created_utc, created)
            if created < start_ts or created > end_ts:
                valid = False
                errors.append(f'line {lineno}: created_utc {created} out of range')

    if rows == 0:
        valid = False
        errors.append('empty file')

    return {
        'valid': valid,
        'rows': rows,
        'min_created_utc': min_created_utc,
        'max_created_utc': max_created_utc,
        'errors': errors,
    }


def update_row(rows: list[dict[str, str]], username: str, **updates: str) -> None:
    for row in rows:
        if row['source_name'] == username:
            row.update({k: str(v) for k, v in updates.items()})
            return
    raise KeyError(username)


def download_batch(root: Path = ROOT, max_users: int | None = None, usernames: Iterable[str] | None = None, retry_errors: bool = True) -> list[dict[str, str]]:
    manifest_path = root / 'raw' / 'user_history_manifest.csv'
    rows = read_manifest(manifest_path)
    if not rows:
        raise SystemExit('Manifest missing. Run init first.')

    target_users = set(usernames) if usernames else None
    processed = 0
    start_ts = iso_date_to_timestamp('2019-01-01')
    now_ts = int(datetime.now(tz=timezone.utc).timestamp())

    for row in rows:
        username = row['source_name']
        if target_users and username not in target_users:
            continue
        if row['status'] == 'completed':
            continue
        if row['status'] == 'error' and not retry_errors:
            continue
        if max_users is not None and processed >= max_users:
            break

        update_row(rows, username, status='in_progress', notes='')
        write_manifest(rows, manifest_path)

        posts_path = Path(row['posts_path'])
        comments_path = Path(row['comments_path'])
        before_ms = None if row['date_end'] == 'now' else iso_date_to_timestamp(row['date_end']) * 1000

        try:
            posts = stream_download('posts', username, start_ts * 1000, before_ms, posts_path)
            comments = stream_download('comments', username, start_ts * 1000, before_ms, comments_path)
            update_row(
                rows,
                username,
                posts_downloaded=posts.rows,
                comments_downloaded=comments.rows,
                status='completed',
                notes=f'posts={posts.rows}; comments={comments.rows}',
            )
        except Exception as exc:  # noqa: BLE001
            update_row(rows, username, status='error', notes=str(exc))
        write_manifest(rows, manifest_path)
        processed += 1

    return rows


def validate_batch(root: Path = ROOT) -> list[dict[str, str]]:
    manifest_path = root / 'raw' / 'user_history_manifest.csv'
    rows = read_manifest(manifest_path)
    if not rows:
        raise SystemExit('Manifest missing. Run init first.')

    start_ts = iso_date_to_timestamp('2019-01-01')
    end_ts = int(datetime.now(tz=timezone.utc).timestamp())
    results = []
    for row in rows:
        posts = validate_download_file(Path(row['posts_path']), start_ts, end_ts)
        comments = validate_download_file(Path(row['comments_path']), start_ts, end_ts)
        results.append({
            'source_name': row['source_name'],
            'status': row['status'],
            'posts_valid': posts['valid'],
            'comments_valid': comments['valid'],
            'posts_rows': posts['rows'],
            'comments_rows': comments['rows'],
        })
    return results


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Download Arctic Shift user histories for the first investigation batch.')
    sub = parser.add_subparsers(dest='command', required=True)

    init_p = sub.add_parser('init', help='Create intake directories, manifest, and checklist.')
    init_p.add_argument('--root', default=str(ROOT))

    dl_p = sub.add_parser('download', help='Download pending user histories into the manifest paths.')
    dl_p.add_argument('--root', default=str(ROOT))
    dl_p.add_argument('--max-users', type=int, default=None)
    dl_p.add_argument('--users', nargs='*', default=None)
    dl_p.add_argument('--no-retry-errors', action='store_true')

    val_p = sub.add_parser('validate', help='Validate saved raw files and print a summary.')
    val_p.add_argument('--root', default=str(ROOT))

    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    root = Path(args.root)

    if args.command == 'init':
        manifest = init_batch(root=root)
        print(manifest)
        return 0
    if args.command == 'download':
        rows = download_batch(root=root, max_users=args.max_users, usernames=args.users, retry_errors=not args.no_retry_errors)
        summary = {row['status']: 0 for row in rows}
        for row in rows:
            summary[row['status']] = summary.get(row['status'], 0) + 1
        print(json.dumps(summary, indent=2, sort_keys=True))
        return 0
    if args.command == 'validate':
        results = validate_batch(root=root)
        print(json.dumps(results, indent=2))
        return 0
    return 1


if __name__ == '__main__':
    raise SystemExit(main())
