import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import usePet from "../../hooks/usePet";

export default function Pet() {

    const { pets, setPets, store, loading, edit, pet, setPet, destroy } = usePet();
    const [ alert, setAlert ] = useState({});

    const [ id, setId ] = useState('');
    const [ name, setName ] = useState('');
    const [ owner, setOwner ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ registrationDate, setRegistrationDate ] = useState('');
    const [ symptoms, setSymptoms ] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = {};

        if (!name.trim()) {
            errors.name = 'El nombre es requerido.';
        }

        if (!owner.trim()) {
            errors.owner = 'El propietario es requerido.';
        }

        if (!email.trim()) {
            errors.email = 'El correo electrónico es requerido.';
        }

        if (!registrationDate.trim()) {
            errors.registrationDate = 'La fecha de alta es requerida.';
        }

        if (!symptoms.trim()) {
            errors.symptoms = 'Los sintomas son requeridos.';
        }

        setAlert(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const response = await store({
            id,
            name,
            owner,
            email,
            registrationDate,
            symptoms
        });
        setAlert({success: response.success});
        if (pet) {
            setPets(
                pets.map( p => {
                    if ( p._id === response.pet._id) {
                        return response.pet;
                    }
                    return p;
                })
            )
        } else {
            setPets([...pets, response.pet]);
        }

        setId('');
        setName('');
        setOwner('');
        setEmail('');
        setRegistrationDate('');
        setSymptoms('');
        setPet(null);
    }

    useEffect(() => {
        if (!pet) { return };
        setId(pet._id);
        setName(pet.name);
        setOwner(pet.owner);
        setEmail(pet.email);
        setRegistrationDate(pet.registrationDate.split("T")[0]);
        setSymptoms(pet.symptoms);

    }, [pet]);

    useEffect(() => {
        if (!alert.success) return;

        const timer = setTimeout(() => {
            setAlert({});
        }, 3000); // 3 segundos

        return () => clearTimeout(timer);

    }, [alert.success]);
    
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 h-full">
            <div className="w-full flex flex-col items-center gap-5 overflow-y-scroll scrollbar-hidden">
                <h2 className="font-medium text-xl text-center mb-5">Añade tus pacientes y <span className="text-indigo-500">administralos</span></h2>

                {alert.success && <Alert message={alert.success} type="success" className="mb-2 text-center" />}

                <form onSubmit={handleSubmit} className="space-y-4 shadow-xl rounded-md p-4 w-full max-w-2xl">
                    <div>
                        <label className="block" htmlFor="name">Nombre de la mascota</label>
                        <input type="text" id="name" name="name" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={name} onChange={ e => setName(e.target.value)} />
                        {alert.name && <Alert message={alert.name} type="error" />}
                    </div>
                    <div>
                        <label className="block" htmlFor="owner">Propietario</label>
                        <input type="text" id="owner" name="owner" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={owner} onChange={ e => setOwner(e.target.value)} />
                        {alert.owner && <Alert message={alert.owner} type="error" />}
                    </div>
                    <div>
                        <label className="block" htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={email} onChange={ e => setEmail(e.target.value)} />
                        {alert.email && <Alert message={alert.email} type="error" />}
                    </div>
                     <div>
                        <label className="block" htmlFor="registrationDate">Fecha de alta</label>
                        <input type="date" id="registrationDate" name="registrationDate" className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500" value={registrationDate} onChange={ e => setRegistrationDate(e.target.value)} />
                        {alert.registrationDate && <Alert message={alert.registrationDate} type="error" />}
                    </div>
                    <div>
                        <label className="block" htmlFor="symptoms">
                            Síntomas
                        </label>

                        <textarea
                            id="symptoms"
                            name="symptoms"
                            className="bg-gray-100 w-full p-2 rounded-md border-indigo-500 border focus:outline-indigo-500 h-24"
                            value={symptoms}
                            onChange={e => setSymptoms(e.target.value)}
                        />

                        {alert.symptoms && <Alert message={alert.symptoms} type="error" />}
                    </div>
                    <div className="flex justify-end items-center">
                        <input type="submit" value={pet ? 'Actualizar' : 'Guardar'} className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 transition ease-linear duration-300 p-2 text-white font-medium rounded cursor-pointer"/>
                    </div>
                </form>
            </div>
            <div className="w-full overflow-y-auto scrollbar-hidden">
                <h2 className="text-xl font-medium text-gray-600 mb-6">
                    Mascotas
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                    </div>
                ) : pets.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            No hay pacientes registrados.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        { pets.map( pet => {
                            const { _id, name, owner, email, registrationDate, symptoms } = pet;
                            return (
                                <article
                                    key={_id}
                                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition ease-linear duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                Propietario: {owner}
                                            </p>
                                        </div>

                                        <span className="text-sm text-gray-400">
                                            {new Intl.DateTimeFormat("es-MX", {
                                                dateStyle: "long",
                                            }).format(new Date(registrationDate))}
                                        </span>
                                    </div>

                                    <div className="mt-5 grid gap-3 text-sm">
                                        <div>
                                            <p className="font-medium text-gray-700">
                                                Correo electrónico
                                            </p>
                                            <p className="text-gray-500">
                                                {email}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="font-medium text-gray-700">
                                                Síntomas
                                            </p>
                                            <p className="text-gray-500">
                                                {symptoms}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button type="button" className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 ease-linear duration-300 transition cursor-pointer" onClick={ () => { edit(pet)} }>
                                            Editar
                                        </button>

                                        <button 
                                            type="button" 
                                            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 ease-linear duration-300 transition cursor-pointer" 
                                            onClick = { 
                                                async () => { 
                                                    const response = await destroy(_id);
                                                    if ( response ) {
                                                        setAlert({ success: response.success });
                                                        setId('');
                                                        setName('');
                                                        setOwner('');
                                                        setEmail('');
                                                        setRegistrationDate('');
                                                        setSymptoms('');
                                                        setPet(null);
                                                    }
                                                }
                                            }>
                                            Eliminar
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
