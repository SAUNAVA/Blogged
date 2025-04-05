import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New state for loading

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setuser(decoded);
        }
        setIsLoading(false); // Set loading to false after initialization
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setuser(decoded);
        // navigate('/')
    };

    const logout = () => {
        localStorage.removeItem('token');
        setuser(null);
        // navigate('/login')
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading, // Provide isLoading in the context
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};