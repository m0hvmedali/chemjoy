import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownView({ src }: { src: string }) {
  const [md, setMd] = useState<string>("");
  useEffect(() => {
    fetch(src).then(r => r.text()).then(setMd).catch(()=>setMd("تعذر تحميل المحتوى."));
  }, [src]);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-primary" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold border-b pb-1 border-border mt-8" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-6" {...props} />,
          strong: ({node, ...props}) => <strong className="text-primary" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-s-4 ps-4 my-4 border-primary/40 bg-primary/5 rounded-md py-2" {...props} />
          ),
          table: ({node, ...props}) => (
            <div className="overflow-auto my-4">
              <table className="w-full text-sm border" {...props} />
            </div>
          ),
          th: ({node, ...props}) => <th className="p-2 border bg-accent" {...props} />,
          td: ({node, ...props}) => <td className="p-2 border" {...props} />,
          li: ({node, ...props}) => <li className="marker:text-primary/70" {...props} />,
          code: ({inline, className, children, ...props}) => {
            return inline ? (
              <code className="px-1.5 py-0.5 rounded bg-muted" {...props}>{children}</code>
            ) : (
              <pre className="p-3 rounded-lg bg-muted overflow-auto"><code {...props}>{children}</code></pre>
            );
          },
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}
