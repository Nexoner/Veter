"use client";

import { useState, useEffect } from "react";
import { Heart, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { VolunteersData } from "@/lib/types";

export default function VolunteersPage() {
    const [pageData, setPageData] = useState<VolunteersData | null>(null);
    const [formData, setFormData] = useState({
        organizationName: "",
        contactPerson: "",
        phone: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        fetch("/api/admin/volunteers")
            .then((res) => res.json())
            .then((data) => setPageData(data));
    }, []);

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
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
    };

    // Use defaults while loading
    const data = pageData || {
        badge: "Вместе помогаем животным",
        title: "Фондам и волонтерам",
        intro: "Сеть клиник «ВетерОК!» активно сотрудничает с благотворительными организациями и волонтерами, помогающими бездомным животным.",
        offersTitle: "Мы предлагаем:",
        offers: [],
        howToTitle: "Как начать сотрудничество?",
        howToText: "Заполните форму справа, и мы свяжемся с вами в течение 24 часов для обсуждения условий сотрудничества.",
        formTitle: "Заявка на сотрудничество",
        successTitle: "Заявка отправлена!",
        successText: "Мы свяжемся с вами в ближайшее время",
    };

    return (
        <div className="section">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-6">
                            <Heart size={16} />
                            {data.badge}
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            {data.title}
                        </h1>

                        <div className="prose prose-lg text-gray-600">
                            <p>{data.intro}</p>

                            <h3 className="text-gray-900 font-semibold">{data.offersTitle}</h3>
                            <ul>
                                {data.offers.map((offer, index) => (
                                    <li key={index}>{offer}</li>
                                ))}
                            </ul>

                            <h3 className="text-gray-900 font-semibold">{data.howToTitle}</h3>
                            <p>{data.howToText}</p>
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
                                    {data.successTitle}
                                </h3>
                                <p className="text-gray-600">
                                    {data.successText}
                                </p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {data.formTitle}
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
