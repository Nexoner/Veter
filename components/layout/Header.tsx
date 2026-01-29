"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/articles", label: "Статьи" },
    { href: "/clinics", label: "Ветклиники" },
    { href: "/services", label: "Услуги" },
    { href: "/volunteers", label: "Фондам и волонтерам" },
    { href: "/contacts", label: "Контакты" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="ВетерОК!"
                            width={180}
                            height={50}
                            className="h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition-colors text-sm"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Phone & CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="tel:+74951234567"
                            className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-primary)] font-medium"
                        >
                            <Phone size={18} />
                            <span>+7 (495) 123-45-67</span>
                        </a>
                        <Link href="/contacts" className="btn-pill btn-primary text-sm">
                            Записаться
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-100">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] font-medium rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-4 px-4">
                                <a
                                    href="tel:+74951234567"
                                    className="flex items-center gap-2 text-gray-700 font-medium mb-3"
                                >
                                    <Phone size={18} />
                                    <span>+7 (495) 123-45-67</span>
                                </a>
                                <Link
                                    href="/contacts"
                                    className="btn-pill btn-primary text-sm w-full"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Записаться
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
