import Button from "@/components/ui/Button";
import { Phone, Info } from "lucide-react";
import { getServices } from "@/lib/data-store";

export default async function ServicesPage() {
    const serviceCategories = await getServices();

    return (
        <div className="section">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Услуги и цены
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Прайс-лист на популярные услуги. Точную стоимость уточняйте у врача после осмотра.
                    </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-[var(--color-primary-light)] rounded-2xl p-4 mb-8 flex items-start gap-3">
                    <Info size={20} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                        Указанные цены являются ориентировочными. Окончательная стоимость зависит от сложности случая и определяется после осмотра врачом.
                    </p>
                </div>

                {/* Services Categories */}
                <div className="space-y-8">
                    {serviceCategories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100"
                        >
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {category.services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-gray-700">{service.name}</span>
                                        <span className="font-semibold text-gray-900 whitespace-nowrap ml-4">
                                            {service.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 bg-gradient-to-r from-[var(--color-primary)] to-blue-600 rounded-3xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Остались вопросы по ценам?
                    </h2>
                    <p className="text-white/80 mb-6">
                        Позвоните нам или запишитесь на консультацию
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="tel:+74951234567" variant="secondary" icon={Phone}>
                            +7 (495) 123-45-67
                        </Button>
                        <Button
                            href="/contacts"
                            variant="ghost"
                            className="text-white border-2 border-white/30 hover:bg-white/10"
                        >
                            Записаться онлайн
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
