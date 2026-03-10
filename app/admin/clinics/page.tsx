"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import EditModal, { ModalInput } from "@/components/admin/EditModal";
import type { Clinic } from "@/lib/types";

export default function AdminClinicsPage() {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() => {
        fetch("/api/admin/clinics")
            .then((r) => r.json())
            .then((data) => { setClinics(data); setLoading(false); });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        if (!editingClinic) return;
        setSaving(true);

        const updated = editingClinic.id
            ? clinics.map((c) => (c.id === editingClinic.id ? editingClinic : c))
            : [...clinics, { ...editingClinic, id: Date.now() }];

        await fetch("/api/admin/clinics", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setClinics(updated);
        setIsModalOpen(false);
        setEditingClinic(null);
        setSaving(false);
        showToast("Сохранено!");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить эту клинику?")) return;
        const updated = clinics.filter((c) => c.id !== id);
        await fetch("/api/admin/clinics", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });
        setClinics(updated);
        showToast("Удалено!");
    };

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
                    <h1 className="text-2xl font-bold text-white">Клиники</h1>
                    <p className="text-slate-400 text-sm mt-1">{clinics.length} клиник</p>
                </div>
                <button
                    onClick={() => {
                        setEditingClinic({ id: 0, name: "", address: "", metro: "", phone: "", hours: "", coordinates: { lat: 55.75, lng: 37.62 } });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all"
                >
                    <Plus size={16} />
                    Добавить
                </button>
            </div>

            {/* Clinics grid */}
            <div className="grid sm:grid-cols-2 gap-4">
                {clinics.map((clinic) => (
                    <div
                        key={clinic.id}
                        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-white text-sm">{clinic.name}</h3>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => { setEditingClinic({ ...clinic }); setIsModalOpen(true); }}
                                    className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(clinic.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-slate-400">
                            <MapPin size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p>{clinic.address}</p>
                                <p className="text-slate-500">{clinic.metro}</p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                            <span>{clinic.phone}</span>
                            <span>{clinic.hours}</span>
                        </div>
                    </div>
                ))}
            </div>

            <EditModal
                isOpen={isModalOpen}
                title={editingClinic?.id ? "Редактировать клинику" : "Новая клиника"}
                onClose={() => { setIsModalOpen(false); setEditingClinic(null); }}
                onSave={handleSave}
                saving={saving}
            >
                {editingClinic && (
                    <>
                        <ModalInput label="Название" value={editingClinic.name} onChange={(v) => setEditingClinic({ ...editingClinic, name: v })} />
                        <ModalInput label="Адрес" value={editingClinic.address} onChange={(v) => setEditingClinic({ ...editingClinic, address: v })} />
                        <ModalInput label="Метро" value={editingClinic.metro} onChange={(v) => setEditingClinic({ ...editingClinic, metro: v })} />
                        <ModalInput label="Телефон" value={editingClinic.phone} onChange={(v) => setEditingClinic({ ...editingClinic, phone: v })} />
                        <ModalInput label="Часы работы" value={editingClinic.hours} onChange={(v) => setEditingClinic({ ...editingClinic, hours: v })} />
                        <div className="grid grid-cols-2 gap-4">
                            <ModalInput
                                label="Широта"
                                value={String(editingClinic.coordinates.lat)}
                                onChange={(v) => setEditingClinic({ ...editingClinic, coordinates: { ...editingClinic.coordinates, lat: parseFloat(v) || 0 } })}
                            />
                            <ModalInput
                                label="Долгота"
                                value={String(editingClinic.coordinates.lng)}
                                onChange={(v) => setEditingClinic({ ...editingClinic, coordinates: { ...editingClinic.coordinates, lng: parseFloat(v) || 0 } })}
                            />
                        </div>
                    </>
                )}
            </EditModal>
        </div>
    );
}
