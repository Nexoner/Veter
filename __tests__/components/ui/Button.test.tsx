import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";

describe("Button component", () => {
    it("renders children text", () => {
        render(<Button>Записаться</Button>);
        expect(screen.getByText("Записаться")).toBeInTheDocument();
    });

    it("renders as <button> by default", () => {
        render(<Button>Click</Button>);
        const btn = screen.getByRole("button", { name: "Click" });
        expect(btn.tagName).toBe("BUTTON");
    });

    it("renders as <a> (Link) when href is provided", () => {
        render(<Button href="/contacts">Go</Button>);
        const link = screen.getByRole("link", { name: "Go" });
        expect(link).toHaveAttribute("href", "/contacts");
    });

    it("applies primary variant by default", () => {
        render(<Button>Primary</Button>);
        const btn = screen.getByRole("button", { name: "Primary" });
        expect(btn.className).toContain("bg-[var(--color-primary)]");
    });

    it("applies secondary variant styles", () => {
        render(<Button variant="secondary">Secondary</Button>);
        const btn = screen.getByRole("button", { name: "Secondary" });
        expect(btn.className).toContain("bg-white");
    });

    it("applies outline variant styles", () => {
        render(<Button variant="outline">Outline</Button>);
        const btn = screen.getByRole("button", { name: "Outline" });
        expect(btn.className).toContain("border-2");
    });

    it("applies correct size classes", () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole("button").className).toContain("px-4 py-2 text-sm");

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole("button").className).toContain("px-8 py-4 text-lg");
    });

    it("is disabled when disabled prop is true", () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("calls onClick handler", async () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
        const handleClick = jest.fn();
        render(
            <Button onClick={handleClick} disabled>
                No click
            </Button>
        );

        await userEvent.click(screen.getByRole("button"));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders icon on the left by default", () => {
        const MockIcon = React.forwardRef<SVGSVGElement, any>((props, ref) => (
            <svg data-testid="mock-icon" ref={ref} {...props} />
        ));
        MockIcon.displayName = "MockIcon";
        render(<Button icon={MockIcon}>With Icon</Button>);

        const btn = screen.getByRole("button");
        expect(btn.querySelector("[data-testid='mock-icon']")).toBeInTheDocument();
    });

    it("sets button type attribute", () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("merges custom className", () => {
        render(<Button className="w-full">Full</Button>);
        expect(screen.getByRole("button").className).toContain("w-full");
    });
});
