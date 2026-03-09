import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/ui/Input";

describe("Input component", () => {
    it("renders label text", () => {
        render(<Input label="Имя" name="name" />);
        expect(screen.getByText("Имя")).toBeInTheDocument();
    });

    it("renders input element by default", () => {
        render(<Input label="Email" name="email" type="email" />);
        const input = screen.getByLabelText("Email");
        expect(input.tagName).toBe("INPUT");
        expect(input).toHaveAttribute("type", "email");
    });

    it("renders textarea when type is 'textarea'", () => {
        render(<Input label="Сообщение" name="message" type="textarea" />);
        const textarea = screen.getByLabelText("Сообщение");
        expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("shows required asterisk when required", () => {
        render(<Input label="Телефон" name="phone" required />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show asterisk when not required", () => {
        render(<Input label="Комментарий" name="comment" />);
        expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("sets placeholder text", () => {
        render(<Input label="Имя" name="name" placeholder="Введите имя" />);
        expect(screen.getByPlaceholderText("Введите имя")).toBeInTheDocument();
    });

    it("calls onChange handler", async () => {
        const handleChange = jest.fn();
        render(<Input label="Имя" name="name" onChange={handleChange} />);

        await userEvent.type(screen.getByLabelText("Имя"), "Вася");
        expect(handleChange).toHaveBeenCalled();
    });

    it("has correct id and name attributes", () => {
        render(<Input label="Email" name="email" />);
        const input = screen.getByLabelText("Email");
        expect(input).toHaveAttribute("id", "email");
        expect(input).toHaveAttribute("name", "email");
    });

    it("applies custom className to wrapper", () => {
        const { container } = render(
            <Input label="Test" name="test" className="mt-4" />
        );
        expect(container.firstChild).toHaveClass("mt-4");
    });
});
