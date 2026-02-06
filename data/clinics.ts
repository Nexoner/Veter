export interface Clinic {
    id: number;
    name: string;
    address: string;
    metro: string;
    phone: string;
    hours: string;
    coordinates: { lat: number; lng: number };
}

export const clinics: Clinic[] = [
    {
        id: 1,
        name: "ВетерОК! на Шкулёвой",
        address: "г. Москва, ул. Шкулёва, д. 7а.",
        metro: "м. Текстильщики",
        phone: "+7 (495) 123-45-67",
        hours: "9:00 - 22:00",
        coordinates: { lat: 55.7558, lng: 37.6173 },
    },
    {
        id: 2,
        name: "ВетерОК! в Володарского",
        address: "г. Москва, Ленинский р-он, пос. Володарского ул. Центральная 2а",
        metro: "-",
        phone: "+7 (495) 234-56-78",
        hours: "09:00 - 20:00",
        coordinates: { lat: 55.7600, lng: 37.6200 },
    },
    {
        id: 3,
        name: "ВетерОК! в Митино",
        address: "г. Москва, Митино, ул. Генерала Белобородова, д.11",
        metro: "м.Митино",
        phone: "+7 (495) 345-67-89",
        hours: "08:00 - 22:00",
        coordinates: { lat: 55.7650, lng: 37.6100 },
    },
    {
        id: 4,
        name: "ВетерОК! в Новых Островцах",
        address: "г. Москва, Новые Островцы, ул. Баулинская, д. 13",
        metro: "-",
        phone: "+7 (495) 456-78-90",
        hours: "10:00 - 20:00",
        coordinates: { lat: 55.7700, lng: 37.6300 },
    },
];
