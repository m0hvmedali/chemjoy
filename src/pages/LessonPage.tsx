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

  const chartConfig = useMemo(() => ({
    type: 'bar',
    data: {
      labels: ['صلب', 'سائل', 'غاز'],
      datasets: [{ label: 'نسب تقريبية لحالات المادة', data: [34, 33, 33], backgroundColor: ['#60a5fa', '#34d399', '#f472b6'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
  }), []);

  const compositionConfig = useMemo(() => ({
    type: 'doughnut',
    data: {
      labels: ['بروتونات', 'نيوترونات', 'إلكترونات'],
      datasets: [{ label: 'مكونات الذرة (تصوير مفاهيمي)', data: [33, 33, 34], backgroundColor: ['#f59e0b','#a78bfa','#22d3ee'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  }), []);

  return (
    <div id="lesson-root" className="space-y-8">
      <div className="flex sm:hidden">
        <button onClick={()=>window.history.back()} className="mb-2 ms-auto px-3 py-1.5 rounded-lg border">رجوع</button>
      </div>
      <SectionCard id="intro" title={`${lesson.title}`}>
        <p className="text-muted-foreground mb-4">مرحبًا بك! هذه الصفحة تحتوي على كل ما يخص الدرس: ملخص صوتي، شرح مبسّط، رسوم توضيحية، اختبار، وملف PDF.</p>
        <AudioPlayer src={lesson.audioSrc} title="ملخص الدرس الصوتي" />
      </SectionCard>

      <SectionCard id="lesson" title="الشرح المبسّط">
        <MarkdownView src={`/content/lesson${lesson.id}.md`} />
      </SectionCard>

      <SectionCard id="charts" title="رسوم بيانية (Chart.js)">
        <div className="grid md:grid-cols-2 gap-4">
          <ChartBlock config={chartConfig} />
          <ChartBlock config={compositionConfig} />
        </div>
        <div className="mt-4">
          <MermaidBlock code={`flowchart TD\nA[مادة] -->|تسخين| B(سائل)\nB -->|تبخير| C{غاز}\nC -->|تكثيف| B\nB -->|تبريد| D[صلب]`} />
        </div>
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
