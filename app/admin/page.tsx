import { getDoctors, getServices, getArticles, getClinics } from "@/lib/data-store";
import AdminDashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
    const [doctors, services, articles, clinics] = await Promise.all([
        getDoctors(),
        getServices(),
        getArticles(),
        getClinics(),
    ]);

    return (
        <AdminDashboardClient
            doctorsCount={doctors.length}
            servicesCount={services.reduce((sum, cat) => sum + cat.services.length, 0)}
            articlesCount={articles.length}
            clinicsCount={clinics.length}
        />
    );
}
