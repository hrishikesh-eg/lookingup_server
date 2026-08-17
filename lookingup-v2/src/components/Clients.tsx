import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { customers, type Customer, type Product } from "@/data/site";
import { InquiryModal } from "./InquiryModal";

const BATCH_SIZE = 8;

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Clients() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [inquiry, setInquiry] = useState<{ customer: Customer; product: Product } | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(customers.map((c) => c.category).filter(Boolean) as string[]))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      const okCat = active === "All" || c.category === active;
      const okQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.products || []).some((p) => p.name.toLowerCase().includes(q));
      return okCat && okQ;
    });
  }, [active, query]);

  // Reset back to the first batch whenever the filter/search changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [active, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="clients" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-10">
          <div>
            <p className="eyebrow text-teal flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-teal" /> Directory
            </p>
            <h2 className="font-display text-5xl lg:text-7xl leading-[1.0]">
              Featured <em className="italic text-teal-deep">companies</em>
            </h2>
          </div>
          <div className="w-full md:w-96 relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company or product…"
              className="w-full bg-paper/70 backdrop-blur border border-teal/20 rounded-full py-3 pl-12 pr-5 text-base placeholder:text-ink/40 focus:outline-none focus:border-teal focus:bg-paper transition"
              aria-label="Search companies or products"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal/60">⌕</span>
          </div>
        </div>

        {/* <div className="flex flex-wrap gap-2 mb-12" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full border transition-all ${
                active === cat
                  ? "gradient-teal text-paper border-transparent shadow-teal"
                  : "bg-paper/60 text-ink/70 border-teal/20 hover:border-teal hover:text-teal-deep"
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}

        {filtered.length === 0 ? (
          <p className="text-center py-20 text-ink/60 font-display text-2xl italic">
            No companies match "{query}". Try a different search.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((c) => (
                <article
                  key={c.id}
                  className="group relative bg-paper/80 backdrop-blur border border-teal/15 rounded-2xl p-8 lg:p-10 flex flex-col hover:border-teal/40 hover:shadow-teal transition-all"
                >
                  <div className="flex items-start gap-5 pb-6 border-b border-teal/15">
                    <div className="w-16 h-16 rounded-xl grid place-items-center gradient-teal text-paper font-display text-2xl shrink-0 shadow-teal">
                      {c.logo ? (
                        <img src={c.logo} alt="" className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        initials(c.name)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="eyebrow text-gold">{c.category || "Directory Listing"}</p>
                      <h3 className="font-display text-3xl mt-1 leading-tight text-teal-deep">{c.name}</h3>
                      {c.joinedYear && <p className="eyebrow text-ink/40 mt-2">Listed since {c.joinedYear}</p>}
                    </div>
                  </div>

                  {c.description ? (
                    <p className="mt-6 text-ink/75 leading-relaxed">{c.description}</p>
                  ) : (
                    <p className="mt-6 text-ink/40 italic text-sm">Company profile coming soon.</p>
                  )}

                  {c.products && c.products.length > 0 ? (
                    <ul className="mt-6 space-y-3 flex-1">
                      {c.products.map((p) => (
                        <li
                          key={p.id}
                          className="flex items-start gap-4 p-4 rounded-xl border border-teal/10 bg-cream/40 hover:border-teal/30 hover:bg-cream/70 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-teal-deep">{p.name}</p>
                            <p className="text-sm text-ink/65 mt-1 leading-relaxed">{p.description}</p>
                          </div>
                          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Link
                              to={`/product/${p.id}`}
                              className="border border-teal/30 text-teal-deep text-xs uppercase tracking-wider px-4 py-2 rounded-full text-center hover:bg-teal/10 transition-colors"
                            >
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => setInquiry({ customer: c, product: p })}
                              className="gradient-teal text-paper text-xs uppercase tracking-wider px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                            >
                              Inquire →
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-6 text-ink/40 italic text-sm flex-1">Products coming soon.</p>
                  )}
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((v) => v + BATCH_SIZE)}
                  className="border border-teal/30 text-teal-deep px-8 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-teal/10 transition-colors"
                >
                  Show More ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {inquiry && (
        <InquiryModal customer={inquiry.customer} product={inquiry.product} onClose={() => setInquiry(null)} />
      )}
    </section>
  );
}