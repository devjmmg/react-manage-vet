import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../../components/Alert";
import api from "../../config/axios";

export default function register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [alert, setAlert] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};

        if (!name.trim()) {
            errors.name = 'El nombre es requerido.';
        }

        if (!email.trim()) {
            errors.email = 'El correo electrónico es requerido.';
        }

        if (!password.trim()) {
            errors.password = 'La contraseña es requerida.';
        } else {
            if (password.length < 6) {
                errors.password = 'La contraseña debe tener minimo 6 caracteres.';
            }
        }

        if (password.trim() !== confirmPassword.trim()) {
            errors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        setAlert(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await api.post('/register', {
                name,
                email,
                password
            });
            setAlert(response.data);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
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
            <h1 className="text-4xl font-extrabold text-center mb-1">Administrador de <span className="text-indigo-500">veterinaria</span></h1>
            <p className="text-gray-500 mb-12 text-center">Ingresa tus datos para crear una cuenta nueva.</p>

            {alert.success && <Alert message={alert.success} type="success" className="mb-2 text-center" />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block" htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={name} onChange={ e => setName(e.target.value)} />
                    {alert.name && <Alert message={alert.name} type="error" />}
                </div>
                <div>
                    <label className="block" htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={email} onChange={ e => setEmail(e.target.value)} />
                    {alert.email && <Alert message={alert.email} type="error" />}
                </div>
                <div>
                    <label className="block" htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={password} onChange={ e => setPassword(e.target.value)} />
                    {alert.password && <Alert message={alert.password} type="error" />}
                </div>
                <div>
                    <label className="block" htmlFor="confirm_password">Confirmar contraseña</label>
                    <input type="password" id="confirm_password" name="confirm_password" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)} />
                    {alert.confirmPassword && <Alert message={alert.confirmPassword} type="error" />}
                </div>
                <div className="flex justify-end items-center">
                    <input type="submit" value="Crear cuenta nueva" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 transition ease-linear duration-300 p-2 text-white font-medium rounded cursor-pointer"/>
                </div>
            </form>

            <div className="mt-12 flex flex-col items-center gap-4 md:flex-row justify-between text-center">
                <Link className="text-indigo-500 hover:text-indigo-600 transition ease-linear duration-300 font-medium" to="/login">Iniciar sesión</Link>
                <Link className="text-indigo-500 hover:text-indigo-600 transition ease-linear duration-300 font-medium" to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
    )
}
