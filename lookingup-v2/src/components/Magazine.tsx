import { lazy, Suspense } from "react";
import { currentIssue } from "@/data/magazine";

const FlipBook = lazy(() => import("./FlipBook"));

export function Magazine() {
  return (
    <section id="magazine" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 min-w-0">
          <p className="eyebrow text-teal flex items-center gap-3 mb-4">
            <span className="w-10 h-px bg-teal" /> Latest Issue
          </p>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.04] text-ink text-balance">
            Read the <em className="italic text-teal-deep">digital edition</em>
          </h2>
          <p className="mt-6 text-lg text-ink/75 leading-relaxed max-w-md">
            Flip through the current issue right here — the same listings
            and features our readers see in print, now just a click away.
          </p>
          <p className="mt-6 eyebrow inline-flex items-center bg-teal/10 text-teal-deep rounded-full px-4 py-2 tracking-[0.06em]">
            {currentIssue.issueLabel}
          </p>
        </div>

        <div className="lg:col-span-7 min-w-0">
          <Suspense
            fallback={
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-teal-deep text-sm text-teal-soft shadow-teal">
                Loading viewer…
              </div>
            }
          >
            <FlipBook file={currentIssue.file} title={currentIssue.title} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
