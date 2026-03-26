import unittest

from phase2_deep_analysis import (
    compute_manual_review_score,
    compute_spike_scores,
    detect_hebrew,
    month_from_utc,
    resolve_target_author,
)


class Phase2DeepAnalysisTests(unittest.TestCase):
    def test_month_from_utc_uses_utc(self):
        self.assertEqual(month_from_utc(1569501748), '2019-09')

    def test_detect_hebrew(self):
        self.assertTrue(detect_hebrew('שלום from Haifa'))
        self.assertFalse(detect_hebrew('plain english only'))

    def test_compute_spike_scores_orders_highest_zscore_first(self):
        scores = compute_spike_scores({
            '2024-06': 10,
            '2024-07': 11,
            '2024-08': 12,
            '2024-09': 40,
        })
        self.assertEqual(scores[0]['month'], '2024-09')
        self.assertGreater(scores[0]['zscore'], 1.5)

    def test_resolve_target_author_prefers_parent_comment_then_post(self):
        comments = {'t1_reply': {'author': 'comment_parent'}}
        posts = {'t3_post': {'author': 'post_parent'}}
        self.assertEqual(resolve_target_author('t1_reply', comments, posts), 'comment_parent')
        self.assertEqual(resolve_target_author('t3_post', comments, posts), 'post_parent')
        self.assertIsNone(resolve_target_author('t1_missing', comments, posts))

    def test_manual_review_score_flags_claimed_lebanese_with_israel_hebrew_context(self):
        score, reasons = compute_manual_review_score({
            'fb_top_flair': 'Lebanese',
            'fb_hebrew_items': 18,
            'outside_forbidden_bromance_comments': 1200,
            'outside_israel_related_comments': 800,
            'outside_lebanon_related_comments': 5,
            'outside_hebrew_items': 140,
            'fb_comments': 300,
            'fb_posts': 10,
        })
        self.assertGreaterEqual(score, 70)
        self.assertTrue(any('claimed Lebanese flair' in reason for reason in reasons))
        self.assertTrue(any('Hebrew activity' in reason for reason in reasons))

    def test_manual_review_score_does_not_overflag_claimed_israeli_profile(self):
        score, reasons = compute_manual_review_score({
            'fb_top_flair': 'Israeli',
            'fb_hebrew_items': 12,
            'outside_forbidden_bromance_comments': 900,
            'outside_israel_related_comments': 700,
            'outside_lebanon_related_comments': 8,
            'outside_hebrew_items': 90,
            'fb_comments': 200,
            'fb_posts': 5,
        })
        self.assertLess(score, 55)
        self.assertFalse(any('claimed Lebanese flair' in reason for reason in reasons))


if __name__ == '__main__':
    unittest.main()
