import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-border p-8 md:p-12 bg-card bg-animated">
        <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none bg-[radial-gradient(800px_circle_at_80%_10%,theme(colors.primary/.15),transparent),radial-gradient(600px_circle_at_20%_20%,theme(colors.primary/.12),transparent)] animate-in fade-in" />
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">مرحبًا بك في ChemJoy</h1>
            <p className="text-muted-foreground text-lg">منصة تعليمية تفاعلية لتعلّم الكيمياء بسهولة. استمع للملخصات الصوتية، شاهد الرسوم التوضيحية، وحلّ الاختبارات القصيرة.</p>
            <div className="mt-6 flex gap-3">
              <a href="#/lessons" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">الانتقال إلى الدروس</a>
              <a href="#/chatbot" className="px-4 py-2 rounded-lg border">فتح الشات بوت</a>
            </div>
          </div>
          <figure className="rounded-2xl border overflow-hidden">
            <img src="/images/periodic-table.png" alt="الجدول الدوري" className="w-full h-full object-cover" />
            <figcaption className="text-xs text-muted-foreground p-2">الجدول الدوري — هوية ChemJoy</figcaption>
          </figure>
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border p-4 animate-in slide-in-from-bottom-2">
            <div className="text-sm font-semibold mb-1">1) ابدأ من الدروس</div>
            <p className="text-sm text-muted-foreground">انتقل إلى صفحة الدروس واختر الدرس الذي تريده من البطاقات.</p>
          </div>
          <div className="rounded-xl border p-4 animate-in slide-in-from-bottom-2 delay-100">
            <div className="text-sm font-semibold mb-1">2) استكشف</div>
            <p className="text-sm text-muted-foreground">اقرأ الشرح المبسّط، وشاهد الرسوم البيانية، واستمع للملخص الصوتي.</p>
          </div>
          <div className="rounded-xl border p-4 animate-in slide-in-from-bottom-2 delay-200">
            <div className="text-sm font-semibold mb-1">3) اسأل الشات بوت</div>
            <p className="text-sm text-muted-foreground">اذهب لصفحة الشات بوت واطرح أسئلتك للحصول على إجابات من بيانات الدروس.</p>
          </div>
        </div>
      </div>

      <SectionCard id="features" title="مزايا المنصة">
        <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          <li className="border rounded-lg p-3">واجهة عربية RTL، وضعان داكن/فاتح، ولوحات ألوان متعددة.</li>
          <li className="border rounded-lg p-3">صفحات منفصلة: الرئيسية، الدروس، صفحة الدرس، الشات بوت، الإعدادات.</li>
          <li className="border rounded-lg p-3">بطاقات للدروس مع انتقال سريع لصفحة كل درس.</li>
          <li className="border rounded-lg p-3">رسوم Chart.js ومخططات Mermaid تفاعلية.</li>
        </ul>
      </SectionCard>
    </div>
  );
}
