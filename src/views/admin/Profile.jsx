import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Alert from '../../components/Alert';

export default function Profile() {

    const { auth, update } = useAuth()
    const [ alert, setAlert ] = useState({});
    const [ profile, setProfile ] = useState({});
    
    useEffect( () => {
        setProfile(auth);
    }, [auth]);

    useEffect(() => {
        if (!alert.success) return;

        const timer = setTimeout(() => {
            setAlert({});
        }, 3000); // 3 segundos

        return () => clearTimeout(timer);

    }, [alert.success]);

    const handleSubmit = async e => {
        e.preventDefault();

        const errors = {};
        const { name, email, phone } = profile; 
        
        if (!name.trim()) {
            errors.name = 'El nombre es requerdio.'
        }

        if (!email.trim()) {
            errors.email = 'El correo electrónico es requerdio.'
        }
        if (phone) {
            const phoneClean = phone.replace(/\s/g, '');
            if (!/^\d+$/.test(phoneClean)) {
                errors.phone = 'El número de teléfono solo debe contener números';
            } else if (phoneClean.length !== 10) {
                errors.phone = 'El número de teléfono debe tener 10 dígitos';
            }
        }

        setAlert(errors);
        if ( Object.keys(errors).length > 0) {
            return;
        }

        try {
            const result = await update(profile);
            setAlert({ success: result.success });
        } catch (error) {
            setAlert(error.response.data);
        }

    }

    return (
        <div className="max-w-2xl mx-auto h-full flex flex-col justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Perfil
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Actualiza la información de tu cuenta.
                    </p>

                    {alert.success && <Alert message={alert.success} type="success" className="my-2" />}

                </div>

                <form className="p-6 space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='name'>
                            Nombre
                        </label>

                        <input
                            type="text"
                            placeholder="Juan Pérez"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id='name'
                            value={profile.name || ''}
                            onChange={ e => setProfile({
                                ...profile,
                                [e.target.id]: e.target.value
                            })}
                        />
                        {alert.name && <Alert message={alert.name} type="error" />}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='email'>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id='email'
                            value={profile.email || ''}
                            onChange={ e => setProfile({
                                ...profile,
                                [e.target.id]: e.target.value
                            })}
                        />
                        {alert.email && <Alert message={alert.email} type="error" />}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='phone'>
                            Teléfono
                        </label>

                        <input
                            type="tel"
                            placeholder="222 123 4567"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id='phone'
                            value={profile.phone || ''}
                            onChange={ e => setProfile({
                                ...profile,
                                [e.target.id]: e.target.value
                            })}
                        />
                        {alert.phone && <Alert message={alert.phone} type="error" />}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor='web'>
                            Sitio web
                        </label>

                        <input
                            type="url"
                            placeholder="https://miportafolio.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            id='web'
                            value={profile.web || ''}
                            onChange={ e => setProfile({
                                ...profile,
                                [e.target.id]: e.target.value
                            })}
                        />

                        <p className="mt-2 text-sm text-gray-500">
                            Opcional. Comparte tu sitio web o portafolio.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full md:w-auto rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            Guardar cambios
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}