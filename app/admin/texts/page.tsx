"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import type { HomepageData, VolunteersData } from "@/lib/types";

type Tab = "homepage" | "volunteers";

export default function AdminTextsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("homepage");
    const [homepage, setHomepage] = useState<HomepageData | null>(null);
    const [volunteers, setVolunteers] = useState<VolunteersData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() => {
        Promise.all([
            fetch("/api/admin/homepage").then((r) => r.json()),
            fetch("/api/admin/volunteers").then((r) => r.json()),
        ]).then(([hp, vol]) => {
            setHomepage(hp);
            setVolunteers(vol);
            setLoading(false);
        });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        setSaving(true);
        if (activeTab === "homepage" && homepage) {
            await fetch("/api/admin/homepage", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(homepage),
            });
        }
        if (activeTab === "volunteers" && volunteers) {
            await fetch("/api/admin/volunteers", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(volunteers),
            });
        }
        setSaving(false);
        showToast("Сохранено!");
    };

    if (loading) return <div className="text-slate-400 p-8">Загрузка...</div>;

    const inputClass = "w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";
    const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

    return (
        <div>
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg shadow-lg">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Тексты страниц</h1>
                    <p className="text-slate-400 text-sm mt-1">Редактирование текстового контента</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50"
                >
                    <Save size={16} />
                    {saving ? "Сохранение..." : "Сохранить"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { key: "homepage" as Tab, label: "Главная" },
                    { key: "volunteers" as Tab, label: "Волонтёры" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === tab.key
                                ? "bg-blue-600/20 text-blue-400"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Homepage editor */}
            {activeTab === "homepage" && homepage && (
                <div className="space-y-6">
                    {/* Hero */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-4">Hero секция</h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Заголовок</label>
                                <input value={homepage.hero.title} onChange={(e) => setHomepage({ ...homepage, hero: { ...homepage.hero, title: e.target.value } })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Акцент (цветной текст)</label>
                                <input value={homepage.hero.titleAccent} onChange={(e) => setHomepage({ ...homepage, hero: { ...homepage.hero, titleAccent: e.target.value } })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Описание</label>
                                <textarea value={homepage.hero.description} onChange={(e) => setHomepage({ ...homepage, hero: { ...homepage.hero, description: e.target.value } })} rows={3} className={`${inputClass} resize-none`} />
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-4">CTA секция</h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Заголовок</label>
                                <input value={homepage.cta.title} onChange={(e) => setHomepage({ ...homepage, cta: { ...homepage.cta, title: e.target.value } })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Описание</label>
                                <textarea value={homepage.cta.description} onChange={(e) => setHomepage({ ...homepage, cta: { ...homepage.cta, description: e.target.value } })} rows={2} className={`${inputClass} resize-none`} />
                            </div>
                        </div>
                    </div>

                    {/* Doctors section */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                        <h3 className="text-white font-semibold mb-4">Секция «Врачи»</h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Заголовок</label>
                                <input value={homepage.doctorsSection.title} onChange={(e) => setHomepage({ ...homepage, doctorsSection: { ...homepage.doctorsSection, title: e.target.value } })} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Описание</label>
                                <textarea value={homepage.doctorsSection.description} onChange={(e) => setHomepage({ ...homepage, doctorsSection: { ...homepage.doctorsSection, description: e.target.value } })} rows={2} className={`${inputClass} resize-none`} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Volunteers editor */}
            {activeTab === "volunteers" && volunteers && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                    <div>
                        <label className={labelClass}>Бейдж</label>
                        <input value={volunteers.badge} onChange={(e) => setVolunteers({ ...volunteers, badge: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Заголовок</label>
                        <input value={volunteers.title} onChange={(e) => setVolunteers({ ...volunteers, title: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Вступление</label>
                        <textarea value={volunteers.intro} onChange={(e) => setVolunteers({ ...volunteers, intro: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Предложения (по одному на строку)</label>
                        <textarea
                            value={volunteers.offers.join("\n")}
                            onChange={(e) => setVolunteers({ ...volunteers, offers: e.target.value.split("\n").filter(Boolean) })}
                            rows={4}
                            className={`${inputClass} resize-none`}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Заголовок формы</label>
                        <input value={volunteers.formTitle} onChange={(e) => setVolunteers({ ...volunteers, formTitle: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Текст успеха</label>
                        <input value={volunteers.successTitle} onChange={(e) => setVolunteers({ ...volunteers, successTitle: e.target.value })} className={inputClass} />
                    </div>
                </div>
            )}
        </div>
    );
}
