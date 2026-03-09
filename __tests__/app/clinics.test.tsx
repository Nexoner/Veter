import React from "react";
import { render, screen } from "@testing-library/react";
import ClinicsPage from "@/app/clinics/page";

// Mock YandexMap since it uses browser APIs
jest.mock("@/components/ui/YandexMap", () => {
    const React = require("react");
    return {
        __esModule: true,
        default: ({ clinics }: { clinics: any[] }) =>
            React.createElement("div", { "data-testid": "yandex-map" }, `Map with ${clinics.length} markers`),
    };
});

describe("ClinicsPage", () => {
    it("renders page title", () => {
        render(<ClinicsPage />);
        expect(screen.getByText("Ветклиники")).toBeInTheDocument();
    });

    it("renders page subtitle", () => {
        render(<ClinicsPage />);
        expect(
            screen.getByText("4 клиники в Москве. Выберите удобное для вас расположение")
        ).toBeInTheDocument();
    });

    it("renders all 4 clinic cards", () => {
        render(<ClinicsPage />);
        expect(screen.getByText("ВетерОК! на Шкулёвой")).toBeInTheDocument();
        expect(screen.getByText("ВетерОК! в Володарского")).toBeInTheDocument();
        expect(screen.getByText("ВетерОК! в Митино")).toBeInTheDocument();
        expect(screen.getByText("ВетерОК! в Новых Островцах")).toBeInTheDocument();
    });

    it("renders addresses for each clinic", () => {
        render(<ClinicsPage />);
        expect(screen.getByText("г. Москва, ул. Шкулёва, д. 7а.")).toBeInTheDocument();
        expect(screen.getByText(/Володарского ул. Центральная 2а/)).toBeInTheDocument();
    });

    it("renders phone numbers", () => {
        render(<ClinicsPage />);
        expect(screen.getByText("+7 (495) 123-45-67")).toBeInTheDocument();
        expect(screen.getByText("+7 (495) 234-56-78")).toBeInTheDocument();
    });

    it("renders 'Записаться' buttons for each clinic", () => {
        render(<ClinicsPage />);
        const buttons = screen.getAllByText("Записаться");
        expect(buttons).toHaveLength(4);
    });

    it("renders 'На карте' buttons for each clinic", () => {
        render(<ClinicsPage />);
        const buttons = screen.getAllByText("На карте");
        expect(buttons).toHaveLength(4);
    });

    it("renders YandexMap component", () => {
        render(<ClinicsPage />);
        expect(screen.getByTestId("yandex-map")).toBeInTheDocument();
        expect(screen.getByText("Map with 4 markers")).toBeInTheDocument();
    });
});
