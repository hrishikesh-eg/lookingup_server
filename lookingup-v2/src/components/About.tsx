const PILLARS = [
  {
  label: "Where we started",
  title: "Starting in print, 2022",
  body: "Looking Up began in 2022 as a print trade magazine, placing manufacturer listings directly in front of the buyers and procurement teams who read it issue after issue.",
},
  {
    label: "Where we are now",
    title: "A digital marketplace",
    body: "That same trusted listing model now lives online — a faster, searchable directory where buyers find verified suppliers without losing the editorial credibility of the magazine.",
  },
  {
    label: "How it works",
    title: "One inquiry, direct delivery",
    body: "Every company on this site is a real, vetted client. A single inquiry form puts a buyer's request straight into that company's inbox — no middleman, no delay.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <p className="eyebrow text-teal flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-teal" />
            About Looking Up
          </p>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.04] text-ink text-balance">
            From the printed page to the search bar —
            <em className="italic text-teal-deep"> the listings buyers trust</em> haven't changed.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-5">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              className="group relative bg-paper/70 backdrop-blur border border-teal/15 rounded-2xl p-8 lg:p-10 hover:border-teal/40 hover:shadow-teal transition-all"
            >
              <div className="flex items-start gap-6">
                <span className="font-display text-5xl text-teal-deep/30 group-hover:text-teal-deep leading-none transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="eyebrow text-gold">{p.label}</p>
                  <h3 className="font-display text-3xl mt-2 text-teal-deep">{p.title}</h3>
                  <p className="mt-3 text-ink/75 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
