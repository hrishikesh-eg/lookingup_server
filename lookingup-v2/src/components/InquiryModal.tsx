import { useEffect, useRef, useState } from "react";


const INITIAL = { name: "", company: "", email: "", phone: "", message: "" };

export function InquiryModal({
  customer,
  product,
  onClose,
}: {
  customer: { name: string,email: string; };
  product: { name: string };
  onClose: () => void;
}) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

 const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.message.trim()
  ) {
    setStatus("error");
    return;
  }

  setStatus("sending");

  try {
    const response = await fetch(
      "https://lookingupbusinesssolutions.com/api/product-inquiry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: customer.name,
          company_email: customer.email,
          product_name: product.name,

          customer_name: form.name,
          customer_company: form.company || "Not provided",
          customer_email: form.email,
          customer_phone: form.phone || "Not provided",

          message: form.message,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error("Backend inquiry error:", errorData);

      throw new Error("Failed to send inquiry");
    }

    setStatus("success");

  } catch (err) {
    console.error("Inquiry send failed:", err);
    setStatus("error");
  }
};

  return (
    <div
      className="fixed inset-0 z-[100] bg-teal-deep/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl bg-paper rounded-2xl border border-teal/20 shadow-teal max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full text-teal-deep hover:bg-teal hover:text-paper transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full gradient-teal text-paper grid place-items-center text-3xl">
              ✓
            </div>
            <h3 className="font-display text-4xl mt-6 text-teal-deep">Inquiry sent</h3>
            <p className="mt-4 text-ink/75">
              Your request about <strong>{product.name}</strong> has been delivered to {customer.name}. They'll be
              in touch with you directly.
            </p>
            <button
              onClick={onClose}
              className="mt-8 gradient-teal text-paper px-8 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-8 lg:p-10">
            <p className="eyebrow text-gold">Product Inquiry</p>
            <h3 className="font-display text-4xl mt-2 leading-tight text-teal-deep">{product.name}</h3>
            <p className="text-ink/60 mt-1 italic">from {customer.name}</p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <Field
                label="Your name *"
                name="name"
                value={form.name}
                onChange={handle}
                inputRef={firstRef}
                required
                placeholder="Full name"
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your company" name="company" value={form.company} onChange={handle} placeholder="Company name" />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handle}
                  placeholder="Phone number"
                />
              </div>
              <Field
                label="Email *"
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                required
                placeholder="you@company.com"
              />
              <div>
                <label className="eyebrow text-ink/70 block mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  required
                  rows={4}
                  placeholder="Quantities, specs, timelines…"
                  className="w-full bg-cream/40 border border-teal/20 rounded-xl p-3 text-base focus:outline-none focus:border-teal resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-destructive text-sm">
                  Please fill in name, email, and message — or try sending again if the request failed.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full gradient-teal text-paper py-4 rounded-full text-sm font-medium hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Send Inquiry →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  inputRef,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-ink/70 block mb-2">
        {label}
      </label>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-cream/40 border border-teal/20 rounded-xl px-3 py-2.5 text-base focus:outline-none focus:border-teal"
      />
    </div>
  );
}