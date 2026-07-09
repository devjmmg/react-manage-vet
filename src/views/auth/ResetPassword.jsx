import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Link, useParams } from "react-router-dom";
import Alert from "../../components/Alert";

export default function ResetPassword() {
    
    const [ alert, setAlert ] = useState({});
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ validToken, setValidToken ] = useState(false);

    const { token } = useParams();

    useEffect(() => {

        async function resetPassword() {
            try {
                await api(`/reset-password/${token}`);
                setValidToken(true);
            } catch (error) {
                setValidToken(false);
                setAlert({
                    message: error.response.data.error,
                    type: "error"
                });
            }
        }
        resetPassword();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};

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
            const response = await api.post(`/reset-password/${token}`, {
                password,
                confirmPassword
            });
            setAlert(response.data)
            setValidToken(false);
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
            <h1 className="text-4xl font-extrabold text-center">Administrador de <span className="text-blue-500">veterinaria</span></h1>
            <p className="text-gray-500 mt-1 text-center">Restablecer tu contraseña.</p>
            
            { !validToken && alert.message && 
                <Alert
                    message={alert.message}
                    type={alert.type}
                    className="mt-5 text-center text-xl"
                />
            }

            { validToken && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block" htmlFor="password">Nueva contraseña</label>
                        <input type="password" id="password" name="password" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={password} onChange={ e => setPassword(e.target.value)} />
                        {alert.password && <Alert message={alert.password} type="error" />}
                    </div>
                    <div>
                        <label className="block" htmlFor="confirm_password">Confirmar nueva contraseña</label>
                        <input type="password" id="confirm_password" name="confirm_password" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)} />
                        {alert.confirmPassword && <Alert message={alert.confirmPassword} type="error" />}
                    </div>
                    <div className="flex justify-end items-center">
                        <input type="submit" value="Guardar" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 transition ease-linear duration-300 p-2 text-white font-medium rounded cursor-pointer"/>
                    </div>
                </form>
            )}

            {!validToken && 
                 <div className="mt-12 flex flex-col items-center gap-4 md:flex-row justify-center text-center">
                    <Link className="text-indigo-500 hover:text-indigo-600 transition ease-linear duration-300 font-medium" to="/login">Iniciar sesión</Link>
                </div>
            }

        </div>
    )
}
