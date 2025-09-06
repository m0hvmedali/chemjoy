import { useEffect, useRef } from "react";

declare global { var Chart: any }

export default function ChartBlock({ config }: { config: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !window.Chart) return;
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new window.Chart(ctx, config);
    return () => chartRef.current?.destroy();
  }, [config]);

  return (
    <div className="rounded-xl border border-border p-3 bg-card">
      <canvas ref={canvasRef} />
    </div>
  );
}
