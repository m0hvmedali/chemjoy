import { useEffect, useRef } from "react";

declare global {
  interface Window { mermaid: any }
}

export default function MermaidBlock({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const run = async () => {
      try {
        if (window.mermaid && ref.current) {
          ref.current.removeAttribute("data-processed");
          await window.mermaid.run({ nodes: [ref.current] });
        }
      } catch {}
    };
    run();
  }, [code]);
  return (
    <div className="rounded-xl border border-border p-3 bg-card overflow-auto">
      <div ref={ref} className="mermaid text-sm leading-7">
        {code}
      </div>
    </div>
  );
}
