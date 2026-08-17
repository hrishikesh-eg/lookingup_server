import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { upcomingExhibitions } from "@/data/upcomingExhibitions";

const AUTO_ADVANCE_MS = 6000;


export function ExhibitionCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();

  const slides = upcomingExhibitions;
  const hasMultiple = slides.length > 1;

  const goTo = useCallback(
    (i: number) => {
      const next = (i + slides.length) % slides.length;
      setIndex(next);
    },
    [slides.length]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!hasMultiple || isPaused) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [hasMultiple, isPaused, goNext]);

  if (slides.length === 0) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="top"
      aria-label="Upcoming exhibitions"
      className="relative mt-20 h-[380px] w-full overflow-hidden bg-teal-deep shadow-teal sm:h-[320px] md:h-[340px] lg:h-[360px] xl:h-[380px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-full w-full">
        {slides.map((slide, i) => {
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? "visible opacity-100" : "invisible opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              <button
                type="button"
                onClick={() => navigate("/promo")}
                aria-label={slide.title}
                className="group block h-full w-full text-left"
              >
                {slide.desktopImage ? (
                  <picture>
                    {slide.mobileImage && (
                      <source media="(max-width: 860px)" srcSet={slide.mobileImage} />
                    )}
                    <img
                      src={slide.desktopImage}
                      alt={slide.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </picture>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gradient-teal p-4 text-center">
                    <p className="eyebrow text-gold/80 mb-2.5">Upcoming Exhibition</p>
                    <h2 className="font-display max-w-lg text-paper text-xl sm:text-2xl">{slide.title}</h2>
                    {slide.dateLabel && (
                      <p className="mt-3.5 text-sm text-teal-soft">
                        {slide.location ? `${slide.location} · ` : ""}
                        {slide.dateLabel}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-paper/55">Banner image coming soon</p>
                  </div>
                )}

                {/* Visual cue only - whole banner is already clickable via
                    the parent button, this just makes that obvious */}
                <span className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-teal-deep/80 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper shadow-teal backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                  </span>
                  View <span aria-hidden>→</span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-teal-soft/25 bg-teal-deep/55 text-xl text-paper backdrop-blur-md transition-all hover:scale-105 hover:bg-teal-deep/75"
            onClick={goPrev}
            aria-label="Previous exhibition"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-teal-soft/25 bg-teal-deep/55 text-xl text-paper backdrop-blur-md transition-all hover:scale-105 hover:bg-teal-deep/75"
            onClick={goNext}
            aria-label="Next exhibition"
          >
            &#8250;
          </button>

          <div
            role="tablist"
            aria-label="Choose exhibition slide"
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-teal-soft/20 bg-teal-deep/45 px-2.5 py-1.5 backdrop-blur-md"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${slide.title}`}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === index ? "scale-125 bg-gold" : "bg-paper/35"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}