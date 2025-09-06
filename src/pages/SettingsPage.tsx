import SectionCard from "@/components/SectionCard";
import SettingsPanel from "@/components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex">
        <button onClick={()=>window.history.back()} className="ms-auto px-3 py-1.5 rounded-lg border">رجوع</button>
      </div>
      <SectionCard id="settings" title="الإعدادات">
        <SettingsPanel />
      </SectionCard>
    </div>
  );
}
