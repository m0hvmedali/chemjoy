export default function PDFViewer({ src, title }: { src: string; title?: string }) {
  return (
    <div className="space-y-2">
      {title && <h3 className="font-semibold text-base">{title}</h3>}
      <div className="aspect-[3/4] md:aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-card">
        <iframe
          title={title || "PDF"}
          src={src}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
