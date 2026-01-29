import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import Button from "@/components/ui/Button";

// Same articles data - in production this would come from a CMS or database
const articles = [
    {
        id: 1,
        slug: "kak-podgotovit-pitomca-k-operacii",
        title: "Как подготовить питомца к операции",
        excerpt: "Важные советы по подготовке вашего питомца к хирургическому вмешательству.",
        date: "2024-01-15",
        image: "/articles/surgery-prep.jpg",
        category: "Хирургия",
        content: `
      <h2>Подготовка к операции</h2>
      <p>Хирургическое вмешательство — это стресс как для питомца, так и для владельца. Правильная подготовка поможет минимизировать риски и ускорить восстановление.</p>
      
      <h3>За неделю до операции</h3>
      <ul>
        <li>Пройдите предоперационное обследование</li>
        <li>Сдайте необходимые анализы</li>
        <li>Проконсультируйтесь с анестезиологом</li>
      </ul>
      
      <h3>За день до операции</h3>
      <ul>
        <li>Ограничьте прием пищи за 12 часов до операции</li>
        <li>Воду можно давать за 4-6 часов</li>
        <li>Подготовьте переноску и теплое одеяло</li>
      </ul>
      
      <h3>В день операции</h3>
      <p>Приезжайте в клинику в назначенное время. Врач проведет осмотр и ответит на все ваши вопросы.</p>
    `,
    },
    {
        id: 2,
        slug: "vakcinacija-sobak-i-koshek",
        title: "Вакцинация собак и кошек: полное руководство",
        excerpt: "Когда и какие прививки нужны вашему питомцу.",
        date: "2024-01-10",
        image: "/articles/vaccination.jpg",
        category: "Профилактика",
        content: `
      <h2>Зачем нужна вакцинация?</h2>
      <p>Вакцинация защищает вашего питомца от опасных инфекционных заболеваний и помогает сформировать стойкий иммунитет.</p>
      
      <h3>График вакцинации для щенков</h3>
      <ul>
        <li>8 недель — первая комплексная вакцина</li>
        <li>12 недель — ревакцинация + бешенство</li>
        <li>Далее ежегодно</li>
      </ul>
      
      <h3>График вакцинации для котят</h3>
      <ul>
        <li>8-9 недель — первая комплексная вакцина</li>
        <li>12 недель — ревакцинация + бешенство</li>
        <li>Далее ежегодно</li>
      </ul>
    `,
    },
    {
        id: 3,
        slug: "pravilnoe-pitanie-domashnih-zhivotnyh",
        title: "Правильное питание домашних животных",
        excerpt: "Как составить сбалансированный рацион для вашего питомца.",
        date: "2024-01-05",
        image: "/articles/nutrition.jpg",
        category: "Питание",
        content: `
      <h2>Основы правильного питания</h2>
      <p>Сбалансированное питание — залог здоровья и долголетия вашего питомца.</p>
      
      <h3>Что важно учитывать</h3>
      <ul>
        <li>Возраст и размер животного</li>
        <li>Уровень активности</li>
        <li>Особенности породы</li>
        <li>Наличие заболеваний</li>
      </ul>
      
      <h3>Рекомендации</h3>
      <p>Консультируйтесь с ветеринарным диетологом для подбора оптимального рациона.</p>
    `,
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

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="section">
            <div className="container-custom max-w-4xl">
                {/* Back Link */}
                <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Все статьи
                </Link>

                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm font-medium rounded-full">
                            {article.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} />
                            <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </div>
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {article.title}
                    </h1>

                    <p className="text-lg text-gray-600">
                        {article.excerpt}
                    </p>
                </header>

                {/* Featured Image */}
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 bg-gray-100">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Article Content */}
                <article
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-[var(--color-primary)]"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share & CTA */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                        <Share2 size={18} />
                        Поделиться
                    </button>

                    <Button href="/contacts" variant="primary">
                        Записаться на приём
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Generate static params for all articles
export function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}
