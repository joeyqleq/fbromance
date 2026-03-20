import Link from "next/link";
import { poisonReviewQueue } from "@/data/poison-dashboard";

export function UserPreviewSection() {
  const users = poisonReviewQueue.slice(0, 4);

  return (
    <section id="users" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="panel-chassis panel-glow p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <div className="signal-label">user anomaly preview</div>
            <h2 className="font-display text-4xl font-black tracking-[-0.07em] text-foreground sm:text-5xl">
              Manual review starts where the contradictions stack, not where intuition shouts loudest.
            </h2>
            <p className="data-caption">
              The review queue is not a verdict engine. It is a triage layer combining activity, subreddit overlap, and
              timing so the workbench can direct attention without overclaiming certainty.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {users.map((user) => (
              <Link
                key={user.author}
                href="/app/users"
                className="panel-chassis hover-lift rounded-[1.5rem] p-5 transition-colors hover:bg-card"
              >
                <div className="signal-label">{user.author}</div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="font-display text-3xl font-black tracking-[-0.06em]">{user.fb_total}</div>
                    <div className="mt-1 text-sm text-muted-foreground">subreddit comments/posts</div>
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-primaryLight">
                    review
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Active in: {user.active_subreddits} subs. Key overlap: {user.top_subreddits.split(",").slice(0, 2).join(", ")}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
