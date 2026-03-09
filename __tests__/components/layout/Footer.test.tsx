import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer component", () => {
    it("renders brand name", () => {
        render(<Footer />);
        expect(screen.getByText("ВетерОК!")).toBeInTheDocument();
    });

    it("renders navigation section links", () => {
        render(<Footer />);
        const navLinks = ["Главная", "Статьи", "Ветклиники", "Услуги"];
        navLinks.forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it("renders information section links", () => {
        render(<Footer />);
        expect(screen.getByText("Фондам и волонтерам")).toBeInTheDocument();
        // "Контакты" appears as both section title (h4) and nav link
        expect(screen.getAllByText("Контакты").length).toBeGreaterThanOrEqual(2);
    });

    it("renders phone contact link", () => {
        render(<Footer />);
        expect(screen.getByText("+7 (495) 123-45-67")).toBeInTheDocument();
    });

    it("renders email contact link", () => {
        render(<Footer />);
        expect(screen.getByText("info@veterok.ru")).toBeInTheDocument();
    });

    it("renders address", () => {
        render(<Footer />);
        expect(screen.getByText("г. Москва, 4 клиники")).toBeInTheDocument();
    });

    it("renders copyright with current year", () => {
        render(<Footer />);
        const year = new Date().getFullYear();
        expect(
            screen.getByText(`© ${year} ВетерОК! Все права защищены.`)
        ).toBeInTheDocument();
    });

    it("shows 'Открыто' or 'Закрыто' status based on time", () => {
        render(<Footer />);
        const hours = new Date().getHours();
        const isOpen = hours >= 9 && hours < 22;

        if (isOpen) {
            expect(screen.getByText("Открыто")).toBeInTheDocument();
        } else {
            expect(screen.getByText("Закрыто")).toBeInTheDocument();
        }
    });

    it("renders working hours text", () => {
        render(<Footer />);
        expect(screen.getByText("Ежедневно 9:00 — 22:00")).toBeInTheDocument();
    });
});
