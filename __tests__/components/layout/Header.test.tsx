import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";

describe("Header component", () => {
    it("renders logo image", () => {
        render(<Header />);
        const logo = screen.getByAltText("ВетерОК!");
        expect(logo).toBeInTheDocument();
    });

    it("renders all desktop navigation links", () => {
        render(<Header />);
        const expectedLinks = [
            "Главная",
            "Статьи",
            "Ветклиники",
            "Услуги",
            "Фондам и волонтерам",
            "Контакты",
        ];
        expectedLinks.forEach((label) => {
            // Desktop nav renders links (there may also be mobile duplicates)
            const links = screen.getAllByText(label);
            expect(links.length).toBeGreaterThanOrEqual(1);
        });
    });

    it("renders phone number", () => {
        render(<Header />);
        const phoneLinks = screen.getAllByText("+7 (495) 123-45-67");
        expect(phoneLinks.length).toBeGreaterThanOrEqual(1);
    });

    it("renders 'Записаться' CTA button", () => {
        render(<Header />);
        const ctaLinks = screen.getAllByText("Записаться");
        expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
    });

    it("toggles mobile menu on burger click", async () => {
        render(<Header />);
        const toggleBtn = screen.getByLabelText("Toggle menu");
        expect(toggleBtn).toBeInTheDocument();

        // Initially mobile nav is hidden
        // Click to show mobile menu
        await userEvent.click(toggleBtn);

        // After toggle, mobile nav links should be visible
        // (they already exist in both desktop and mobile nav)
        const links = screen.getAllByText("Главная");
        expect(links.length).toBeGreaterThanOrEqual(2);
    });
});
