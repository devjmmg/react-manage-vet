import { createContext, useEffect, useState } from "react";
import api from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({});
    const [loading, setLoading] = useState(true);
    
    const authUser = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const { data } = await api('/profile', config);
            setAuth(data);
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        setAuth({});
    }

    const update = async profile => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (!token) {
            return;
        }
        
        try {
            const { data } = await api.put(`/profile`, profile, config);
            setAuth(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const updatePassword = async info => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (!token) {
            return;
        }
        
        try {
            const { data } = await api.put(`/profile/password`, info, config);
            return data;
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    }

    useEffect( () => {
        authUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                authUser,
                loading,
                logout,
                update,
                updatePassword
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