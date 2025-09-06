import { useEffect, useState } from "react";

const palettes = [
  { id: "blue", name: "أزرق" },
  { id: "green", name: "أخضر" },
  { id: "purple", name: "بنفسجي" },
  { id: "rose", name: "وردي" },
  { id: "amber", name: "كهرماني" },
];

export default function SettingsPanel() {
  const [fontSize, setFontSize] = useState<number>(() => Number(localStorage.getItem("chemjoy:fontSize") || 16));
  const [lineHeight, setLineHeight] = useState<number>(() => Number(localStorage.getItem("chemjoy:lineHeight") || 28));
  const [palette, setPalette] = useState<string>(() => localStorage.getItem("chemjoy:palette") || "blue");

  useEffect(() => {
    document.documentElement.style.setProperty("--user-font-size", `${fontSize}px`);
    document.documentElement.style.setProperty("--user-line-height", `${lineHeight}px`);
    localStorage.setItem("chemjoy:fontSize", String(fontSize));
    localStorage.setItem("chemjoy:lineHeight", String(lineHeight));
  }, [fontSize, lineHeight]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-blue","theme-green","theme-purple","theme-rose","theme-amber");
    root.classList.add(`theme-${palette}`);
    localStorage.setItem("chemjoy:palette", palette);
  }, [palette]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm">حجم الخط: {fontSize}px</label>
        <input type="range" min={14} max={22} value={fontSize} onChange={(e)=>setFontSize(Number(e.target.value))} className="w-full" />
      </div>
      <div>
        <label className="text-sm">ارتفاع السطر: {lineHeight}px</label>
        <input type="range" min={24} max={36} value={lineHeight} onChange={(e)=>setLineHeight(Number(e.target.value))} className="w-full" />
      </div>
      <div>
        <label className="text-sm">لوحة الألوان</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {palettes.map(p => (
            <button key={p.id} onClick={()=>setPalette(p.id)} className={`px-3 py-1.5 rounded-full border ${palette===p.id? 'bg-primary text-primary-foreground border-primary':'hover:bg-accent'}`}>{p.name}</button>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">يتم حفظ الإعدادات تلقائيًا لهذا الجهاز.</p>
    </div>
  );
}
