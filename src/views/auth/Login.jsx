import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Alert from "../../components/Alert";
import api from "../../config/axios"
import useAuth from "../../hooks/useAuth";

export default function Login() {

    const { authUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};

        if (!email.trim()) {
            errors.email = 'El correo electrónico es requerido.';
        }

        if (!password.trim()) {
            errors.password = 'La contraseña es requerida.';
        }

        setAlert(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const { data: {token} } = await api.post('/login', {
                email,
                password
            });
            localStorage.setItem('AUTH_TOKEN', token);
            await authUser();
            navigate('/');
        } catch (error) {
            if (error.response) {
                setAlert(error.response.data);
            } else {
                setAlert({ message: "No fue posible conectar con el servidor.", type: 'error' });
            }
        }
    }

    return (
        <div className="w-full md:max-w-xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center mb-1">Administrador de <span className="text-amber-500">veterinaria</span></h1>
            <p className="text-gray-500 mb-12 text-center">Ingresa tus credenciales para iniciar sesión.</p>

            {alert.error && <Alert message={alert.error} type="error" className="mb-2 text-center" />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block" htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" className="bg-gray-100 w-full p-2 rounded-md border-amber-500 border focus:outline-amber-500" value={email} onChange={ e => setEmail(e.target.value)} />
                    {alert.email && <Alert message={alert.email} type="error" />}
                </div>
                <div>
                    <label className="block" htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" className="bg-gray-100 w-full p-2 rounded-md border-amber-500 border focus:outline-amber-500" value={password} onChange={ e => setPassword(e.target.value)} />
                    {alert.password && <Alert message={alert.password} type="error" />}
                </div>
                <div className="flex justify-end items-center">
                    <input type="submit" value="Iniciar sesión" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 transition ease-linear duration-300 p-2 text-white font-medium rounded cursor-pointer"/>
                </div>
            </form>

            <div className="mt-12 flex flex-col items-center gap-4 md:flex-row justify-between text-center">
                <Link className="text-amber-500 hover:text-amber-600 transition ease-linear duration-300 font-medium" to="/register">Crear cuenta nueva</Link>
                <Link className="text-amber-500 hover:text-amber-600 transition ease-linear duration-300 font-medium" to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
    )
}
