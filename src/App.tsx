import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ScrollTop from "./components/ScrollTop";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import LessonPage from "./pages/LessonPage";
import ChatbotPage from "./pages/ChatbotPage";
import SettingsPage from "./pages/SettingsPage";
import { getLessonById } from "./lessons";

function useRoute() {
  const get = () => (window.location.hash.slice(1) || "/");
  const [route, setRoute] = useState<string>(get());
  useEffect(() => {
    const onHash = () => setRoute(get());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const [search, setSearch] = useState("");
  const route = useRoute();

  const page = (() => {
    if (route === "/") return <Home />;
    if (route === "/lessons") return <Lessons />;
    if (route.startsWith("/lesson/")) {
      const id = route.split("/")[2] || "1";
      const lesson = getLessonById(id);
      if (lesson) return <LessonPage lesson={lesson} search={search} />;
      return <Home />;
    }
    if (route === "/chatbot") return <ChatbotPage />;
    if (route === "/settings") return <SettingsPage />;
    return <Home />;
  })();

  return (
    <div className="min-h-screen" style={{
      // @ts-ignore
      fontSize: `var(--user-font-size, 16px)`, lineHeight: `var(--user-line-height, 28px)`
    }}>
      <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(1000px_circle_at_80%_20%,theme(colors.primary/.12),transparent),radial-gradient(800px_circle_at_20%_10%,theme(colors.primary/.08),transparent)]" />
      <Header onSearch={setSearch} route={route} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 py-6">
          <main id="main-content" className="space-y-8">
            {page}
            <footer className="text-sm text-muted-foreground py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <div>© {new Date().getFullYear()} ChemJoy. جميع الحقوق محفوظة.</div>
                <div className="flex gap-3">
                  <a className="hover:text-foreground" href="#/">الرئيسية</a>
                  <a className="hover:text-foreground" href="#/lessons">الدروس</a>
                  <a className="hover:text-foreground" href="#/settings">الإعدادات</a>
                </div>
              </div>
            </footer>
          </main>
          <Sidebar route={route} />
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}
