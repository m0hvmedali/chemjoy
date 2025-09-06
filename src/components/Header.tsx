import { useEffect, useState } from "react";
import { Sun, Moon, Search, User, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header({ onSearch, route }: { onSearch: (q: string) => void; route: string }) {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
  const [name, setName] = useState<string>(() => localStorage.getItem("chemjoy:name") || "");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!name) setShowLogin(true);
  }, [name]);

  useEffect(() => {
    // default colorful palette
    const saved = localStorage.getItem("chemjoy:palette");
    if (!saved) document.documentElement.classList.add("theme-blue");
  }, []);

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("username") as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      localStorage.setItem("chemjoy:name", value);
      setName(value);
      setShowLogin(false);
    }
  };

  const showSearch = route.startsWith("/lesson/");
  const notHome = route !== "/";

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg border ${notHome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          title="رجوع"
        >
          <ArrowRight size={16} /> رجوع
        </button>
        <a href="#/" className="font-semibold text-lg">ChemJoy</a>
        <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#/" className="hover:text-foreground">الرئيسية</a>
          <a href="#/lessons" className="hover:text-foreground">الدروس</a>
          <a href="#/chatbot" className="hover:text-foreground">الشات بوت</a>
          <a href="#/settings" className="hover:text-foreground">الإعدادات</a>
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <button className="md:hidden p-2 rounded-full border" onClick={()=>setShowNav(true)} aria-label="القائمة">
            <Menu size={18} />
          </button>
          {showSearch && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(q);
              }}
              className="hidden sm:flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5"
            >
              <Search size={18} className="text-muted-foreground" />
              <input
                aria-label="بحث"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث داخل الدرس"
                className="bg-transparent focus:outline-none text-sm"
              />
            </form>
          )}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn("p-2 rounded-full border border-border hover:bg-accent transition")}
            aria-label="تبديل الوضع"
            title="تبديل الوضع"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-accent"
          >
            <User size={18} />
            <span className="text-sm">{name ? `مرحبًا، ${name}` : "تسجيل الدخول"}</span>
          </button>
        </div>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center" onClick={() => setShowLogin(false)}>
          <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in slide-in-from-bottom-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">أدخل اسمك للترحيب</h2>
            <form onSubmit={submitName} className="space-y-4">
              <input name="username" autoFocus placeholder="اسمك" className="w-full border border-border rounded-lg px-3 py-2 bg-background" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowLogin(false)} className="px-3 py-1.5 rounded-lg border">إلغاء</button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground">حفظ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNav && (
        <div className="fixed inset-0 z-[55] bg-black/60 md:hidden" onClick={()=>setShowNav(false)}>
          <div className="absolute inset-y-0 start-0 w-80 max-w-[85%] bg-background border-e border-border p-4 shadow-2xl animate-in slide-in-from-left" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <strong>ChemJoy</strong>
              <button className="p-2 rounded-lg border" onClick={()=>setShowNav(false)} aria-label="إغلاق"><X size={18} /></button>
            </div>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="#/" className="px-3 py-2 rounded-lg border hover:bg-accent" onClick={()=>setShowNav(false)}>الرئيسية</a>
              <a href="#/lessons" className="px-3 py-2 rounded-lg border hover:bg-accent" onClick={()=>setShowNav(false)}>الدروس</a>
              <a href="#/chatbot" className="px-3 py-2 rounded-lg border hover:bg-accent" onClick={()=>setShowNav(false)}>الشات بوت</a>
              <a href="#/settings" className="px-3 py-2 rounded-lg border hover:bg-accent" onClick={()=>setShowNav(false)}>الإعدادات</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
