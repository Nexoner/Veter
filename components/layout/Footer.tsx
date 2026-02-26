"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = [
    {
        title: "Навигация",
        links: [
            { href: "/", label: "Главная" },
            { href: "/articles", label: "Статьи" },
            { href: "/clinics", label: "Ветклиники" },
            { href: "/services", label: "Услуги" },
        ],
    },
    {
        title: "Информация",
        links: [
            { href: "/volunteers", label: "Фондам и волонтерам" },
            { href: "/contacts", label: "Контакты" },
        ],
    },
];

function useClinicOpen() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        function check() {
            const now = new Date();
            const hours = now.getHours();
            setIsOpen(hours >= 9 && hours < 22);
        }
        check();
        const interval = setInterval(check, 60_000);
        return () => clearInterval(interval);
    }, []);

    return isOpen;
}

export default function Footer() {
    const isOpen = useClinicOpen();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-4">ВетерОК!</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Сеть ветеринарных клиник, где заботятся о ваших питомцах как о своих собственных.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Контакты</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="tel:+74951234567"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    <Phone size={16} />
                                    <span>+7 (495) 123-45-67</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@veterok.ru"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    <Mail size={16} />
                                    <span>info@veterok.ru</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-2 text-gray-400 text-sm">
                                    <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>г. Москва, 4 клиники</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} ВетерОК! Все права защищены.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">Ежедневно 9:00 — 22:00</span>
                        {isOpen ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Открыто
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                Закрыто
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
