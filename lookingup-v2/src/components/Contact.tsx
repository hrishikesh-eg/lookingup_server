export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-deep" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center text-paper">
        <div>
          <p className="eyebrow text-gold flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" /> Get Listed
          </p>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.98] text-balance">
            Want your company in
            <br />
            the <em className="italic text-gold">next issue?</em>
          </h2>
          <p className="mt-8 text-lg text-paper/75 leading-relaxed max-w-md">
            Join the companies already reaching buyers through Looking Up.
            Reach out and we'll walk you through getting listed.
          </p>
        </div>
        <div className="rounded-2xl border border-paper/15 backdrop-blur bg-paper/5 overflow-hidden divide-y divide-paper/15">
          <ContactRow label="Email" value="sales@lookingupbusinesssolutions.com" href="mailto:sales@lookingupbusinesssolutions.com" />
          <ContactRow label="Phone" value="+91 81693 72535" href="tel:+918169372535" />
          <ContactRow label="Office" value="Mumbai, Maharashtra, India" />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="eyebrow text-paper/50">{label}</span>
      <span className="font-display text-2xl lg:text-3xl mt-2 group-hover:text-gold transition-colors flex items-center justify-between gap-4">
        {value}
        {href && <span className="text-gold">→</span>}
      </span>
    </>
  );
  const cls = "block p-8 group";
  return href ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
