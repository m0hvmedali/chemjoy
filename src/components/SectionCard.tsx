import { PropsWithChildren } from "react";

export default function SectionCard({ id, title, children }: PropsWithChildren<{ id: string; title: string }>) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
        {children}
      </div>
    </section>
  );
}
