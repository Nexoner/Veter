"use client";

import { useState } from "react";
import { Heart, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function VolunteersPage() {
    const [formData, setFormData] = useState({
        organizationName: "",
        contactPerson: "",
        phone: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send data to an API
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
    };

    return (
        <div className="section">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-6">
                            <Heart size={16} />
                            Вместе помогаем животным
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Фондам и волонтерам
                        </h1>

                        <div className="prose prose-lg text-gray-600">
                            <p>
                                Сеть клиник «ВетерОК!» активно сотрудничает с благотворительными организациями
                                и волонтерами, помогающими бездомным животным.
                            </p>

                            <h3 className="text-gray-900 font-semibold">Мы предлагаем:</h3>
                            <ul>
                                <li>Льготные условия на лечение подопечных фондов</li>
                                <li>Бесплатные консультации для волонтеров</li>
                                <li>Скидки на стерилизацию бездомных животных</li>
                                <li>Помощь в пристройстве животных</li>
                            </ul>

                            <h3 className="text-gray-900 font-semibold">Как начать сотрудничество?</h3>
                            <p>
                                Заполните форму справа, и мы свяжемся с вами в течение 24 часов для
                                обсуждения условий сотрудничества.
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Заявка отправлена!
                                </h3>
                                <p className="text-gray-600">
                                    Мы свяжемся с вами в ближайшее время
                                </p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Заявка на сотрудничество
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <Input
                                        label="Название организации"
                                        name="organizationName"
                                        placeholder="Благотворительный фонд «Добрые руки»"
                                        required
                                        value={formData.organizationName}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="Контактное лицо"
                                        name="contactPerson"
                                        placeholder="Иван Иванов"
                                        required
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                    />

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Телефон"
                                            name="phone"
                                            type="tel"
                                            placeholder="+7 (999) 123-45-67"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <Input
                                        label="Сообщение"
                                        name="message"
                                        type="textarea"
                                        placeholder="Расскажите о вашей организации и как мы можем помочь..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        icon={Send}
                                        className="w-full"
                                    >
                                        Отправить заявку
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
