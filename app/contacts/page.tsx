import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { clinics } from "@/data/clinics";

const contactInfo = {
    phone: "+7 (495) 123-45-67",
    emergencyPhone: "+7 (495) 999-99-99",
    email: "info@veterok.ru",
    address: "г. Москва, 4 клиники",
    hours: "Ежедневно 9:00 — 22:00",
};

export default function ContactsPage() {
    return (
        <div className="section">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Контакты
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Свяжитесь с нами любым удобным способом или приезжайте в одну из наших клиник
                    </p>
                </div>

                {/* Emergency Banner */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle size={24} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-red-900 mb-1">Экстренная помощь</h2>
                        <p className="text-sm text-red-700">
                            Если вашему питомцу нужна срочная помощь, звоните на экстренную линию
                        </p>
                    </div>
                    <a
                        href={`tel:${contactInfo.emergencyPhone.replace(/\D/g, "")}`}
                        className="btn-pill bg-red-600 text-white hover:bg-red-700 text-lg px-6 py-3"
                    >
                        <Phone size={20} className="mr-2" />
                        {contactInfo.emergencyPhone}
                    </a>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Cards */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Phone */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center">
                                    <Phone size={24} className="text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Телефон</p>
                                    <a
                                        href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                                        className="text-lg font-semibold text-gray-900 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        {contactInfo.phone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center">
                                    <Mail size={24} className="text-[var(--color-primary)]" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email</p>
                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="text-lg font-semibold text-gray-900 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <Clock size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Режим работы</p>
                                    <p className="text-lg font-semibold text-green-600">
                                        {contactInfo.hours}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Clinics List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Наши клиники</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {clinics.map((clinic) => (
                                <div
                                    key={clinic.id}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-semibold text-gray-900 mb-2">{clinic.name}</h3>
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <MapPin size={16} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p>{clinic.address}</p>
                                            <p className="text-gray-400">{clinic.metro}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-6 bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">Интерактивная карта</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 bg-[var(--color-primary)] rounded-3xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Готовы записаться на приём?
                    </h2>
                    <p className="text-white/80 mb-6">
                        Выберите удобное время и клинику
                    </p>
                    <Button href="/clinics" variant="secondary" size="lg">
                        Выбрать клинику
                    </Button>
                </div>
            </div>
        </div>
    );
}
