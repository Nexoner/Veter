import Image from "next/image";
import { MapPin } from "lucide-react";
import Button from "./Button";

interface DoctorCardProps {
    name: string;
    title: string;
    specialty: string;
    image: string;
    clinic?: string;
    price?: string;
}

export default function DoctorCard({
    name,
    title,
    specialty,
    image,
    clinic,
    price,
}: DoctorCardProps) {
    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Photo Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Info Block */}
            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
                <p className="text-sm text-gray-600 mb-1">{title}</p>
                <p className="text-sm text-[var(--color-primary)] font-medium mb-3">{specialty}</p>

                {(clinic || price) && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {clinic && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={14} />
                                <span>{clinic}</span>
                            </div>
                        )}
                        {price && (
                            <span className="text-sm font-semibold text-gray-900">{price}</span>
                        )}
                    </div>
                )}

                <Button
                    href="/contacts"
                    variant="primary"
                    size="sm"
                    className="w-full mt-4"
                >
                    Записаться
                </Button>
            </div>
        </div>
    );
}
