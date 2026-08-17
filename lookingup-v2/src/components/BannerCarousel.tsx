import { useEffect, useState } from "react";
import type { BannerImage } from "../data/bannerData";

interface BannerCarouselProps {
  images: BannerImage[];
  intervalMs?: number;
  orientation?: "horizontal" | "vertical";
}

export default function BannerCarousel({
  images,
  intervalMs = 4000,
  orientation = "horizontal",
}: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  // top/bottom slots -> 1400:220 (matches the dimension sheet sent to
  // the client), left/right slots -> tall 300:700
  const aspectClass =
    orientation === "horizontal" ? "aspect-[1400/220]" : "aspect-[300/700] h-full";

  return (
    <div className={`relative w-full overflow-hidden rounded-lg shadow-teal ${aspectClass}`}>
      {images.map((img, idx) => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            orientation === "horizontal" ? "object-contain" : "object-cover"
          } ${idx === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show slide ${idx + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === activeIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}