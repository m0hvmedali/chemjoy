import { useEffect, useMemo } from "react";
import SectionCard from "@/components/SectionCard";
import AudioPlayer from "@/components/AudioPlayer";
import PDFViewer from "@/components/PDFViewer";
import ChartBlock from "@/components/ChartBlock";
import MermaidBlock from "@/components/MermaidBlock";
import QuickQuiz from "@/components/QuickQuiz";
import MarkdownView from "@/components/MarkdownView";

function useSearchHighlighter(query: string) {
  useEffect(() => {
    const root = document.getElementById("lesson-root");
    if (!root) return;
    const marks = root.querySelectorAll("mark[data-search]");
    marks.forEach((m) => {
      const parent = m.parentNode as Node;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(m.textContent || ""), m);
      parent.normalize();
    });
    if (!query.trim()) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const needle = query.trim();
    const nodes: Text[] = [];
    // @ts-ignore
    let node: any; while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach((textNode) => {
      const idx = textNode.data.toLowerCase().indexOf(needle.toLowerCase());
      if (idx >= 0) {
        const span = document.createElement("mark");
        span.setAttribute("data-search", "1");
        span.className = "bg-yellow-300/60 dark:bg-yellow-500/40 rounded px-0.5";
        const before = textNode.splitText(idx);
        before.splitText(needle.length);
        span.appendChild(before.cloneNode(true));
        before.parentNode?.replaceChild(span, before);
      }
    });
  }, [query]);
}

import type { Lesson } from "@/lessons/types";

export default function LessonPage({ lesson, search }: { lesson: Lesson; search: string }) {
  useSearchHighlighter(search);

  const statesChart = useMemo(() => ({
    type: 'bar',
    data: {
      labels: ['صلب', 'سائل', 'غاز'],
      datasets: [{ label: 'خصائص حالات المادة', data: [1, 2, 3], backgroundColor: ['#60a5fa', '#34d399', '#f472b6'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  }), []);

  const atomChart = useMemo(() => ({
    type: 'doughnut',
    data: {
      labels: ['بروتونات', 'نيوترونات', 'إلكترونات'],
      datasets: [{ label: 'تركيب الذرة', data: [33, 33, 34], backgroundColor: ['#f59e0b','#a78bfa','#22d3ee'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  }), []);

  return (
    <div id="lesson-root" className="space-y-8">
      <div className="flex sm:hidden">
        <button onClick={()=>window.history.back()} className="mb-2 ms-auto px-3 py-1.5 rounded-lg border">رجوع</button>
      </div>

      <SectionCard id="intro" title="الدرس الأول: أساسيات الكيمياء">
        <p className="text-muted-foreground mb-4">هذا الدرس يقدّم مقدمة في علم الكيمياء: تعريف المادة، حالات المادة، تركيب الذرة، الجدول الدوري، التكافؤ، المركبات والتفاعلات الكيميائية.</p>
        <AudioPlayer src={lesson.audioSrc} title="ملخص صوتي" />
      </SectionCard>

      <SectionCard id="definition" title="ما هي المادة؟">
        <p>المادة هي كل ما له كتلة وحجم. تتكون من جسيمات صغيرة جدًا تُسمى الذرات والجزيئات.</p>
      </SectionCard>

      <SectionCard id="states" title="حالات المادة">
        <p>للمادة ثلاث حالات رئيسية: صلب، سائل، غاز. تختلف في الشكل، الحجم، والانضغاطية.</p>
        <ChartBlock config={statesChart} />
        <MermaidBlock code={`flowchart TD\nA[مادة صلبة] -->|تسخين| B(سائل)\nB -->|تبخير| C{غاز}\nC -->|تكثيف| B\nB -->|تبريد| A`} />
      </SectionCard>

      <SectionCard id="atom" title="تركيب المادة (الذرة)">
        <p>الذرة تتكون من بروتونات موجبة، نيوترونات متعادلة في النواة، وإلكترونات سالبة تدور حول النواة.</p>
        <ChartBlock config={atomChart} />
      </SectionCard>

      <SectionCard id="periodic" title="الجدول الدوري">
        <p>العناصر الكيميائية مرتبة في الجدول الدوري حسب العدد الذري. يتكون من مجموعات (أعمدة) ودورات (صفوف).</p>
      </SectionCard>

      <SectionCard id="valency" title="التكافؤ">
        <p>التكافؤ هو عدد الإلكترونات التي تفقدها أو تكتسبها الذرة لتصل إلى حالة الاستقرار.</p>
      </SectionCard>

      <SectionCard id="compounds" title="المركبات والمعادلات">
        <p>المركبات تتكون من اتحاد عنصرين أو أكثر. تُكتب باستخدام الصيغ والمعادلات الكيميائية.</p>
      </SectionCard>

      <SectionCard id="reactions" title="أنواع التفاعلات الكيميائية">
        <ul className="list-disc ps-6">
          <li>اتحاد مباشر</li>
          <li>إحلال</li>
          <li>انحلال حراري</li>
          <li>أكسدة واختزال</li>
        </ul>
      </SectionCard>

      <SectionCard id="quiz" title="اختبار سريع">
        <QuickQuiz />
      </SectionCard>

      <SectionCard id="pdf" title="ملف الدرس (PDF)">
        <PDFViewer src={lesson.pdfSrc} />
      </SectionCard>
    </div>
  );
}
