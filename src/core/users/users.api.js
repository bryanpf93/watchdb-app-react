import { wrapUsingAuth } from "../auth/auth.utils"

// La mejor forma de hacer esto es con un Interceptor. 
// fetch por defecto NO tiene interceptores y por eso se usa axios
// se puede crear un interceptor para fetch

export const getUserInfoAPI = async (id) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, wrapUsingAuth());
    return await r.json();
}

export const getUserFavoritesAPI = async (id) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/favorites`, wrapUsingAuth());
    return await r.json();
}

export const addUserFavoritesAPI = async (id, item) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/favorites`, wrapUsingAuth({ 
        method: 'PATCH',
        body: JSON.stringify(item)
    }));
    return await r.json();
}

export const removeUserFavoritesAPI = async (id, item) => {
    const r = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/favorites`, wrapUsingAuth({ 
        method: 'DELETE',
        body: JSON.stringify(item)
    }));
    return await r.json();
}