import Chatbot from "@/components/Chatbot";
import SectionCard from "@/components/SectionCard";

export default function ChatbotPage() {
  return (
    <div className="space-y-4">
      <div className="flex">
        <button onClick={()=>window.history.back()} className="ms-auto px-3 py-1.5 rounded-lg border">رجوع</button>
      </div>
      <SectionCard id="chatbot-page" title="الشات بوت">
        <p className="text-sm text-muted-foreground mb-3">هذا الشات بوت يعتمد على ملفات JSON معرفة مسبقًا، ويجيب وفقًا للبيانات المتوفرة لديه.</p>
        <Chatbot />
      </SectionCard>
    </div>
  );
}
