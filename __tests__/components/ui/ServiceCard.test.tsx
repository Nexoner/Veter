import React from "react";
import { render, screen } from "@testing-library/react";
import ServiceCard from "@/components/ui/ServiceCard";

describe("ServiceCard component", () => {
    const baseProps = {
        title: "Хирургия",
        image: "/services/surgery.jpg",
        href: "/services/surgery",
    };

    it("renders title", () => {
        render(<ServiceCard {...baseProps} />);
        expect(screen.getByText("Хирургия")).toBeInTheDocument();
    });

    it("renders as a link with correct href", () => {
        render(<ServiceCard {...baseProps} />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/services/surgery");
    });

    it("renders image with correct alt text", () => {
        render(<ServiceCard {...baseProps} />);
        const img = screen.getByAltText("Хирургия");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/services/surgery.jpg");
    });

    it("applies accent color class", () => {
        render(<ServiceCard {...baseProps} accentColor="pink" />);
        const link = screen.getByRole("link");
        expect(link.className).toContain("bg-[var(--color-accent-pink)]");
    });

    it("uses white accent color by default", () => {
        render(<ServiceCard {...baseProps} />);
        const link = screen.getByRole("link");
        expect(link.className).toContain("bg-white");
    });

    it("merges custom className", () => {
        render(<ServiceCard {...baseProps} className="col-span-2" />);
        const link = screen.getByRole("link");
        expect(link.className).toContain("col-span-2");
    });
});
