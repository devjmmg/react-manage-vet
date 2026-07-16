import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";

export default function AppLayout() {

    const { auth, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            </div>
        );
    }

    if (!auth._id) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-1 md:overflow-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
