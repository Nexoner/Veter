import { LucideIcon } from "lucide-react";

interface AdminCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
}

export default function AdminCard({
    title,
    value,
    icon: Icon,
    color = "blue",
}: AdminCardProps) {
    const colorStyles: Record<string, string> = {
        blue: "bg-blue-600/10 text-blue-400",
        green: "bg-emerald-600/10 text-emerald-400",
        purple: "bg-purple-600/10 text-purple-400",
        orange: "bg-orange-600/10 text-orange-400",
        pink: "bg-pink-600/10 text-pink-400",
        cyan: "bg-cyan-600/10 text-cyan-400",
        yellow: "bg-yellow-600/10 text-yellow-400",
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all">
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorStyles[color] || colorStyles.blue
                        }`}
                >
                    <Icon size={22} />
                </div>
                <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}
