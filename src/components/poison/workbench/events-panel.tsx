"use client";

import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type {
  PoisonCeasefireEvent,
  PoisonCrossReference,
  PoisonEventTimelineItem,
  PoisonMajorEvent,
} from "@/data/poison-dashboard";

interface EventsPanelProps {
  events: PoisonEventTimelineItem[];
  majorEvents: PoisonMajorEvent[];
  ceasefireEvents: PoisonCeasefireEvent[];
  crossReference: PoisonCrossReference;
}

export function EventsPanel({
  events,
  majorEvents,
  ceasefireEvents,
  crossReference,
}: EventsPanelProps) {
  return (
    <div className="grid gap-6">
      <ChartFrame
        id="event-cards"
        eyebrow="events"
        title="External events normalized into one working registry."
        caption="This top layer keeps the compact linked-event cards available for fast reading, but the denser major-event and ceasefire registries below are where the investigative depth actually sits."
        exportData={events}
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {events.map((event) => (
            <article key={`${event.window_month}-${event.label}`} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{event.event_date}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {event.window_month}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-black tracking-[-0.04em]">{event.label}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.description}</p>
              <a href={event.source_url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm text-primaryLight">
                {event.source_title}
              </a>
            </article>
          ))}
        </div>
      </ChartFrame>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <ChartFrame
          id="major-event-registry"
          eyebrow="major registry"
          title="Major regional events that define the long arc of the archive."
          caption="These entries are the wide-angle context markers: war openings, assassinations, diplomacy, ground escalation, and regional shocks that plausibly reset the conversation climate."
          exportData={majorEvents}
        >
          <div className="grid gap-3">
            {majorEvents.slice(0, 10).map((event) => (
              <article key={event.id} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{event.event_date}</div>
                  <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {event.incident_type}
                  </div>
                </div>
                <div className="mt-3 font-display text-xl font-black tracking-[-0.04em]">{event.label}</div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{event.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {event.topic_labels.slice(0, 4).map((label) => (
                    <span
                      key={`${event.id}-${label}`}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight/85"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </ChartFrame>

        <ChartFrame
          id="ceasefire-registry"
          eyebrow="ceasefire registry"
          title="Post-ceasefire micro-incidents are preserved because they can carry the most unusual downstream signals."
          caption="This layer is where village names, overflights, detentions, and targeted killings become useful. Small incidents matter here precisely because they often remain local and easy to miss."
          exportData={ceasefireEvents}
        >
          <div className="grid gap-3">
            {ceasefireEvents.slice(0, 12).map((event) => (
              <article key={event.id} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{event.event_date}</div>
                  <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {event.violation_type || event.incident_type}
                  </div>
                </div>
                <div className="mt-3 font-display text-xl font-black tracking-[-0.04em]">{event.label}</div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{event.location || event.region}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{event.summary}</p>
              </article>
            ))}
          </div>
        </ChartFrame>
      </div>

      <ChartFrame
        id="event-heuristics"
        eyebrow="analysis logic"
        title="Cross-reference heuristics should stay visible instead of hiding in a backend JSON."
        caption="The point of this panel is methodological clarity: it tells the reader how timing, obscure names, and event classes are supposed to be matched back into the subreddit archive."
        exportData={crossReference.matching_heuristics.map((rule) => ({ rule }))}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {crossReference.matching_heuristics.slice(0, 9).map((rule) => (
            <article key={rule} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <p className="text-sm leading-7 text-muted-foreground">{rule}</p>
            </article>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
