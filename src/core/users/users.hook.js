import { useEffect, useState } from "react"
import { useAuth } from "../auth/auth.hook";
import { addUserFavoritesAPI, getUserFavoritesAPI, getUserInfoAPI, removeUserFavoritesAPI, removeUserInfoAPI } from "./users.api"


export const useUser = () => {
    const { isAuth, userId } = useAuth();
    const [user, updateUser] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (isAuth) {
            getUser()

            if (userId) {
                getFavorites()
            }
        }
    }, [isAuth, userId]);

    const getUser = async () => {
        const responseUser = await getUserInfoAPI(userId);
        updateUser(responseUser.data);
    }

    const removeUser = async () => {
        const responseUser = await removeUserInfoAPI(userId);
        updateUser(responseUser.data);
    }

    const getFavorites = async () => {
        const responseFavs = await getUserFavoritesAPI(userId);
        setFavorites([...responseFavs.data.favorites]);
    }

    const addFavorite = async (media) => {
        const responseFavs = await addUserFavoritesAPI(userId, media);
        setFavorites([...responseFavs.data.favorites]);
    }

    const removeFavorite = async (media) => {
        const responseFavs = await removeUserFavoritesAPI(userId, media);
        setFavorites([...responseFavs.data.favorites]);
    }

    const isFavorite = (media) => {
        return !!favorites.find(fav => String(fav.id) === String(media.id));
    }

    const toggleFavorite = async (media) => {
        if (isFavorite(media)) {
            await removeFavorite(media);
        } else {
            await addFavorite(media);
        }
        // getFavorites();
    }

    return {
        user,
        removeUser,
        favorites,
        isFavorite,
        toggleFavorite
    }
}