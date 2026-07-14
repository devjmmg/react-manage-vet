import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({});
    const [loading, setLoading] = useState(true);

    const authUser = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) {
            setLoading(false);
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await api('/profile', config);
            setAuth(data);
        } catch (error) {
            setAuth({});
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect( () => {
        authUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        setAuth({});
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                authUser,
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;