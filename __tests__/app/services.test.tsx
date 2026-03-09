import React from "react";
import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";

describe("ServicesPage", () => {
    it("renders page title", () => {
        render(<ServicesPage />);
        expect(screen.getByText("Услуги и цены")).toBeInTheDocument();
    });

    it("renders disclaimer", () => {
        render(<ServicesPage />);
        expect(
            screen.getByText(/Указанные цены являются ориентировочными/)
        ).toBeInTheDocument();
    });

    it("renders all service categories", () => {
        render(<ServicesPage />);
        const categories = [
            "Терапия",
            "Вакцинация",
            "Хирургия",
            "Диагностика",
            "Стоматология",
            "Груминг",
        ];
        categories.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });

    it("renders services within therapy category", () => {
        render(<ServicesPage />);
        expect(screen.getByText("Первичный приём терапевта")).toBeInTheDocument();
        // Price "от 1 500 ₽" appears in multiple categories
        expect(screen.getAllByText("от 1 500 ₽").length).toBeGreaterThanOrEqual(1);
    });

    it("renders services within vaccination category", () => {
        render(<ServicesPage />);
        expect(screen.getByText("Комплексная вакцинация собаки")).toBeInTheDocument();
        expect(screen.getByText("Чипирование")).toBeInTheDocument();
    });

    it("renders services within surgery category", () => {
        render(<ServicesPage />);
        expect(screen.getByText("Кастрация кота")).toBeInTheDocument();
        expect(screen.getByText("Стерилизация кошки")).toBeInTheDocument();
    });

    it("renders CTA section", () => {
        render(<ServicesPage />);
        expect(screen.getByText("Остались вопросы по ценам?")).toBeInTheDocument();
        expect(screen.getByText("Записаться онлайн")).toBeInTheDocument();
    });

    it("renders phone in CTA", () => {
        render(<ServicesPage />);
        expect(screen.getByText("+7 (495) 123-45-67")).toBeInTheDocument();
    });
});
