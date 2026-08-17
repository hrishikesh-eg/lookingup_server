
import { useNavigate } from "react-router-dom";
import BannerCarousel from "./BannerCarousel";
import { topBanners, bottomBanners, leftBanners, rightBanners, promoCustomers } from "../data/bannerData";

export default function PromoBannerPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-6">
      {/* Top banner carousel */}
      <BannerCarousel images={topBanners} orientation="horizontal" />

      <div className="flex items-stretch gap-4">
        {/* Left vertical banner - desktop/tablet only */}
        <div className="hidden md:block md:w-[clamp(90px,14vw,300px)] flex-none">
          <BannerCarousel images={leftBanners} orientation="vertical" />
        </div>

        {/* Center customer list */}
         <div className="glass shadow-teal min-w-0 flex-1 rounded-lg p-6">
          <button onClick={() => navigate(-1)} className="eyebrow mb-4 inline-block text-teal-deep">
            ← Back
          </button>
          <h2 className="font-display mb-4 text-2xl text-ink">Customer List</h2>
          <div className="hairline mb-4" />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {promoCustomers.map((customer, i) => (
              <li
                key={customer.id}
                className="group flex items-center gap-3 rounded-lg border border-rule bg-cream/60 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-teal hover:shadow-teal"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-teal-deep font-display text-sm text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink group-hover:text-teal-deep">{customer.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right vertical banner - desktop/tablet only */}
        <div className="hidden md:block md:w-[clamp(90px,14vw,300px)] flex-none">
          <BannerCarousel images={rightBanners} orientation="vertical" />
        </div>
      </div>

      {/* Bottom banner carousel */}
      <BannerCarousel images={bottomBanners} orientation="horizontal" />
    </div>
  );
}