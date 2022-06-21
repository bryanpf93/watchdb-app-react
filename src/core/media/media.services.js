import { mapperMedia } from "./media.utils";

export const getTrending = (res) => {
    const media = res.results;
    return media.map(movie => mapperMedia(movie, 'movie'));
}

export const getMovieUpcoming = (res) => {
    const movies = res.results;
    return movies.map(movie => mapperMedia(movie, 'movie'));
}

export const getMoviePopular = (res) => {
    const movies = res.results;
    return movies.map(movie => mapperMedia(movie, 'movie'));
}

export const getPopularTvShows = (res) => {
    const tv = res.results;
    return tv.map(tv => mapperMedia(tv, 'tv'));
}
