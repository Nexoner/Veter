"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import type { ContactInfo } from "@/lib/types";

export default function AdminContactsPage() {
    const [contacts, setContacts] = useState<ContactInfo>({
        phone: "",
        emergencyPhone: "",
        email: "",
        address: "",
        hours: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() => {
        fetch("/api/admin/contacts")
            .then((r) => r.json())
            .then((data) => { setContacts(data); setLoading(false); });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/admin/contacts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacts),
        });
        setSaving(false);
        showToast("Сохранено!");
    };

    if (loading) return <div className="text-slate-400 p-8">Загрузка...</div>;

    const fields: { key: keyof ContactInfo; label: string; placeholder: string }[] = [
        { key: "phone", label: "Основной телефон", placeholder: "+7 (495) 123-45-67" },
        { key: "emergencyPhone", label: "Экстренный телефон", placeholder: "+7 (495) 999-99-99" },
        { key: "email", label: "Email", placeholder: "info@veterok.ru" },
        { key: "address", label: "Адрес", placeholder: "г. Москва, 4 клиники" },
        { key: "hours", label: "Часы работы", placeholder: "Ежедневно 9:00 — 22:00" },
    ];

    return (
        <div>
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg shadow-lg">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Контакты</h1>
                    <p className="text-slate-400 text-sm mt-1">Контактная информация сайта</p>
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

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                {fields.map((field) => (
                    <div key={field.key}>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            {field.label}
                        </label>
                        <input
                            value={contacts[field.key]}
                            onChange={(e) => setContacts({ ...contacts, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
