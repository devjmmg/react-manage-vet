import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

import React from 'react'

export default function useAuth() {
    return useContext(AuthContext);
}
