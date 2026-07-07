import { Link } from "react-router-dom"

export default function ForgetPassword() {
    return (
        <div className="w-full md:max-w-xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center">Administrador de <span className="text-lime-500">veterinaria</span></h1>
            <p className="text-gray-500 mt-1 text-center">Ingresa tu correo electrónico para reestablecer tu contraseña.</p>
            <form action="" className="mt-12 space-y-4">
                <div>
                    <label className="block" htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" className="bg-gray-100 w-full p-2 rounded-md border-lime-500 border focus:outline-lime-500" />
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
