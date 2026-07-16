import { useState } from "react";
import Alert from "../../components/Alert";
import usePet from "../../hooks/usePet";

export default function Pet() {

    const { pets, setPets, store } = usePet();
    const [ alert, setAlert ] = useState({});

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
            name,
            owner,
            email,
            registrationDate,
            symptoms
        });
        setAlert({success: response.success});
        setPets([response.pet, ...pets]);

        setName('');
        setOwner('');
        setEmail('');
        setRegistrationDate('');
        setSymptoms('');
    }
    
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
                        <input type="submit" value="Guardar" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 transition ease-linear duration-300 p-2 text-white font-medium rounded cursor-pointer"/>
                    </div>
                </form>
            </div>
            <div className="w-full overflow-y-scroll scrollbar-hidden">
                <p className="h-[300rem]">Lista</p>
            </div>
        </div>
    )
}
