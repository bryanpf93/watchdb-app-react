import { useCallback, useEffect, useState } from "react";
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
            if (favorites) {
                fetching();
            }
        }
    }, [path, favorites])

    const fetching = useCallback(() => {
        let url = new URL(`${BASE_URL}/${path}`);
        url.searchParams.append('api_key', API_KEY);
        url.searchParams.append('language', 'es');
        url.searchParams.append('region', 'ES');

        setLoading(true);
        setData(null);
        setError(null);
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                setData(fetcher ? fetcher(res, favorites) : res);
            })
            .catch(error => {
                setLoading(false);
                setError(error);
            });
    }, [favorites])

    return { data, loading, error };
}