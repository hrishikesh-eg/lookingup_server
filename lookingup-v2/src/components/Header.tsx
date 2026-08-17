import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import NavInquiryModal from "./NavInquiryModal";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#magazine", label: "Magazine" },
  { href: "#clients", label: "Directory" },
  { href: "#exhibitions", label: "Exhibitions" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-teal/15" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 flex items-center justify-between h-20 py-3">
        <a href="#top" onClick={() => setOpen(false)} className="group">
          <Logo />
        </a>
        <nav className="hidden lg:flex items-center gap-1 text-sm glass rounded-full px-2 py-1.5">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-ink/75 hover:text-teal-deep hover:bg-teal/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
          {/* Remove this NavInquiryModal block to turn the inquiry
              feature off between exhibitions - nothing else to touch */}
          <NavInquiryModal
            trigger={
              <button className="px-4 py-2 rounded-full text-ink/75 hover:text-teal-deep hover:bg-teal/10 transition-colors">
                Client Inquiry
              </button>
            }
          />
        </nav>
        <a
          href="#clients"
          className="hidden lg:inline-flex items-center gap-2 gradient-teal text-paper px-5 py-2.5 rounded-full text-sm font-medium shadow-teal hover:opacity-90 transition-opacity"
        >
          View Listings <span aria-hidden>→</span>
        </a>
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-teal-deep transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block w-6 h-px bg-teal-deep transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block w-6 h-px bg-teal-deep transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-0 top-20 bg-paper">
          <nav className="flex flex-col p-8 gap-6">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-teal-deep hover:text-teal"
              >
                {l.label}
              </a>
            ))}
            {/* Remove this NavInquiryModal block to turn the inquiry
                feature off between exhibitions - nothing else to touch */}
            <NavInquiryModal
              trigger={
                <button className="font-display text-4xl text-teal-deep hover:text-teal text-left">
                  Product Inquiry
                </button>
              }
            />
            <a
              href="#clients"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center gap-2 gradient-teal text-paper px-6 py-3 rounded-full text-sm"
            >
              View Listings →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}