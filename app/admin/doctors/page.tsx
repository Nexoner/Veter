"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import EditModal, { ModalInput } from "@/components/admin/EditModal";
import type { Doctor } from "@/lib/types";

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() => {
        fetch("/api/admin/doctors")
            .then((r) => r.json())
            .then((data) => { setDoctors(data); setLoading(false); });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        setSaving(true);
        if (!editingDoctor) return;

        const updated = editingDoctor.id
            ? doctors.map((d) => (d.id === editingDoctor.id ? editingDoctor : d))
            : [...doctors, { ...editingDoctor, id: Date.now() }];

        await fetch("/api/admin/doctors", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setDoctors(updated);
        setIsModalOpen(false);
        setEditingDoctor(null);
        setSaving(false);
        showToast("Сохранено!");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить этого врача?")) return;
        const updated = doctors.filter((d) => d.id !== id);
        await fetch("/api/admin/doctors", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });
        setDoctors(updated);
        showToast("Удалено!");
    };

    const openEdit = (doctor: Doctor) => {
        setEditingDoctor({ ...doctor });
        setIsModalOpen(true);
    };

    const openNew = () => {
        setEditingDoctor({ id: 0, name: "", title: "", specialty: "", image: "" });
        setIsModalOpen(true);
    };

    if (loading) {
        return <div className="text-slate-400 p-8">Загрузка...</div>;
    }

    return (
        <div>
            {toast && (
                <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg shadow-lg animate-pulse">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Врачи</h1>
                    <p className="text-slate-400 text-sm mt-1">{doctors.length} врачей</p>
                </div>
                <button
                    onClick={openNew}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all"
                >
                    <Plus size={16} />
                    Добавить
                </button>
            </div>

            {/* Table */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700/50">
                            <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Фото</th>
                            <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">ФИО</th>
                            <th className="text-left text-sm font-medium text-slate-400 px-6 py-4 hidden lg:table-cell">Должность</th>
                            <th className="text-right text-sm font-medium text-slate-400 px-6 py-4">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                        {doc.image && (
                                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-white font-medium text-sm">{doc.name}</p>
                                    <p className="text-slate-500 text-xs mt-0.5 lg:hidden">{doc.title}</p>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <p className="text-slate-400 text-sm">{doc.title}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => openEdit(doc)}
                                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc.id)}
                                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <EditModal
                isOpen={isModalOpen}
                title={editingDoctor?.id ? "Редактировать врача" : "Добавить врача"}
                onClose={() => { setIsModalOpen(false); setEditingDoctor(null); }}
                onSave={handleSave}
                saving={saving}
            >
                {editingDoctor && (
                    <>
                        <ModalInput
                            label="ФИО"
                            value={editingDoctor.name}
                            onChange={(v) => setEditingDoctor({ ...editingDoctor, name: v })}
                            placeholder="Иванов Иван Иванович"
                        />
                        <ModalInput
                            label="Должность"
                            value={editingDoctor.title}
                            onChange={(v) => setEditingDoctor({ ...editingDoctor, title: v })}
                            placeholder="Врач-терапевт, хирург"
                        />
                        <ModalInput
                            label="Специализация"
                            value={editingDoctor.specialty}
                            onChange={(v) => setEditingDoctor({ ...editingDoctor, specialty: v })}
                            placeholder="Хирургия, терапия"
                        />
                        <ModalInput
                            label="Путь к фото"
                            value={editingDoctor.image}
                            onChange={(v) => setEditingDoctor({ ...editingDoctor, image: v })}
                            placeholder="/doctor.webp"
                        />
                    </>
                )}
            </EditModal>
        </div>
    );
}
