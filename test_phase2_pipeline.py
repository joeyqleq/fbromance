import csv
import json
import subprocess
import unittest
from pathlib import Path

ROOT = Path('/Users/joeyq/Desktop/bromance')
CLEANER = ROOT / 'clean_reddit_archive.py'
ANALYSIS = ROOT / 'phase2_kickoff_analysis.py'
POSTS_OUT = ROOT / 'r_ForbiddenBromance_posts.cleaned.ndjson'
COMMENTS_OUT = ROOT / 'r_ForbiddenBromance_comments.cleaned.ndjson'
PROMPT_OUT = ROOT / 'perplexity_phase2_prompt.md'
REPORT_OUT = ROOT / 'phase2_preliminary_report.md'
FLAIR_CSV = ROOT / 'phase2_outputs' / 'flair_summary.csv'
AUTHORS_CSV = ROOT / 'phase2_outputs' / 'top_authors.csv'


class Phase2PipelineTests(unittest.TestCase):
    def test_cleaner_keeps_visible_user_flair(self) -> None:
        subprocess.run(['python3', str(CLEANER)], check=True, cwd=ROOT)

        with POSTS_OUT.open('r', encoding='utf-8') as fh:
            post = json.loads(next(fh))
        with COMMENTS_OUT.open('r', encoding='utf-8') as fh:
            comment = json.loads(next(fh))

        self.assertIn('author_flair_text', post)
        self.assertIn('author_flair_text', comment)

    def test_prompt_mentions_flair_as_identity_signal(self) -> None:
        subprocess.run(['python3', str(CLEANER)], check=True, cwd=ROOT)
        prompt = PROMPT_OUT.read_text(encoding='utf-8')

        self.assertIn('author_flair_text', prompt)
        self.assertIn('visible user flair', prompt)
        self.assertIn('self-presented identity label', prompt)

    def test_analysis_emits_flair_summary_and_report_section(self) -> None:
        subprocess.run(['python3', str(CLEANER)], check=True, cwd=ROOT)
        subprocess.run(['python3', str(ANALYSIS)], check=True, cwd=ROOT)

        self.assertTrue(FLAIR_CSV.exists())
        self.assertTrue(REPORT_OUT.exists())

        with FLAIR_CSV.open('r', encoding='utf-8') as fh:
            reader = csv.DictReader(fh)
            headers = reader.fieldnames or []
        self.assertIn('flair', headers)
        self.assertIn('posts', headers)
        self.assertIn('comments', headers)
        self.assertIn('distinct_authors', headers)

        with AUTHORS_CSV.open('r', encoding='utf-8') as fh:
            headers = csv.DictReader(fh).fieldnames or []
        self.assertIn('top_flair', headers)

        report = REPORT_OUT.read_text(encoding='utf-8')
        self.assertIn('Flair Signals', report)
        self.assertIn('author_flair_text', report)


if __name__ == '__main__':
    unittest.main()
