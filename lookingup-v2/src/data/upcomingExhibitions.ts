import amptechDesktop from "@/assets/banners/amptech-desktop.webp";
import amptechMobile from "@/assets/banners/amptech-mobile.webp";

/**
 * UPCOMING EXHIBITIONS DATA — navbar carousel banner
 * ---------------------------------------------------------
 * Each entry is a client-supplied, finished promotional poster for an
 * exhibition Looking Up is exhibiting at / promoting. These arrive as
 * complete marketing flyers (logo, dates, CTA already designed in) —
 * the carousel displays them as-is and never overlays its own text on
 * top, so the poster's own design is never covered or fought against.
 *
 * Image specs to request from the client:
 *   Desktop banner: 1600x500px landscape, JPEG/PNG, under 300KB
 *   Mobile banner:  1080x1350px portrait, JPEG/PNG, under 250KB
 * Compress to WebP (75-80% quality via squoosh.app) before adding.
 *
 * `title`, `location`, `dateLabel` are used only for alt text and the
 * placeholder shown before a real image is supplied — never rendered
 * as visible overlay text on top of the poster.
 *
 * `ctaHref`: if set, the whole banner becomes a clickable link. Leave
 * undefined for a purely informational, non-clickable banner.
 */

export interface UpcomingExhibition {
  id: string;
  title: string;
  location?: string;
  dateLabel?: string;
  ctaHref?: string;
  desktopImage?: string;
  mobileImage?: string;
}

export const upcomingExhibitions: UpcomingExhibition[] = [
  {
    id: "amptech-sri-lanka-2026",
    title: "Amptech Sri Lanka — Pharma Machinery, Lab Equipment & Chemical Expo",
    location: "Sri Lanka",
    dateLabel: "17–19 December 2026",
    ctaHref: "#contact",
    desktopImage: amptechDesktop,
    mobileImage: amptechMobile,
  },
];
