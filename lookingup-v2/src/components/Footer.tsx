import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-paper border-t border-teal/20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-6">
        <Logo />
        <p className="eyebrow text-teal/60">
          © {year} Looking Up Business Solutions · All rights reserved
        </p>
      </div>
    </footer>
  );
}
