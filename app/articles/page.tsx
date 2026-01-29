import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

// Placeholder articles data
const articles = [
    {
        id: 1,
        slug: "kak-podgotovit-pitomca-k-operacii",
        title: "Как подготовить питомца к операции",
        excerpt: "Важные советы по подготовке вашего питомца к хирургическому вмешательству. Что нужно знать владельцу.",
        date: "2024-01-15",
        image: "/articles/surgery-prep.jpg",
        category: "Хирургия",
    },
    {
        id: 2,
        slug: "vakcinacija-sobak-i-koshek",
        title: "Вакцинация собак и кошек: полное руководство",
        excerpt: "Когда и какие прививки нужны вашему питомцу. График вакцинации и важные нюансы.",
        date: "2024-01-10",
        image: "/articles/vaccination.jpg",
        category: "Профилактика",
    },
    {
        id: 3,
        slug: "pravilnoe-pitanie-domashnih-zhivotnyh",
        title: "Правильное питание домашних животных",
        excerpt: "Как составить сбалансированный рацион для вашего питомца. Советы ветеринарного диетолога.",
        date: "2024-01-05",
        image: "/articles/nutrition.jpg",
        category: "Питание",
    },
];

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function ArticlesPage() {
    return (
        <div className="section">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Статьи
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Полезные материалы о здоровье и уходе за вашими питомцами от наших специалистов
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-medium rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <Calendar size={14} />
                                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                    <Link href={`/articles/${article.slug}`}>
                                        {article.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {article.excerpt}
                                </p>

                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium text-sm hover:gap-3 transition-all"
                                >
                                    Читать далее
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State Note */}
                {articles.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">Статьи скоро появятся</p>
                    </div>
                )}
            </div>
        </div>
    );
}
