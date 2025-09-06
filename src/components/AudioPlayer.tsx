import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [useChunked, setUseChunked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!useChunked) return;
    let mediaSource: MediaSource | null = null;
    let sourceBuffer: SourceBuffer | null = null;
    let controller: AbortController | null = null;

    async function start() {
      try {
        if (!("MediaSource" in window)) {
          setError("المتصفح لا يدعم التحميل المجزأ، سيتم استخدام المشغل العادي.");
          setUseChunked(false);
          return;
        }
        setLoading(true);
        mediaSource = new MediaSource();
        const url = URL.createObjectURL(mediaSource);
        if (audioRef.current) audioRef.current.src = url;

        mediaSource.addEventListener("sourceopen", async () => {
          try {
            const mime = 'audio/mpeg';
            if (!MediaSource.isTypeSupported(mime)) {
              setError("صيغة الصوت غير مدعومة في التحميل المجزأ");
              setUseChunked(false);
              if (audioRef.current) audioRef.current.src = src; // fallback
              return;
            }
            sourceBuffer = mediaSource!.addSourceBuffer(mime);
            controller = new AbortController();
            const chunkSize = 256 * 1024; // 256KB
            let start = 0;
            let ended = false;
            while (!ended) {
              const end = start + chunkSize - 1;
              const resp = await fetch(src, { headers: { Range: `bytes=${start}-${end}` }, signal: controller.signal });
              if (!resp.ok && resp.status !== 206) throw new Error("فشل جلب الجزء");
              const buf = await resp.arrayBuffer();
              await new Promise<void>((resolve, reject) => {
                if (!sourceBuffer) return reject();
                const onUpdate = () => {
                  sourceBuffer!.removeEventListener("updateend", onUpdate);
                  resolve();
                };
                sourceBuffer.appendBuffer(new Uint8Array(buf));
                sourceBuffer.addEventListener("updateend", onUpdate);
              });
              start += buf.byteLength;
              const contentRange = resp.headers.get("Content-Range");
              if (contentRange) {
                const total = Number(contentRange.split("/")[1]);
                if (start >= total) {
                  ended = true;
                  mediaSource!.endOfStream();
                }
              } else {
                // no content-range => likely finished
                ended = true;
                mediaSource!.endOfStream();
              }
            }
          } catch (e: any) {
            setError(e?.message || "تعذر تشغيل التحميل المجزأ");
            setUseChunked(false);
            if (audioRef.current) audioRef.current.src = src;
          } finally {
            setLoading(false);
          }
        });
      } catch (e: any) {
        setError(e?.message || "تعذر بدء التحميل المجزأ");
        setUseChunked(false);
        if (audioRef.current) audioRef.current.src = src;
        setLoading(false);
      }
    }

    start();
    return () => {
      controller?.abort();
      if (mediaSource) URL.revokeObjectURL(audioRef.current?.src || "");
    };
  }, [src, useChunked]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-base">{title}</h3>
        <label className="text-xs flex items-center gap-2">
          <input type="checkbox" checked={useChunked} onChange={(e) => setUseChunked(e.target.checked)} />
          تفعيل التحميل المجزأ (تجريبي)
        </label>
      </div>
      <div className="rounded-xl border border-border p-3 bg-card">
        <audio ref={audioRef} controls preload="metadata" className="w-full" src={!useChunked ? src : undefined}></audio>
        {loading && <p className="text-xs text-muted-foreground mt-2">جاري تحميل الصوت بأجزاء…</p>}
        {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      </div>
    </div>
  );
}
