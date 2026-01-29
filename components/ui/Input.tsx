interface InputProps {
    label: string;
    name: string;
    type?: "text" | "email" | "tel" | "textarea";
    placeholder?: string;
    required?: boolean;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    className = "",
    value,
    onChange,
}: InputProps) {
    const baseStyles = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent";

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    rows={4}
                    className={`${baseStyles} resize-none`}
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className={baseStyles}
                />
            )}
        </div>
    );
}
