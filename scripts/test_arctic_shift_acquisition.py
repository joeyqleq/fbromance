import csv
import json
import tempfile
import unittest
from pathlib import Path

import importlib.util
import sys

MODULE_PATH = Path('/Users/joeyq/Desktop/bromance/arctic_shift_user_histories.py')
spec = importlib.util.spec_from_file_location('arctic_shift_user_histories', MODULE_PATH)
module = importlib.util.module_from_spec(spec) if spec and spec.loader else None
if module:
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)


class ArcticShiftAcquisitionTests(unittest.TestCase):
    def setUp(self) -> None:
        if module is None:
            self.fail('arctic_shift_user_histories.py is missing')

    def test_build_search_url_omits_before_for_now(self) -> None:
        url = module.build_search_url('comments', 'victoryismind', after_ms=1546300800000, before_ms=None)
        self.assertIn('/api/comments/search?', url)
        self.assertIn('author=victoryismind', url)
        self.assertIn('after=1546300800000', url)
        self.assertNotIn('before=', url)
        self.assertIn('limit=auto', url)
        self.assertIn('sort=asc', url)


    def test_compute_next_after_ms_advances_when_page_adds_no_new_rows(self) -> None:
        next_after = module.compute_next_after_ms(current_after_ms=1700000000000, last_created_utc=1700000000, wrote_new_rows=False)
        self.assertEqual(1700000001000, next_after)

    def test_init_batch_creates_manifest_and_user_dirs(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            manifest = module.init_batch(root=root, usernames=['alice', 'Bob'], start_date='2019-01-01', end_date='now')
            self.assertTrue(manifest.exists())

            with manifest.open(newline='', encoding='utf-8') as fh:
                rows = list(csv.DictReader(fh))

            self.assertEqual(module.MANIFEST_COLUMNS, list(rows[0].keys()))
            self.assertEqual(2, len(rows))
            self.assertEqual('pending', rows[0]['status'])
            self.assertEqual('u', rows[0]['source_type'])
            self.assertTrue((root / 'raw' / 'user_histories' / 'alice').exists())
            self.assertTrue((root / 'raw' / 'user_histories' / 'Bob').exists())

    def test_validate_download_file_checks_rows_and_date_range(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'comments.jsonl'
            rows = [
                {'id': 'a', 'created_utc': 1546300800, 'author': 'alice'},
                {'id': 'b', 'created_utc': 1546387200, 'author': 'alice'},
            ]
            with path.open('w', encoding='utf-8') as fh:
                for row in rows:
                    fh.write(json.dumps(row) + '\n')

            result = module.validate_download_file(path, start_ts=1546300800, end_ts=1893456000)
            self.assertEqual(2, result['rows'])
            self.assertTrue(result['valid'])
            self.assertEqual(1546300800, result['min_created_utc'])
            self.assertEqual(1546387200, result['max_created_utc'])


if __name__ == '__main__':
    unittest.main()
