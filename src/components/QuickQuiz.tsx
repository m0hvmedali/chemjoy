import { useState } from "react";

export default function QuickQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const questions = [
    { id: 'q1', q: 'ما هو أصغر جزء يحتفظ بخصائص العنصر؟', options: ['الجزيء', 'الذرة', 'الأيون'], correct: 'الذرة' },
    { id: 'q2', q: 'الماء مثال على:', options: ['عنصر', 'مركّب', 'خليط'], correct: 'مركّب' },
    { id: 'q3', q: 'يمكن فصل مكوّنات الخليط باستخدام:', options: ['تفاعل كيميائي فقط', 'طرق فيزيائية', 'لا يمكن فصله'], correct: 'طرق فيزيائية' },
  ];
  const submit = () => {
    let s = 0; questions.forEach((x) => { if (answers[x.id] === x.correct) s++; }); setScore(s);
  };
  return (
    <div className="space-y-3">
      {questions.map((x) => (
        <div key={x.id} className="border rounded-lg p-3">
          <div className="mb-2">{x.q}</div>
          <div className="flex flex-wrap gap-2">
            {x.options.map((o) => (
              <label key={o} className={`px-3 py-1.5 rounded-full border cursor-pointer ${answers[x.id]===o? 'bg-primary/10 border-primary/40':'hover:bg-accent'}`}>
                <input type="radio" name={x.id} value={o} className="hidden" onChange={()=>setAnswers(a=>({...a,[x.id]:o}))} />
                {o}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button onClick={submit} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">تحقق من الإجابات</button>
        {score !== null && (
          <span className="text-sm">نتيجتك: {score} / 3</span>
        )}
      </div>
    </div>
  );
}
