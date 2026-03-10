// ===== Data entity types for the admin panel =====

export interface Doctor {
    id: number;
    name: string;
    title: string;
    specialty: string;
    image: string;
}

export interface ServiceItem {
    name: string;
    price: string;
}

export interface ServiceCategory {
    id: number;
    name: string;
    services: ServiceItem[];
}

export interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
}

export interface Clinic {
    id: number;
    name: string;
    address: string;
    metro: string;
    phone: string;
    hours: string;
    coordinates: { lat: number; lng: number };
}

export interface ContactInfo {
    phone: string;
    emergencyPhone: string;
    email: string;
    address: string;
    hours: string;
}

export interface HeroStat {
    value: string;
    label: string;
}

export interface Benefit {
    icon: string;
    title: string;
    description: string;
}

export interface HomepageData {
    hero: {
        title: string;
        titleAccent: string;
        description: string;
        stats: HeroStat[];
    };
    benefits: Benefit[];
    doctorsSection: {
        title: string;
        description: string;
    };
    cta: {
        title: string;
        description: string;
    };
}

export interface VolunteersData {
    badge: string;
    title: string;
    intro: string;
    offersTitle: string;
    offers: string[];
    howToTitle: string;
    howToText: string;
    formTitle: string;
    successTitle: string;
    successText: string;
}

// Valid entity names for the admin API
export type EntityName =
    | "doctors"
    | "services"
    | "articles"
    | "clinics"
    | "contacts"
    | "homepage"
    | "volunteers";
