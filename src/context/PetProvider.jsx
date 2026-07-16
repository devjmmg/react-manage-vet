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

    const all = async e => {
        const { data } = await api('/pets', config);
        setPets(data.pets);
    }

    const store = async pet => {
        const { data } = await api.post('/pets', pet, config);
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
                setPets
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