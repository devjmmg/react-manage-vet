import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const PetContext = createContext();

const PetProvider = ({children}) => {

    const token = localStorage.getItem('AUTH_TOKEN');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const [ pets, setPets ] = useState([]);
    const [ pet, setPet ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const all = async e => {
        setLoading(true);
        try {
            const { data } = await api('/pets', config);
            setPets(data.pets);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const store = async pet => {

        if (pet.id) {
            try {
                const { data } = await api.put(`/pets/${pet.id}`, pet, config);
                return data;
            } catch (error) {
                console.log(error.response);
            }
        } else {
            try {
                const { data } = await api.post('/pets', pet, config);
                return data;
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    const edit = pet => {
        setPet(pet);
    }

    const destroy = async id => {
        const ok = confirm('¿Eliminar mascota?');

        if (!ok) { return; }

        const { data } = await api.delete(`/pets/${id}`, config);

        setPets(pets.filter(p => p._id !== id));

        return data;
    }

    useEffect( () => {
        all();
    }, []);

    return (
        <PetContext.Provider
            value={{
                store,
                pets,
                setPets,
                loading,
                edit,
                pet,
                setPet,
                destroy
            }}
        >
            {children}
        </PetContext.Provider>
    )
}
export {
    PetProvider
}
export default PetContext;