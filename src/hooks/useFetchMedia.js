import { useEffect, useState } from "react";
import { useAuth } from "../core/auth/auth.hook";

const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB;
const BASE_URL = process.env.REACT_APP_API_MOVIES_BASE_URL;

export function useFetchMedia(path, fetcher, favorites) {
    const { isAuth } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuth) {
            fetching();
        } else {
            if (favorites && favorites.length) {
                fetching();
            }
        }
    }, [path, favorites])

    const fetching = () => {
        setLoading(true);
        setData(null);
        setError(null);
        fetch(`${BASE_URL}/${path}?api_key=${API_KEY}&language=es&region=ES`)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                setData(fetcher ? fetcher(res, favorites) : res);
            })
            .catch(error => {
                setLoading(false);
                setError(error);
            });
    }

    return { data, loading, error };
}