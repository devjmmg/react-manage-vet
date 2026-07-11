import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
        <>
            AppLayout
            <Outlet />
        </>
    )
}
