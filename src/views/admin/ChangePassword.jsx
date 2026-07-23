import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import useAuth from "../../hooks/useAuth";
export default function ChangePassword() {

    const { updatePassword } = useAuth();
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const [ alert, setAlert ] = useState({});

    useEffect(() => {
        if (!alert.success) return;

        const timer = setTimeout(() => {
            setAlert({});
        }, 3000); // 3 segundos

        return () => clearTimeout(timer);

    }, [alert.success]);

    const handleSubmit = async e => {
        e.preventDefault();

        const errors = {}

        if (!currentPassword.trim()) {
            errors.currentPassword = 'La contraseña actual es requerida.';
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
            const result = await updatePassword({
                currentPassword, password
            });
            setAlert({
                success: result.success
            });
            setCurrentPassword('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setAlert(error.response.data);
        }

    }
    
    return (
        <div className="max-w-2xl mx-auto h-full flex flex-col justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Cambiar contraseña
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Actualiza tu contraseña periódicamente para mantener tu cuenta protegida.
                    </p>

                    {alert.success && <Alert message={alert.success} type="success" className="my-2" />}
                </div>

                <form className="p-6 space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="current_password">
                            Contraseña actual
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id="current_password"
                            value={currentPassword}
                            onChange={ e => setCurrentPassword(e.target.value)}
                        />
                        {alert.currentPassword && <Alert message={alert.currentPassword} type="error" />}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
                            Nueva contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                        {alert.password && <Alert message={alert.password} type="error" />}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password_confirmation">
                            Confirmar nueva contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id="password_confirmation"
                            value={confirmPassword}
                            onChange={ e => setConfirmPassword(e.target.value)}
                        />
                        {alert.confirmPassword && <Alert message={alert.confirmPassword} type="error" />}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full  md:w-auto rounded-lg bg-indigo-600 p-3 text-white font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}