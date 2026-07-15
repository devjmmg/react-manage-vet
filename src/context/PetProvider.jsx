import { createContext, useState } from "react";

const PetContext = createContext();

const PetProvider = ({children}) => {

    return (
        <PetContext.Provider
            value={{

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