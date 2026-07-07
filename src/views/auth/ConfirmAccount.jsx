import { Link, useParams } from "react-router-dom"
import Alert from "../../components/Alert";
import { useState, useEffect } from "react";
import api from "../../config/axios";

export default function ConfirmAccount() {

    const [ alert, setAlert] = useState({});
    const { token } = useParams();

    useEffect(() => {

        async function confirmAccount() {
            try {
                const { data } = await api(`/confirm-account/${token}`);
                setAlert({
                    message: data.message,
                    type: "success"
                });

            } catch (error) {
                setAlert({
                    message: error.response.data.error,
                    type: "error"
                });
            }
        }
        confirmAccount();
    }, []);

    return (
        <div className="w-full md:max-w-xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center">Administrador de <span className="text-blue-500">veterinaria</span></h1>
            <p className="text-gray-500 mt-1 text-center">Confirmación de tu correo electrónico.</p>
            
           <Alert message={alert.message} type={alert.type} className="mt-5 text-center text-xl" />

            <div className="mt-12 flex flex-col items-center gap-4 md:flex-row justify-center text-center">
                <Link className="text-indigo-500 hover:text-indigo-600 transition ease-linear duration-300 font-medium" to="/login">Iniciar sesión</Link>
            </div>

        </div>
    )
}
