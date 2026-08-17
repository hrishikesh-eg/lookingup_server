import { customers } from "@/data/site";
import logo from "@/assets/logos/lookingup-icon.png";

export function Hero() {
  const clientCount = customers.length;
  const productCount = customers.reduce((s, c) => s + (c.products?.length || 0), 0);

  return (
    <section className="relative pt-20 lg:pt-28 pb-20 lg:pb-28 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-teal/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[460px] h-[460px] rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-teal flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-teal" />
            The B2B Sourcing Magazine · Est. 2022
          </p>

          <h1 className="font-display text-[clamp(2.75rem,7.5vw,6.75rem)] leading-[0.98] text-ink text-balance">
            Where buyers come
            <span className="relative inline-block mx-3">
              <span className="italic text-teal-deep">looking</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 6 Q 100 -2 198 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-gold"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            for you.
          </h1>

          <p className="mt-10 text-lg lg:text-xl text-ink/70 max-w-xl leading-relaxed">
            Looking Up Business Solutions features verified manufacturers and
            suppliers in a trade magazine read by the buyers actively
            searching for them. Every listing here is a real company —
            every inquiry goes straight to their inbox.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#clients"
              className="group inline-flex items-center gap-3 gradient-teal text-paper px-7 py-4 rounded-full text-sm font-medium shadow-teal hover:opacity-95 transition"
            >
              Browse Featured Companies
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-teal-deep/30 text-teal-deep px-7 py-4 rounded-full text-sm font-medium hover:bg-teal-deep hover:text-paper transition-colors"
            >
              Get Listed
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-3 gradient-teal rounded-3xl opacity-20 blur-2xl" aria-hidden />
            <div className="relative bg-paper/80 backdrop-blur-xl border border-teal/20 rounded-3xl p-8 lg:p-10 shadow-teal">
              <div className="flex items-center justify-between eyebrow text-teal/70">
                <span>Issue No. 2026</span>
                <span className="px-2 py-0.5 rounded-full bg-gold/20 text-teal-deep">Featured</span>
              </div>

              <div className="mt-8 mx-auto w-44 h-44 rounded-full grid place-items-center bg-gradient-to-br from-cream to-paper ring-1 ring-teal/15 animate-float">
                <img src={logo} alt="Looking Up Business Solutions" className="w-36 h-36 object-contain" />
              </div>

              <p className="text-center font-display text-3xl mt-6 text-teal-deep leading-tight">
                The Directory
                <br />
                <em className="italic text-teal">trusted by buyers.</em>
              </p>

              <div className="mt-8 pt-6 border-t border-teal/15">
                <p className="eyebrow text-teal/60 mb-3">Featured this issue</p>
                <ul className="space-y-2.5 text-sm">
                  {customers.slice(0, 4).map((c, i) => (
                    <li key={c.id} className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-gold">0{i + 1}</span>
                      <span className="flex-1 text-ink/85">{c.name}</span>
                      <span className="font-mono text-xs text-teal/50">p.{(i + 1) * 12}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-20 lg:mt-28 mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-3 gap-px bg-teal/15 rounded-2xl overflow-hidden border border-teal/15">
          {[
            { v: `${clientCount}+`, l: "Companies featured" },
            { v: `${productCount}+`, l: "Products listed" },
            { v: "03", l: "Exhibitions attended" },
          ].map((s, i) => (
            <div key={i} className="bg-paper/80 backdrop-blur-sm py-8 lg:py-10 px-4 lg:px-8 text-center">
              <p className="font-display text-5xl lg:text-7xl text-teal-deep leading-none">{s.v}</p>
              <p className="eyebrow text-teal/70 mt-3">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}