import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/lessons";

export default function Lessons() {
  return (
    <div className="space-y-4">
      <div className="flex">
        <button onClick={()=>window.history.back()} className="ms-auto px-3 py-1.5 rounded-lg border">رجوع</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((l) => (
          <a key={l.id} href={`#/lesson/${l.id}`} className="block group">
            <Card className="transition hover:shadow-md border-primary/20 overflow-hidden">
              {l.cover && <img alt="cover" src={l.cover} className="w-full h-32 object-cover" />}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{l.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full border bg-accent">درس {l.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{l.description}</p>
                <div className="mt-3 text-primary text-sm opacity-0 group-hover:opacity-100 transition">فتح الدرس →</div>
              </CardContent>
            </Card>
          </a>
        ))}
        <div className="border rounded-xl p-4 text-sm text-muted-foreground">سيتم إضافة مزيد من الدروس لاحقًا…</div>
      </div>
    </div>
  );
}
