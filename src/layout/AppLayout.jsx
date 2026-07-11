import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AppLayout() {

    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Cargando...</p>
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
