"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    FileText,
    Building2,
    Phone,
    Type,
    ChevronLeft,
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/doctors", label: "Врачи", icon: Users },
    { href: "/admin/services", label: "Услуги", icon: Stethoscope },
    { href: "/admin/articles", label: "Статьи", icon: FileText },
    { href: "/admin/clinics", label: "Клиники", icon: Building2 },
    { href: "/admin/contacts", label: "Контакты", icon: Phone },
    { href: "/admin/texts", label: "Тексты", icon: Type },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white tracking-tight">
                    ВетерОК!
                    <span className="text-blue-400 ml-1 text-sm font-normal">admin</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-blue-600/20 text-blue-400"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Back to site */}
            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-300 transition-colors rounded-xl hover:bg-slate-800/50"
                >
                    <ChevronLeft size={16} />
                    На сайт
                </Link>
            </div>
        </aside>
    );
}
