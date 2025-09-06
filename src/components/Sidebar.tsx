import { useEffect, useState } from "react";

const links = [
  { id: "/", label: "الرئيسية", href: "#/" },
  { id: "/lessons", label: "الدروس", href: "#/lessons" },
  { id: "/chatbot", label: "الشات بوت", href: "#/chatbot" },
  { id: "/settings", label: "الإعدادات", href: "#/settings" },
];

export default function Sidebar({ route }: { route: string }) {
  const [active, setActive] = useState<string>(route);
  useEffect(() => setActive(route), [route]);

  return (
    <aside className="block sticky top-[72px] h-auto lg:h-[calc(100vh-72px)] w-full lg:w-60 pe-0 lg:pe-4">
      <div className="h-full overflow-auto pe-2">
        <ul className="flex lg:block gap-2 lg:space-y-1 overflow-auto">
          {links.map((s) => (
            <li key={s.id} className="min-w-[120px] lg:min-w-0">
              <a
                href={s.href}
                className={`block px-3 py-2 rounded-lg border transition text-center lg:text-start ${
                  active === s.id ? "bg-primary/10 border-primary/30" : "border-transparent hover:bg-accent"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
