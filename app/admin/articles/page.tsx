"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import EditModal, { ModalInput } from "@/components/admin/EditModal";
import type { Article } from "@/lib/types";

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState("");

    useEffect(() => {
        fetch("/api/admin/articles")
            .then((r) => r.json())
            .then((data) => { setArticles(data); setLoading(false); });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        if (!editingArticle) return;
        setSaving(true);

        const updated = editingArticle.id
            ? articles.map((a) => (a.id === editingArticle.id ? editingArticle : a))
            : [...articles, { ...editingArticle, id: Date.now() }];

        await fetch("/api/admin/articles", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setArticles(updated);
        setIsModalOpen(false);
        setEditingArticle(null);
        setSaving(false);
        showToast("Сохранено!");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить эту статью?")) return;
        const updated = articles.filter((a) => a.id !== id);
        await fetch("/api/admin/articles", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });
        setArticles(updated);
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
                    <h1 className="text-2xl font-bold text-white">Статьи</h1>
                    <p className="text-slate-400 text-sm mt-1">{articles.length} статей</p>
                </div>
                <button
                    onClick={() => {
                        setEditingArticle({ id: 0, slug: "", title: "", excerpt: "", date: new Date().toISOString().split("T")[0], image: "", category: "" });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all"
                >
                    <Plus size={16} />
                    Добавить
                </button>
            </div>

            {/* Articles list */}
            <div className="space-y-3">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-start justify-between gap-4 hover:border-slate-600/50 transition-all"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                                    {article.category}
                                </span>
                                <span className="text-xs text-slate-500">{article.date}</span>
                            </div>
                            <h3 className="text-white font-medium text-sm truncate">{article.title}</h3>
                            <p className="text-slate-500 text-xs mt-1 line-clamp-1">{article.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => { setEditingArticle({ ...article }); setIsModalOpen(true); }}
                                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all"
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(article.id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <EditModal
                isOpen={isModalOpen}
                title={editingArticle?.id ? "Редактировать статью" : "Новая статья"}
                onClose={() => { setIsModalOpen(false); setEditingArticle(null); }}
                onSave={handleSave}
                saving={saving}
            >
                {editingArticle && (
                    <>
                        <ModalInput label="Заголовок" value={editingArticle.title} onChange={(v) => setEditingArticle({ ...editingArticle, title: v })} />
                        <ModalInput label="Slug (URL)" value={editingArticle.slug} onChange={(v) => setEditingArticle({ ...editingArticle, slug: v })} placeholder="statya-pro-zhivotnykh" />
                        <ModalInput label="Описание" value={editingArticle.excerpt} onChange={(v) => setEditingArticle({ ...editingArticle, excerpt: v })} type="textarea" />
                        <ModalInput label="Категория" value={editingArticle.category} onChange={(v) => setEditingArticle({ ...editingArticle, category: v })} placeholder="Хирургия" />
                        <ModalInput label="Дата" value={editingArticle.date} onChange={(v) => setEditingArticle({ ...editingArticle, date: v })} type="date" />
                        <ModalInput label="Изображение" value={editingArticle.image} onChange={(v) => setEditingArticle({ ...editingArticle, image: v })} placeholder="/articles/image.jpg" />
                    </>
                )}
            </EditModal>
        </div>
    );
}
