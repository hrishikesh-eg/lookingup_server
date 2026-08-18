/**
 * BANNER DATA
 * ---------------------------------------------------------
 * Image lists for each carousel slot on the promo banner page.
 * Add/remove entries here — the page just renders whatever is in
 * these arrays, no page code changes needed.
 *
 * Place image files in src/assets/banners/ and import them below.
 * Recommended source dimensions:
 *   top / bottom banners  -> 1400 x 350 px
 *   left / right banners  -> 300 x 700 px
 */

// --- Top banner images ---
import top1 from "../assets/banners/erfolg_b.webp";
import top2 from "../assets/banners/emco.jpeg";
import top3 from "../assets/banners/paal_b.webp";
import top4 from "../assets/banners/alpro_b.webp";
import top5 from "../assets/banners/poly1.jpg";

// --- Bottom banner images ---
import bottom1 from "../assets/banners/erfolg_b.webp";
import bottom2 from "../assets/banners/emco.jpeg";
import bottom3 from "../assets/banners/paal_b.webp";
import bottom4 from "../assets/banners/alpro_b.webp";
import bottom5 from "../assets/banners/poly1.jpg";
// --- Left vertical banner images ---
import left1 from "../assets/banners/left.png";
import left2 from "../assets/banners/left.png";

// --- Right vertical banner images ---
import right1 from "../assets/banners/left.png";
import right2 from "../assets/banners/left.png";

export interface BannerImage {
  id: string;
  src: string;
  alt: string;
}

export const topBanners: BannerImage[] = [
  { id: "top-1", src: top1, alt: "Company banner" },
  { id: "top-2", src: top2, alt: "Company banner" },
  { id: "top-3", src: top3, alt: "Company banner" },
  { id: "top-4", src: top4, alt: "Company banner" },
  { id: "top-5", src: top5, alt: "Company banner" }
  
];

export const bottomBanners: BannerImage[] = [
  { id: "bottom-1", src: bottom1, alt: "Company banner" },
  { id: "bottom-2", src: bottom2, alt: "Company banner" },
  { id: "bottom-3", src: bottom3, alt: "Company banner" },
  { id: "bottom-4", src: bottom4, alt: "Company banner" },
  { id: "bottom-5", src: bottom5, alt: "Company banner" }
];

export const leftBanners: BannerImage[] = [
  { id: "left-1", src: left1, alt: "Company banner" },
  { id: "left-2", src: left2, alt: "Company banner" },
];

export const rightBanners: BannerImage[] = [
  { id: "right-1", src: right1, alt: "Company banner" },
  { id: "right-2", src: right2, alt: "Company banner" },
];

// --- Customer list shown on the promo banner page ---
// Independent of siteData.ts on purpose — this page doesn't pull
// from the main directory data, edit this list directly.
export interface PromoCustomer {
  id: string;
  name: string;
}

export const promoCustomers: PromoCustomer[] = [
  { id: "customer-1", name: "Erfolg Ganar Pvt. Ltd." },
  { id: "customer-2", name: "Emco Engineering Pvt. Ltd" },
  { id: "customer-3", name: "Paal Pharma Machinery Pvt. Ltd" },
  { id: "customer-4", name: "Alpro Equipment & Technologies" },
  { id: "customer-5", name: "Polyanh Polymers and Industries Pvt. Ltd" },
];