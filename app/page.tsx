import Image from "next/image";
import Button from "@/components/ui/Button";
import DoctorCard from "@/components/ui/DoctorCard";
import { Phone, Clock, Shield, Heart, Stethoscope, ArrowRight } from "lucide-react";
import { getDoctors, getHomepageData } from "@/lib/data-store";
import type { Benefit } from "@/lib/types";
import { LucideIcon } from "lucide-react";

// Map icon names from JSON to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Clock,
  Shield,
  Heart,
  Stethoscope,
};

export default async function HomePage() {
  const [doctors, homepage] = await Promise.all([
    getDoctors(),
    getHomepageData(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="container-custom py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {homepage.hero.title}{" "}
                <span className="text-[var(--color-primary)]">{homepage.hero.titleAccent}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                {homepage.hero.description}
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
                {homepage.hero.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-[var(--color-primary)]">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
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
            {homepage.benefits.map((benefit: Benefit, index: number) => {
              const IconComponent = iconMap[benefit.icon] || Heart;
              return (
                <div
                  key={index}
                  className="group p-6 bg-gray-50 rounded-3xl hover:bg-[var(--color-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-primary-light)] rounded-2xl mb-4 group-hover:bg-white/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {homepage.doctorsSection.title}
              </h2>
              <p className="text-gray-600 max-w-xl">
                {homepage.doctorsSection.description}
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
            {homepage.cta.title}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            {homepage.cta.description}
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
