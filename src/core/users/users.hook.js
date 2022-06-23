import { useEffect, useState } from "react"
import { useAuth } from "../auth/auth.hook";
import { addUserFavoritesAPI, getUserFavoritesAPI, getUserInfoAPI } from "./users.api"


export const useUser = () => {
    const { isAuth, userId } = useAuth();
    const [user, updateUser] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (useAuth) {
            getUser()

            if (userId) {
                getFavorites()
            }
        }

    }, [isAuth, userId]);

    const getUser = async () => {
        const responseUser = await getUserInfoAPI(userId);
        updateUser(responseUser);
    }

    const getFavorites = async () => {
        const responseFavs = await getUserFavoritesAPI(userId);
        setFavorites([...responseFavs.data.favorites]);
    }

    const addFavorite = async (media) => {
        const responseFavs = await addUserFavoritesAPI(userId, media);
    }

    return {
        user,
        favorites,
        addFavorite
    }
}