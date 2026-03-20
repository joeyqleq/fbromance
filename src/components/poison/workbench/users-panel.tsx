"use client";

import { ResizeFrame } from "@/components/poison/workbench/resize-frame";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type { PoisonReviewQueueItem, PoisonUserHistorySummary } from "@/data/poison-dashboard";

interface UsersPanelProps {
  users: PoisonReviewQueueItem[];
  summaries: PoisonUserHistorySummary[];
}

export function UsersPanel({ users, summaries }: UsersPanelProps) {
  const summaryByAuthor = new Map(summaries.map((item) => [item.author, item]));

  return (
    <div className="grid gap-6">
      <ChartFrame
        id="users-review"
        eyebrow="users"
        title="Manual review queue for contradiction-led investigation."
        caption="This table prioritizes accounts for human reading. It does not assign guilt or identity certainty. It only concentrates attention where behavior, timing, overlap, and outside history look most worth checking."
        exportData={users}
      >
        <ResizeFrame className="max-h-[34rem] min-h-[22rem]">
          <div className="min-w-[1120px]">
            <div className="grid grid-cols-[1.1fr_0.55fr_0.7fr_0.7fr_0.7fr_0.7fr_1.1fr] gap-4 border-b border-white/10 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span>author</span>
              <span>score</span>
              <span>fb total</span>
              <span>all total</span>
              <span>Israel rel.</span>
              <span>Hebrew</span>
              <span>top subreddits</span>
            </div>
            {users.map((user) => {
              const summary = summaryByAuthor.get(user.author);
              return (
                <div
                  key={user.author}
                  className="grid grid-cols-[1.1fr_0.55fr_0.7fr_0.7fr_0.7fr_0.7fr_1.1fr] gap-4 border-b border-white/5 px-4 py-4 text-sm"
                >
                  <div className="space-y-1">
                    <div className="font-display text-xl font-black tracking-[-0.04em]">{user.author}</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-primaryLight">{user.fb_top_flair ?? "unknown flair"}</div>
                  </div>
                  <div className="font-display text-2xl font-black tracking-[-0.04em]">{user.manual_review_score}</div>
                  <div className="font-display text-2xl font-black tracking-[-0.04em]">{user.fb_total}</div>
                  <div className="font-display text-2xl font-black tracking-[-0.04em]">{user.all_total}</div>
                  <div className="text-muted-foreground">
                    {summary?.outside_israel_related_comments ?? user.outside_israel_related_comments ?? 0}
                  </div>
                  <div className="text-muted-foreground">
                    {Number(summary?.outside_hebrew_items ?? user.outside_hebrew_items ?? 0).toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">{user.top_subreddits}</div>
                </div>
              );
            })}
          </div>
        </ResizeFrame>
      </ChartFrame>

      <ChartFrame
        id="users-reasons"
        eyebrow="review reasons"
        title="The queue should expose why each account was promoted, not just who topped the list."
        caption="These reason cards keep the account layer grounded. They preserve the rationale behind each review score so the site does not silently turn heuristics into verdicts."
        exportData={users}
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {users.slice(0, 8).map((user) => (
            <article key={`${user.author}-reason`} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="font-display text-2xl font-black tracking-[-0.04em]">{user.author}</div>
                <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight">
                  score {user.manual_review_score}
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {user.manual_review_reasons || "High-volume cross-subreddit behavior preserved for manual review."}
              </p>
            </article>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
