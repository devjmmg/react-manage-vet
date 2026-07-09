import { useState } from "react";
import { Link } from "react-router-dom"
import Alert from "../../components/Alert";
import api from "../../config/axios";

export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        const errors = {};

        if (!email.trim()) {
            errors.email = 'El correo electrónico es requerido.';
        }

        setAlert(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await api.post('/forgot-password', {
                email
            });
            setAlert(response.data);
            setEmail('');
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
            <h1 className="text-4xl font-extrabold text-center mb-1">Administrador de <span className="text-lime-500">veterinaria</span></h1>
            <p className="text-gray-500 mb-12 text-center">Ingresa tu correo electrónico para reestablecer tu contraseña.</p>

        {alert.success && <Alert message={alert.success} type="success" className="mb-2 text-center" />}

            <form onSubmit={handleSubmit} className="mt-12 space-y-4">
                <div>
                    <label className="block" htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" className="bg-gray-100 w-full p-2 rounded-md border-lime-500 border focus:outline-lime-500" value={email} onChange={ e => setEmail(e.target.value)} />
                    {alert.email && <Alert message={alert.email} type="error" />}
                </div>
                <div className="flex justify-end items-center">
                    <input type="submit" value="Continuar" className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 transition ease-linear duration-300 p-2 text-white font-medium rounded cursor-pointer"/>
                </div>
            </form>

            <div className="mt-12 flex flex-col items-center gap-4 md:flex-row justify-between text-center">
                <Link className="text-lime-500 hover:text-lime-600 transition ease-linear duration-300 font-medium" to="/login">Iniciar sesión</Link>
                <Link className="text-lime-500 hover:text-lime-600 transition ease-linear duration-300 font-medium" to="/register">Crear cuenta nueva</Link>
            </div>
        </div>
    )
}
