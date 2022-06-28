import { mapperMedia } from "./media.utils";

export const getTrending = (res, favorites) => {
    const media = res.results;
    return media.map(movie => mapperMedia(movie, 'movie', favorites));
}

export const getMovieUpcoming = (res, favorites) => {
    const movies = res.results;
    return movies.map(movie => mapperMedia(movie, 'movie', favorites));
}

export const getMoviePopular = (res, favorites) => {
    const movies = res.results;
    return movies.map(movie => mapperMedia(movie, 'movie', favorites));
}

export const getPopularTvShows = (res, favorites) => {
    const tv = res.results;
    return tv.map(tv => mapperMedia(tv, 'tv', favorites));
}
