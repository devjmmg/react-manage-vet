import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="w-full md:max-w-xl mx-auto">
            <h1 className="text-4xl font-extrabold text-center">Administrador de <span className="text-amber-500">veterinaria</span></h1>
            <p className="text-gray-500 mt-1 text-center">Ingresa tus credenciales para iniciar sesión.</p>
            <form action="" className="mt-12 space-y-4">
                <div>
                    <label className="block" htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" className="bg-gray-100 w-full p-2 rounded-md border-amber-500 border focus:outline-amber-500" />
                </div>
                <div>
                    <label className="block" htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" className="bg-gray-100 w-full p-2 rounded-md border-amber-500 border focus:outline-amber-500" />
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
