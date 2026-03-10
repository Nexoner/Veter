"use client";

import AdminCard from "@/components/admin/AdminCard";
import Link from "next/link";
import {
    Users,
    Stethoscope,
    FileText,
    Building2,
    ArrowRight,
} from "lucide-react";

interface DashboardProps {
    doctorsCount: number;
    servicesCount: number;
    articlesCount: number;
    clinicsCount: number;
}

const quickLinks = [
    { href: "/admin/doctors", label: "Управление врачами", icon: Users },
    { href: "/admin/services", label: "Редактировать услуги", icon: Stethoscope },
    { href: "/admin/articles", label: "Управление статьями", icon: FileText },
    { href: "/admin/clinics", label: "Редактировать клиники", icon: Building2 },
];

export default function AdminDashboardClient({
    doctorsCount,
    servicesCount,
    articlesCount,
    clinicsCount,
}: DashboardProps) {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1">Обзор данных сайта</p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <AdminCard title="Врачи" value={doctorsCount} icon={Users} color="blue" />
                <AdminCard title="Услуги" value={servicesCount} icon={Stethoscope} color="green" />
                <AdminCard title="Статьи" value={articlesCount} icon={FileText} color="purple" />
                <AdminCard title="Клиники" value={clinicsCount} icon={Building2} color="orange" />
            </div>

            {/* Quick Links */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Быстрые действия</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} className="text-slate-400" />
                                    <span className="text-sm text-slate-300">{link.label}</span>
                                </div>
                                <ArrowRight
                                    size={16}
                                    className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                                />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
