export default function Dashboard() {
    return (
        <div className="space-y-4 p-4 h-full overflow-y-scroll">

            {/* Encabezado */}
            <section>
                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Bienvenido nuevamente. Aquí tienes un resumen de tu veterinaria.
                </p>
            </section>

            {/* Estadísticas */}
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-4xl">🐶</span>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                            Total
                        </span>
                    </div>

                    <h3 className="mt-5 text-sm text-gray-500">
                        Mascotas
                    </h3>

                    <p className="mt-1 text-4xl font-bold text-gray-800">
                        248
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-4xl">👤</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Activos
                        </span>
                    </div>

                    <h3 className="mt-5 text-sm text-gray-500">
                        Propietarios
                    </h3>

                    <p className="mt-1 text-4xl font-bold text-gray-800">
                        95
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-4xl">📅</span>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            Hoy
                        </span>
                    </div>

                    <h3 className="mt-5 text-sm text-gray-500">
                        Citas
                    </h3>

                    <p className="mt-1 text-4xl font-bold text-gray-800">
                        12
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-4xl">💉</span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Pendientes
                        </span>
                    </div>

                    <h3 className="mt-5 text-sm text-gray-500">
                        Vacunas
                    </h3>

                    <p className="mt-1 text-4xl font-bold text-gray-800">
                        18
                    </p>
                </div>

            </section>

            {/* Contenido */}
            <section className="grid gap-6 xl:grid-cols-3">

                {/* Tabla */}
                <div className="xl:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 p-6">
                        <h2 className="font-semibold text-gray-800 text-lg">
                            Mascotas recientes
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Últimos registros realizados.
                        </p>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr className="text-left">

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Nombre
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Propietario
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Especie
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                        Fecha
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {[1,2,3,4,5].map(item => (

                                    <tr
                                        key={item}
                                        className="border-t border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            Rocky
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            Juan Pérez
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            Perro
                                        </td>

                                        <td className="px-6 py-4 text-gray-500">
                                            Hace 2 horas
                                        </td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* Lateral */}
                <div className="space-y-6">

                    {/* Acciones rápidas */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="font-semibold text-gray-800">
                            Acciones rápidas
                        </h2>

                        <div className="mt-5 space-y-3">

                            <button className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 cursor-pointer">
                                Registrar mascota
                            </button>

                            <button className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Ver mascotas
                            </button>

                            <button className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Mi perfil
                            </button>

                        </div>

                    </div>

                    {/* Actividad */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                        <h2 className="font-semibold text-gray-800">
                            Actividad reciente
                        </h2>

                        <div className="mt-5 space-y-5">

                            <div>
                                <p className="font-medium">
                                    Rocky fue registrado
                                </p>

                                <p className="text-sm text-gray-500">
                                    Hace 15 minutos
                                </p>
                            </div>

                            <div>
                                <p className="font-medium">
                                    Luna actualizó su expediente
                                </p>

                                <p className="text-sm text-gray-500">
                                    Hace 1 hora
                                </p>
                            </div>

                            <div>
                                <p className="font-medium">
                                    Max recibió una vacuna
                                </p>

                                <p className="text-sm text-gray-500">
                                    Hace 3 horas
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}