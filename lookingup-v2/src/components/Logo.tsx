import logoIcon from "@/assets/logos/lookingup-icon.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={logoIcon} alt="" className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg text-teal-deep">Looking Up</span>
        <span className="eyebrow text-[0.6rem] text-gold tracking-[0.18em]">
          Business Solutions
        </span>
      </span>
    </span>
  );
}
