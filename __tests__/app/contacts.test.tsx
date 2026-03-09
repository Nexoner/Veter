import React from "react";
import { render, screen } from "@testing-library/react";
import ContactsPage from "@/app/contacts/page";

describe("ContactsPage", () => {
    it("renders page title", () => {
        render(<ContactsPage />);
        expect(screen.getByText("Контакты")).toBeInTheDocument();
    });

    it("renders emergency banner", () => {
        render(<ContactsPage />);
        expect(screen.getByText("Экстренная помощь")).toBeInTheDocument();
        expect(screen.getByText("+7 (495) 999-99-99")).toBeInTheDocument();
    });

    it("renders phone contact", () => {
        render(<ContactsPage />);
        expect(screen.getByText("+7 (495) 123-45-67")).toBeInTheDocument();
    });

    it("renders email contact", () => {
        render(<ContactsPage />);
        expect(screen.getByText("info@veterok.ru")).toBeInTheDocument();
    });

    it("renders working hours", () => {
        render(<ContactsPage />);
        expect(screen.getByText("Ежедневно 9:00 — 22:00")).toBeInTheDocument();
    });

    it("renders all clinic names", () => {
        render(<ContactsPage />);
        expect(screen.getByText("ВетерОК! на Шкулёвой")).toBeInTheDocument();
        expect(screen.getByText("ВетерОК! в Володарского")).toBeInTheDocument();
        expect(screen.getByText("ВетерОК! в Митино")).toBeInTheDocument();
        expect(screen.getByText("ВетерОК! в Новых Островцах")).toBeInTheDocument();
    });

    it("renders CTA section", () => {
        render(<ContactsPage />);
        expect(screen.getByText("Готовы записаться на приём?")).toBeInTheDocument();
        expect(screen.getByText("Выбрать клинику")).toBeInTheDocument();
    });
});
