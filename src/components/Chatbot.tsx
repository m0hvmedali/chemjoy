import { useEffect, useMemo, useState } from "react";

type QA = { q: string; a: string; tags?: string[] };

function score(query: string, item: QA) {
  const qTokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const text = (item.q + " " + item.a + " " + (item.tags||[]).join(" ")).toLowerCase();
  let s = 0;
  qTokens.forEach(t => { if (text.includes(t)) s += 1; });
  return s;
}

export default function Chatbot() {
  const [kb, setKb] = useState<QA[]>([]);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [history, setHistory] = useState<{q:string;a:string}[]>([]);

  useEffect(() => {
    fetch("/chatbot/knowledge.json").then(r => r.json()).then(setKb).catch(() => setKb([]));
  }, []);

  const suggest = useMemo(() => kb.slice(0, 5).map(x => x.q), [kb]);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const sorted = [...kb].sort((a,b) => score(query,a) > score(query,b) ? -1 : 1);
    const best = sorted[0];
    const a = best && score(query, best) > 0 ? best.a : "لم أجد إجابة مباشرة في البيانات المتاحة. جرّب صياغة أخرى أو راجع أقسام الدرس.";
    setAnswer(a);
    setHistory(prev => [{q: query, a}, ...prev]);
  };

  return (
    <div className="rounded-xl border border-border p-4 bg-card space-y-4">
      <h3 className="font-semibold">شات بوت (بدون ذكاء اصطناعي)</h3>
      <form onSubmit={ask} className="flex items-center gap-2">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="اكتب سؤالك عن الدرس" className="flex-1 border border-border rounded-lg px-3 py-2 bg-background" />
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">اسأل</button>
      </form>
      {suggest.length>0 && (
        <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
          {suggest.map((s,idx)=> (
            <button key={idx} onClick={()=>setQuery(s)} className="px-2 py-1 rounded-full border">{s}</button>
          ))}
        </div>
      )}
      {answer && (
        <div className="p-3 rounded-lg bg-secondary text-secondary-foreground text-sm leading-7 border">
          {answer}
        </div>
      )}
      {history.length>0 && (
        <div className="mt-2">
          <h4 className="text-sm font-semibold mb-2">السجل</h4>
          <ul className="space-y-2 text-sm">
            {history.map((h,idx)=> (
              <li key={idx} className="border rounded-lg p-2">
                <div className="text-muted-foreground">س: {h.q}</div>
                <div>ج: {h.a}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
