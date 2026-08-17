import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Building2, Mail, User, Phone, MapPin, PackageSearch, Send, CheckCircle2 } from "lucide-react";

interface FormState {
  companyName: string;
  email: string;
  personName: string;
  mobileNo: string;
  alternateMobileNo: string;
  companyAddress: string;
  productInquiry: string;
}

const initialState: FormState = {
  companyName: "",
  email: "",
  personName: "",
  mobileNo: "",
  alternateMobileNo: "",
  companyAddress: "",
  productInquiry: "",
};

const API_URL = import.meta.env.VITE_API_URL;
// Slightly reduced vertical padding (py-2 instead of py-3) to save heights
const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-3 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 placeholder:truncate focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/10 hover:border-slate-300";

const iconClass = "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal-600";

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "duplicate" | "error">("idle");

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.companyName.trim()) next.companyName = "Company name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.personName.trim()) next.personName = "Contact person name is required";
    if (!form.mobileNo.trim()) {
      next.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobileNo.replace(/\D/g, "").slice(-10))) {
      next.mobileNo = "Enter a valid 10-digit mobile number";
    }
    if (!form.companyAddress.trim()) next.companyAddress = "Company address is required";
    if (!form.productInquiry.trim()) next.productInquiry = "Please describe your product inquiry";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: form.companyName,
          person_name: form.personName,
          email: form.email,
          mobile_no: form.mobileNo,
          alternate_mobile_no: form.alternateMobileNo || null,
          company_address: form.companyAddress,
          product_inquiry: form.productInquiry,
        }),
      });

      if (!response.ok) {
  const errorData = await response.json();

  throw new Error(
    errorData.detail || "Failed to submit inquiry"
  );
}

      setStatus("success");
      setForm(initialState);
    }  catch (error) {
  console.error(error);

  if (
    error instanceof Error &&
    error.message === "This mobile number has already submitted an inquiry."
  ) {
    setStatus("duplicate");
  } else {
    setStatus("error");
  }
}
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-md">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Inquiry Sent</h3>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }
if (status === "duplicate") {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-md">
        <CheckCircle2 className="h-6 w-6" />
      </div>

      <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
        Inquiry Already Submitted
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
        This mobile number has already submitted an inquiry.
        <br />
        Our team already has your details and will contact you soon.
      </p>

      <button
        onClick={() => {
          setStatus("idle");
          setForm(initialState);
        }}
        className="mt-4 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
      >
        Submit another inquiry
      </button>
    </div>
  );
}
  return (
    <div className="w-full bg-white p-4 sm:p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Company Name */}
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="companyName">
              Company Name
            </label>
            <div className="group relative">
              <Building2 className={iconClass} />
              <input
                id="companyName"
                type="text"
                value={form.companyName}
                onChange={handleChange("companyName")}
                className={`${inputClass} ${errors.companyName ? "border-red-500 bg-red-50/10" : ""}`}
                placeholder="Acme Corporation"
              />
            </div>
            {errors.companyName && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.companyName}</p>}
          </div>

          {/* Contact Person Name */}
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="personName">
              Person Name
            </label>
            <div className="group relative">
              <User className={iconClass} />
              <input
                id="personName"
                type="text"
                value={form.personName}
                onChange={handleChange("personName")}
                className={`${inputClass} ${errors.personName ? "border-red-500 bg-red-50/10" : ""}`}
                placeholder="John Doe"
              />
            </div>
            {errors.personName && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.personName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="email">
              Email Address
            </label>
            <div className="group relative">
              <Mail className={iconClass} />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className={`${inputClass} ${errors.email ? "border-red-500 bg-red-50/10" : ""}`}
                placeholder="name@company.com"
              />
            </div>
            {errors.email && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.email}</p>}
          </div>

          {/* Mobile No */}
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="mobileNo">
              Mobile No
            </label>
            <div className="group relative">
              <Phone className={iconClass} />
              <input
                id="mobileNo"
                type="number"
                value={form.mobileNo}
                onChange={handleChange("mobileNo")}
                className={`${inputClass} ${errors.mobileNo ? "border-red-500 bg-red-50/10" : ""}`}
                placeholder="10-digit mobile number"
              />
            </div>
            {errors.mobileNo && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.mobileNo}</p>}
          </div>

          {/* Alternate Mobile No */}
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="alternateMobileNo">
              Alternate Mobile No
            </label>
            <div className="group relative">
              <Phone className={iconClass} />
              <input
                id="alternateMobileNo"
                type="number"
                value={form.alternateMobileNo}
                onChange={handleChange("alternateMobileNo")}
                className={`${inputClass} ${errors.alternateMobileNo ? "border-red-500 bg-red-50/10" : ""}`}
                placeholder="10-digit mobile number (optional)"
              />
            </div>
            {errors.alternateMobileNo && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.alternateMobileNo}</p>}
          </div>
        </div>

        {/* Company Address */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="companyAddress">
            Company Address
          </label>
          <div className="group relative">
            <MapPin className={iconClass} />
            <input
              id="companyAddress"
              type="text"
              value={form.companyAddress}
              onChange={handleChange("companyAddress")}
              className={`${inputClass} ${errors.companyAddress ? "border-red-500 bg-red-50/10" : ""}`}
              placeholder="Street, City, State, ZIP"
            />
          </div>
          {errors.companyAddress && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.companyAddress}</p>}
        </div>

        {/* Product Inquiry */}
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-500" htmlFor="productInquiry">
            Product Inquiry
          </label>
          <div className="group relative">
            <PackageSearch className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-teal-600" />
            <textarea
              id="productInquiry"
              value={form.productInquiry}
              onChange={handleChange("productInquiry")}
              className={`${inputClass} [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-[75px] max-h-[90px] resize-none pt-2 pl-10 pr-3 leading-tight ${
                errors.productInquiry ? "border-red-500 bg-red-50/10" : ""
              }`}
              placeholder="Tell us about the products or specifications you are looking for..."
            />
          </div>
          {errors.productInquiry && <p className="mt-0.5 text-[11px] font-medium text-red-500">{errors.productInquiry}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 px-6 text-sm font-semibold text-white shadow-md shadow-teal-600/20 transition-all duration-200 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 active:scale-[0.99] disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              Submit Inquiry <Send className="h-4 w-4" />
            </>
          )}
        </button>

        
      </form>
    </div>
  );
}