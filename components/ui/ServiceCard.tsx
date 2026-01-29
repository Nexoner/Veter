import Image from "next/image";

type AccentColor = "pink" | "yellow" | "mint" | "blue" | "purple" | "white";

interface ServiceCardProps {
    title: string;
    image: string;
    href: string;
    accentColor?: AccentColor;
    className?: string;
}

const accentColorStyles: Record<AccentColor, string> = {
    pink: "bg-[var(--color-accent-pink)]",
    yellow: "bg-[var(--color-accent-yellow)]",
    mint: "bg-[var(--color-accent-mint)]",
    blue: "bg-[var(--color-accent-blue)]",
    purple: "bg-[var(--color-accent-purple)]",
    white: "bg-white",
};

export default function ServiceCard({
    title,
    image,
    href,
    accentColor = "white",
    className = "",
}: ServiceCardProps) {
    return (
        <a
            href={href}
            className={`group block rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${accentColorStyles[accentColor]} ${className}`}
        >
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-semibold text-lg">{title}</h3>
                </div>
            </div>
        </a>
    );
}
