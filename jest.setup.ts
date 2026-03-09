import "@testing-library/jest-dom";

// Mock next/link
jest.mock("next/link", () => {
    const React = require("react");
    return {
        __esModule: true,
        default: ({
            children,
            href,
            ...props
        }: {
            children: React.ReactNode;
            href: string;
            [key: string]: any;
        }) => React.createElement("a", { href, ...props }, children),
    };
});

// Mock next/image
jest.mock("next/image", () => {
    const React = require("react");
    return {
        __esModule: true,
        default: (props: any) =>
            React.createElement("img", {
                src: props.src,
                alt: props.alt,
                width: props.width,
                height: props.height,
                ...props,
            }),
    };
});

// Mock next/font/google
jest.mock("next/font/google", () => ({
    Inter: () => ({
        variable: "--font-inter",
        className: "mock-inter",
    }),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => {
    const React = require("react");
    const createIcon = (name: string) => {
        const Icon = (props: any) =>
            React.createElement("svg", {
                "data-testid": `icon-${name}`,
                ...props,
            });
        Icon.displayName = name;
        return Icon;
    };

    return {
        __esModule: true,
        MapPin: createIcon("MapPin"),
        Phone: createIcon("Phone"),
        Clock: createIcon("Clock"),
        Mail: createIcon("Mail"),
        Menu: createIcon("Menu"),
        X: createIcon("X"),
        AlertCircle: createIcon("AlertCircle"),
        Info: createIcon("Info"),
        ArrowRight: createIcon("ArrowRight"),
    };
});
