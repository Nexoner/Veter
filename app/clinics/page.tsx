import { MapPin, Phone, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

// Placeholder clinics data - user will provide actual data
const clinics = [
    {
        id: 1,
        name: "ВетерОК! на Примерной",
        address: "г. Москва, ул. Примерная, д. 1",
        metro: "м. Примерная",
        phone: "+7 (495) 123-45-67",
        hours: "Круглосуточно",
        coordinates: { lat: 55.7558, lng: 37.6173 },
    },
    {
        id: 2,
        name: "ВетерОК! на Образцовой",
        address: "г. Москва, ул. Образцовая, д. 10",
        metro: "м. Образцовая",
        phone: "+7 (495) 234-56-78",
        hours: "09:00 - 21:00",
        coordinates: { lat: 55.7600, lng: 37.6200 },
    },
    {
        id: 3,
        name: "ВетерОК! на Тестовой",
        address: "г. Москва, ул. Тестовая, д. 5",
        metro: "м. Тестовая",
        phone: "+7 (495) 345-67-89",
        hours: "08:00 - 22:00",
        coordinates: { lat: 55.7650, lng: 37.6100 },
    },
    {
        id: 4,
        name: "ВетерОК! на Демонстрационной",
        address: "г. Москва, ул. Демонстрационная, д. 15",
        metro: "м. Демонстрационная",
        phone: "+7 (495) 456-78-90",
        hours: "Круглосуточно",
        coordinates: { lat: 55.7700, lng: 37.6300 },
    },
];

export default function ClinicsPage() {
    return (
        <div className="section">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Ветклиники
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        4 клиники в Москве. Выберите удобное для вас расположение
                    </p>
                </div>

                {/* Clinics Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {clinics.map((clinic) => (
                        <div
                            key={clinic.id}
                            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {clinic.name}
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-700">{clinic.address}</p>
                                        <p className="text-sm text-gray-500">{clinic.metro}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                                    <a
                                        href={`tel:${clinic.phone.replace(/\D/g, "")}`}
                                        className="text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        {clinic.phone}
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                                    <span className={`${clinic.hours === "Круглосуточно" ? "text-green-600 font-medium" : "text-gray-700"}`}>
                                        {clinic.hours}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button href="/contacts" variant="primary" size="sm" className="flex-1">
                                    Записаться
                                </Button>
                                <Button
                                    href={`https://yandex.ru/maps/?pt=${clinic.coordinates.lng},${clinic.coordinates.lat}&z=16`}
                                    variant="secondary"
                                    size="sm"
                                >
                                    На карте
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-100 rounded-3xl h-96 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Интерактивная карта</p>
                        <p className="text-sm text-gray-400">Здесь будет встроена Яндекс.Карта</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
