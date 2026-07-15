import { useContext } from "react";
import PetContext from "../context/PetProvider";

export default function usePeth() {
    return useContext(PetContext);
}
