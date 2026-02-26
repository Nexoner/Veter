import Image from "next/image";
import Button from "@/components/ui/Button";
import DoctorCard from "@/components/ui/DoctorCard";
import { Phone, Clock, Shield, Heart, Stethoscope, ArrowRight } from "lucide-react";

// Team doctors data
const doctors = [
  {
    id: 1,
    name: "Грунтов Алексей Петрович",
    title: "Врач-терапевт, хирург, дерматолог",
    specialty: "Хирургия, дерматология, экзотические животные",
    image: "/gryntov.webp",
  },
  {
    id: 2,
    name: "Шулепова Ирина Владимировна",
    title: "Врач визуальной диагностики, хирург, терапевт, кардиолог, онколог",
    specialty: "УЗИ, рентген, кардиология, онкология",
    image: "/shulepova.webp",
  },
  {
    id: 3,
    name: "Сургай Николь Владимировна",
    title: "Врач-терапевт, специалист УЗИ-диагностики",
    specialty: "Терапия, УЗИ-диагностика",
    image: "/syrgay.webp",
  },
  {
    id: 4,
    name: "Лавров Владимир Владимирович",
    title: "Хирург, терапевт, ортопед",
    specialty: "Хирургия, терапия, ортопедия",
    image: "/lavrov.webp",
  },
  {
    id: 5,
    name: "Жабелова Милана Исмаиловна",
    title: "Врач общей практики, анестезиолог-реаниматолог",
    specialty: "Анестезия, реанимация, интенсивная терапия",
    image: "/zabelova.webp",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Ежедневно 9 — 22",
    description: "Работаем каждый день без выходных и праздников",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Современное оборудование и проверенные методики лечения",
  },
  {
    icon: Heart,
    title: "Забота и любовь",
    description: "Относимся к каждому питомцу как к своему собственному",
  },
  {
    icon: Stethoscope,
    title: "Опытные врачи",
    description: "Команда профессионалов с многолетним опытом работы",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="container-custom py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Сеть ветеринарных клиник{" "}
                <span className="text-[var(--color-primary)]">ВетерОК!</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Профессиональная ветеринарная помощь вашим питомцам.
                4 клиники в Москве, современное оборудование и команда
                опытных специалистов.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contacts" variant="primary" size="lg" icon={Phone}>
                  Записаться на приём
                </Button>
                <Button href="/services" variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                  Наши услуги
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">4</div>
                  <div className="text-sm text-gray-600">Клиники</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">15+</div>
                  <div className="text-sm text-gray-600">Лет опыта</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--color-primary)]">50 000+</div>
                  <div className="text-sm text-gray-600">Довольных клиентов</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-square max-w-lg mx-auto rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full opacity-10 scale-110"></div>
                <Image
                  src="/dog.jpg"
                  alt="Счастливый питомец"
                  fill
                  className="object-cover relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы создали комфортные условия для ваших питомцев и их владельцев
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-50 rounded-3xl hover:bg-[var(--color-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-primary-light)] rounded-2xl mb-4 group-hover:bg-white/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Наши врачи
              </h2>
              <p className="text-gray-600 max-w-xl">
                Команда опытных специалистов, которые заботятся о здоровье ваших питомцев
              </p>
            </div>
            <Button href="/clinics" variant="secondary" icon={ArrowRight} iconPosition="right">
              Все врачи
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                title={doctor.title}
                specialty={doctor.specialty}
                image={doctor.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--color-primary)]">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Нужна консультация?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Запишитесь на приём онлайн или позвоните нам. Работаем ежедневно с 9:00 до 22:00!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="tel:+74951234567"
              variant="secondary"
              size="lg"
              icon={Phone}
            >
              +7 (495) 123-45-67
            </Button>
            <Button
              href="/contacts"
              variant="outline-white"
              size="lg"
            >
              Записаться онлайн
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
