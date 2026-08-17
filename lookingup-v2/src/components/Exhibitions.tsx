import { exhibitions } from "@/data/site";

export function Exhibitions() {
  return (
    <section id="exhibitions" className="py-24 lg:py-32 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-teal flex items-center gap-3 mb-4">
            <span className="w-10 h-px bg-teal" /> On the Floor
          </p>
          <h2 className="font-display text-5xl lg:text-7xl leading-[1.0]">
            Where we've <em className="italic text-teal-deep">shown up</em>
          </h2>
          <p className="mt-6 text-lg text-ink/75 leading-relaxed">
            Beyond the page, Looking Up represents its clients in person —
            here's a look at the trade exhibitions we've attended.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Center spine — desktop/tablet only */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-teal/25 to-transparent lg:block" />

          <div className="flex flex-col gap-16 lg:gap-24">
            {exhibitions.map((ex, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={ex.id} className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  {/* Center dot marker - desktop only */}
                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-teal lg:block" />

                  {/* Image */}
                  <div className={`${isEven ? "lg:order-1" : "lg:order-2"} w-full max-w-md mx-auto lg:mx-0`}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl gradient-teal shadow-teal">
                      {ex.image ? (
                        <img
                          src={ex.image}
                          alt={ex.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-deep/60 group-hover:to-teal-deep/30 transition-all" />
                          <div className="absolute inset-0 grid place-items-center">
                            <span className="font-display text-7xl lg:text-8xl text-paper italic group-hover:scale-110 transition-transform duration-500">
                              {ex.year}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="absolute top-4 left-4 eyebrow text-paper/80">
                        N° {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gold" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`${isEven ? "lg:order-2" : "lg:order-1"} ${isEven ? "lg:text-left" : "lg:text-right"}`}>
                    <p className="eyebrow text-teal">{ex.year}</p>
                    <p className="font-display mt-2 text-3xl leading-tight text-teal-deep lg:text-4xl">
                      {ex.title}
                    </p>
                    <p className="eyebrow mt-3 text-ink/60">{ex.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}