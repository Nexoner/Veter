"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "logout" }),
        });
        router.push("/admin/login");
    };

    return (
        <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-end px-6 sticky top-0 z-30">
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50 transition-all"
            >
                <LogOut size={16} />
                Выйти
            </button>
        </header>
    );
}
