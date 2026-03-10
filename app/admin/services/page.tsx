"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import EditModal, { ModalInput } from "@/components/admin/EditModal";
import type { ServiceCategory, ServiceItem } from "@/lib/types";

export default function AdminServicesPage() {
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() => {
        fetch("/api/admin/services")
            .then((r) => r.json())
            .then((data) => { setCategories(data); setLoading(false); });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const saveAll = async (updated: ServiceCategory[]) => {
        setSaving(true);
        await fetch("/api/admin/services", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });
        setCategories(updated);
        setSaving(false);
        showToast("Сохранено!");
    };

    const handleSaveCategory = async () => {
        if (!editingCategory) return;
        const updated = editingCategory.id
            ? categories.map((c) => (c.id === editingCategory.id ? editingCategory : c))
            : [...categories, { ...editingCategory, id: Date.now() }];
        await saveAll(updated);
        setIsModalOpen(false);
        setEditingDoctor(null);
    };

    // Fix — wrong function name above (just a compilation note)
    const setEditingDoctor = setEditingCategory;

    const handleDeleteCategory = async (id: number) => {
        if (!confirm("Удалить эту категорию со всеми услугами?")) return;
        await saveAll(categories.filter((c) => c.id !== id));
    };

    const handleAddService = (categoryId: number) => {
        const updated = categories.map((c) => {
            if (c.id !== categoryId) return c;
            return {
                ...c,
                services: [...c.services, { name: "Новая услуга", price: "от 0 ₽" }],
            };
        });
        setCategories(updated);
    };

    const handleUpdateService = (categoryId: number, index: number, field: keyof ServiceItem, value: string) => {
        const updated = categories.map((c) => {
            if (c.id !== categoryId) return c;
            const services = [...c.services];
            services[index] = { ...services[index], [field]: value };
            return { ...c, services };
        });
        setCategories(updated);
    };

    const handleDeleteService = (categoryId: number, index: number) => {
        const updated = categories.map((c) => {
            if (c.id !== categoryId) return c;
            return { ...c, services: c.services.filter((_, i) => i !== index) };
        });
        setCategories(updated);
    };

    const handleSaveInline = () => saveAll(categories);

    if (loading) return <div className="text-slate-400 p-8">Загрузка...</div>;

    return (
        <div>
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg shadow-lg">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Услуги</h1>
                    <p className="text-slate-400 text-sm mt-1">{categories.length} категорий</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSaveInline}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50"
                    >
                        Сохранить всё
                    </button>
                    <button
                        onClick={() => {
                            setEditingCategory({ id: 0, name: "", services: [] });
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all"
                    >
                        <Plus size={16} />
                        Категория
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                        {/* Category header */}
                        <div
                            className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                            onClick={() => setExpandedId(expandedId === category.id ? null : category.id)}
                        >
                            <div className="flex items-center gap-3">
                                {expandedId === category.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                                <h3 className="font-semibold text-white">{category.name}</h3>
                                <span className="text-xs text-slate-500">{category.services.length} услуг</span>
                            </div>
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => { setEditingCategory({ ...category }); setIsModalOpen(true); }}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Services list */}
                        {expandedId === category.id && (
                            <div className="border-t border-slate-700/50 px-6 py-4 space-y-2">
                                {category.services.map((service, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <input
                                            value={service.name}
                                            onChange={(e) => handleUpdateService(category.id, idx, "name", e.target.value)}
                                            className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            value={service.price}
                                            onChange={(e) => handleUpdateService(category.id, idx, "price", e.target.value)}
                                            className="w-32 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={() => handleDeleteService(category.id, idx)}
                                            className="p-2 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddService(category.id)}
                                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-blue-400 transition-colors"
                                >
                                    <Plus size={14} />
                                    Добавить услугу
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Category name modal */}
            <EditModal
                isOpen={isModalOpen}
                title={editingCategory?.id ? "Переименовать категорию" : "Новая категория"}
                onClose={() => { setIsModalOpen(false); setEditingCategory(null); }}
                onSave={handleSaveCategory}
                saving={saving}
            >
                {editingCategory && (
                    <ModalInput
                        label="Название категории"
                        value={editingCategory.name}
                        onChange={(v) => setEditingCategory({ ...editingCategory, name: v })}
                        placeholder="Терапия"
                    />
                )}
            </EditModal>
        </div>
    );
}
