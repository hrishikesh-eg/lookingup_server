import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Serve the pdf.js worker from /public so it works reliably with Vite.
// import.meta.env.BASE_URL respects Vite's configured `base` (e.g. when
// deployed under a subpath like GitHub Pages' /repo-name/).
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;

const MIN_WIDTH = 220;
const MAX_WIDTH = 460;
// Standard A4-ish portrait ratio (height / width) used as a fallback
// before the real page dimensions are known, so the very first render
// doesn't guess a size that's too tall for the screen.
const FALLBACK_RATIO = 1.414;

interface FlipBookProps {
  file: string;
  title: string;
}

export default function FlipBook({ file, title }: FlipBookProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageWidth, setPageWidth] = useState(320);
  const [pageRatio, setPageRatio] = useState(FALLBACK_RATIO); // height / width
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [jumpValue, setJumpValue] = useState("");

  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const availableWidth = stage.offsetWidth - 32;

      // In fullscreen, the stage is height-constrained by the viewport,
      // so the page must also be capped by available height, not just
      // width — otherwise a tall portrait page gets clipped on phones.
      let widthFromHeight = Infinity;
      if (isFullscreen) {
        const availableHeight = stage.offsetHeight - 24;
        widthFromHeight = availableHeight / pageRatio;
      }

      const widthCap = Math.min(MAX_WIDTH, availableWidth, widthFromHeight);
      // In fullscreen, never let the MIN_WIDTH floor push the page taller
      // than the available height — that's exactly what causes clipping.
      const next = isFullscreen ? Math.max(160, widthCap) : Math.max(MIN_WIDTH, widthCap);
      setPageWidth(next);
    };

    // Defer the first measurement until after the browser has fully
    // settled layout (grid columns, fonts, etc.) — measuring synchronously
    // on mount can sometimes read a transient/incorrect width.
    const rafId = requestAnimationFrame(() => requestAnimationFrame(measure));

    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [isFullscreen, pageRatio]);

  const onDocumentLoad = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setLoadError(false);
  }, []);

  const onPageLoad = useCallback((page: { originalWidth: number; originalHeight: number }) => {
    if (page?.originalWidth && page?.originalHeight) {
      setPageRatio(page.originalHeight / page.originalWidth);
    }
  }, []);

  const goTo = useCallback(
    (target: number, dir: "next" | "prev") => {
      if (isAnimating || !numPages) return;
      const clamped = Math.max(0, Math.min(numPages - 1, target));
      if (clamped === pageIndex) return;
      setDirection(dir);
      setIsAnimating(true);
      window.setTimeout(() => {
        setPageIndex(clamped);
        setIsAnimating(false);
      }, 220);
    },
    [isAnimating, numPages, pageIndex]
  );

  const goNext = useCallback(() => goTo(pageIndex + 1, "next"), [goTo, pageIndex]);
  const goPrev = useCallback(() => goTo(pageIndex - 1, "prev"), [goTo, pageIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, isFullscreen]);

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(jumpValue, 10);
    if (!Number.isNaN(n) && n >= 1 && numPages) {
      goTo(n - 1, n - 1 > pageIndex ? "next" : "prev");
    }
    setJumpValue("");
  };

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-[1200] flex flex-col gap-4 bg-teal-deep p-4 h-[100dvh]"
          : "flex w-full min-w-0 max-w-full flex-col gap-4 rounded-2xl bg-teal-deep p-5 shadow-teal box-border"
      }
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-paper">
        <div className="flex items-center gap-2 font-display text-sm font-medium">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {title}
        </div>

        <div className="flex items-center gap-3">
          {numPages && (
            <form className="flex items-center gap-1.5 text-xs text-teal-soft" onSubmit={handleJumpSubmit}>
              <span className="hidden sm:inline">Page</span>
              <input
                type="number"
                min={1}
                max={numPages}
                value={jumpValue}
                placeholder={String(pageIndex + 1)}
                onChange={(e) => setJumpValue(e.target.value)}
                aria-label="Jump to page"
                className="w-12 rounded-md border border-paper/20 bg-paper/10 px-1.5 py-1 text-center text-paper [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="hidden sm:inline">of {numPages}</span>
            </form>
          )}
          <button
            type="button"
            className="rounded-md border border-paper/20 bg-paper/10 px-3 py-1.5 text-xs font-semibold text-paper transition-colors hover:bg-paper/20"
            onClick={() => setIsFullscreen((v) => !v)}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? "Close" : "Fullscreen"}
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center gap-3 overflow-hidden"
      >
        <button
          type="button"
          className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-xl text-paper backdrop-blur-md transition-colors hover:bg-paper/20 disabled:opacity-25"
          onClick={goPrev}
          disabled={pageIndex === 0}
          aria-label="Previous page"
        >
          &#8249;
        </button>

        <div className="flex min-h-0 max-h-full min-w-0 flex-1 items-center justify-center" style={{ perspective: "2400px" }}>
          <div
            key={pageIndex}
            className="max-h-full max-w-full overflow-hidden rounded-sm bg-white shadow-[0_18px_50px_-16px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-200"
            style={
              isAnimating
                ? {
                    transform: direction === "next" ? "rotateY(-12deg)" : "rotateY(12deg)",
                    opacity: 0.4,
                  }
                : undefined
            }
          >
            {loadError ? (
              <div className="flex h-[420px] w-80 flex-col items-center justify-center gap-1.5 p-4 text-center text-sm text-ink/70">
                <p>Couldn't load the magazine right now.</p>
                <p className="text-xs text-ink/50">
                  Check the PDF path in <code className="rounded bg-cream px-1.5 py-0.5">src/data/magazine.ts</code>.
                </p>
              </div>
            ) : (
              <Document
                file={file}
                onLoadSuccess={onDocumentLoad}
                onLoadError={() => setLoadError(true)}
                loading={
                  <div className="flex h-[420px] w-80 items-center justify-center text-sm text-ink/60">
                    Loading magazine…
                  </div>
                }
              >
                <Page
                  pageNumber={pageIndex + 1}
                  width={pageWidth}
                  onLoadSuccess={onPageLoad}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="[&_canvas]:!h-auto [&_canvas]:!max-w-full"
                />
              </Document>
            )}
          </div>
        </div>

        <button
          type="button"
          className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/20 bg-paper/10 text-xl text-paper backdrop-blur-md transition-colors hover:bg-paper/20 disabled:opacity-25"
          onClick={goNext}
          disabled={!numPages || pageIndex === numPages - 1}
          aria-label="Next page"
        >
          &#8250;
        </button>
      </div>

      {numPages && (
        <div className="h-[3px] overflow-hidden rounded-full bg-paper/15" aria-hidden="true">
          <div
            className="h-full bg-gold transition-[width] duration-200"
            style={{ width: `${((pageIndex + 1) / numPages) * 100}%` }}
          />
        </div>
      )}

      <p className="text-center text-[0.7rem] text-teal-soft">
        Use the arrows, or your keyboard's left / right keys, to turn pages.
      </p>
    </div>
  );
}
