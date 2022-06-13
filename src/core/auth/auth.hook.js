import { useState } from "react";
import { registerAPI, loginAPI, validateTokenAPI } from "./auth.api.js"
import { AUTH_STORAGE_KEY } from "./auth.utils.js";

// Se encarga de toda la gestion de la aunteticacion, 
// es el que decide si estamos logados o no
// Expone las funciones de Auth
// Expone el token y la gestion de guardar el token(jwt)

// ¿Que quiero devolver?
// Si estamos logados o no
// si estamos cargando o no
// funciones de registro
// funciones de validar el token
// funciones de login

export const useAuth = () => {

    const [isAuth, setIsAuth] = useState(sessionStorage.getItem(AUTH_STORAGE_KEY) !== null);
    const [isLoading, setIsLoading] = useState(null);
    
    const register = async (user) => {
        setIsLoading(true); // me pongo en modo carga
        await registerAPI(user)
        setIsLoading(false); // cuando termino de llamar al API dejo de cargar
    }

    const login = async (user) => {
        setIsLoading(true); //  me pongo en modo carga
        const token = await loginAPI(user)
        setIsAuth(true);
        sessionStorage.setItem(AUTH_STORAGE_KEY, token.access_token);
        setIsLoading(false); // cuando termino de llamar al API dejo de cargar
    }

    const  validate = async (token) => {
        setIsLoading(true); // me pongo en modo carga
        await validateTokenAPI(token)
        setIsLoading(false); // cuando termino de llamar al API dejo de cargar
    }

    return {
        isAuth,
        isLoading,
        register,
        login,
        validate
    }

}