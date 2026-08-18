import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productDetails } from "@/data/productDetails";
import { InquiryModal } from "./InquiryModal";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [showInquiry, setShowInquiry] = useState(false);

  const product = productDetails.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl text-teal-deep">Product not found</h1>
        <p className="mt-3 text-ink/70">This product listing may have moved or no longer exists.</p>
        <Link
          to="/#clients"
          className="gradient-teal mt-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm text-paper hover:opacity-90"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-28 lg:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-teal-deep"
      >
        ← Back
      </button>

      <h1 className="font-display text-4xl leading-tight text-teal-deep lg:text-5xl">
        {product.productName}
      </h1>
      <p className="mt-2 italic text-ink/60">from {product.companyName}</p>

      {/* Product image */}
      <div
        className={
          product.imageType === "magazine"
            ? "shadow-teal mx-auto mt-8 aspect-[210/297] w-full max-w-md overflow-hidden rounded-2xl border border-teal/15 bg-cream/50"
            : "shadow-teal mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-teal/15 bg-cream/50"
        }
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.productName}
            className={`h-full w-full ${product.imageType === "magazine" ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-ink/30">
            <p className="eyebrow">Image coming soon</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mt-10 border-t border-teal/15 pt-8">
        <p className="eyebrow mb-3 text-teal">Description</p>
        <p className="text-lg leading-relaxed text-ink/80">{product.description}</p>
      </div>

      {/* Inquire */}
      <button
        onClick={() => setShowInquiry(true)}
        className="gradient-teal shadow-teal mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-paper hover:opacity-90"
      >
        Inquire About This Product →
      </button>

      {showInquiry && (
        <InquiryModal
          customer={{ name: product.companyName,email: product.companyEmail }}
          product={{ name: product.productName }}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </div>
  );
}