import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header() {

    const { auth, logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-indigo-500 p-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">

                <Link to='/'>
                    <img src="/public/img/logo.svg" alt="Logo" className="w-10 h-10" />
                </Link>
                <nav className="flex flex-col md:flex-row items-center gap-3 text-white">
                    <Link to="/">Dashboard</Link>
                    <Link to="/pets">Mascotas</Link>
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-1 cursor-pointer"
                        >
                            {auth.name}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </button>
                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setOpen(!open)}>
                                    Perfil
                                </Link>
                                <Link to="/change-password" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setOpen(!open)}>
                                    Cambiar contraseña
                                </Link>
                                <button onClick={logout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                    Salir
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}