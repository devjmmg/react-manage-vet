import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function GuestLayout() {

    const { auth, loading } = useAuth();
    
    if (loading) {
        return <p>Cargando...</p>
    }

    if (auth._id) {
        return <Navigate to="/" />;
    }

    const path = useLocation().pathname;
    let bg = "bg-amber-200";

    if (path === "/register") {
        bg = "bg-indigo-200";
    } else if (path === "/forgot-password") {
        bg = "bg-lime-200";
    } else if (path.startsWith("/confirm-account")) {
        bg = "bg-blue-200";
    } else if (path.startsWith("/reset-password")) {
        bg = "bg-pink-200";
    }

    return (
        <>
            <main className="md:min-h-screen md:flex w-full">
                <div className={`wfull md:w-1/2 flex justify-center items-center ${bg} bg-`}>
                    <img src="../../public/img/logo.svg" className="w-full md:w-3xl" alt="" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                    <Outlet />
                </div>
            </main>
            
        </>
    )
}
