import React from "react";
import { render, screen } from "@testing-library/react";
import DoctorCard from "@/components/ui/DoctorCard";

describe("DoctorCard component", () => {
    const baseProps = {
        name: "Иванов Иван Иванович",
        title: "Ветеринарный врач",
        specialty: "Хирургия",
        image: "/doctors/ivanov.jpg",
    };

    it("renders doctor name", () => {
        render(<DoctorCard {...baseProps} />);
        expect(screen.getByText("Иванов Иван Иванович")).toBeInTheDocument();
    });

    it("renders title and specialty", () => {
        render(<DoctorCard {...baseProps} />);
        expect(screen.getByText("Ветеринарный врач")).toBeInTheDocument();
        expect(screen.getByText("Хирургия")).toBeInTheDocument();
    });

    it("renders doctor image with correct alt", () => {
        render(<DoctorCard {...baseProps} />);
        const img = screen.getByAltText("Иванов Иван Иванович");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/doctors/ivanov.jpg");
    });

    it("renders 'Записаться' button linking to /contacts", () => {
        render(<DoctorCard {...baseProps} />);
        const link = screen.getByRole("link", { name: "Записаться" });
        expect(link).toHaveAttribute("href", "/contacts");
    });

    it("renders clinic when provided", () => {
        render(<DoctorCard {...baseProps} clinic="Митино" />);
        expect(screen.getByText("Митино")).toBeInTheDocument();
    });

    it("renders price when provided", () => {
        render(<DoctorCard {...baseProps} price="от 2 000 ₽" />);
        expect(screen.getByText("от 2 000 ₽")).toBeInTheDocument();
    });

    it("does not render clinic/price section when both absent", () => {
        const { container } = render(<DoctorCard {...baseProps} />);
        expect(container.querySelector(".border-t")).not.toBeInTheDocument();
    });
});
