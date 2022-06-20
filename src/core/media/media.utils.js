import _ from 'lodash';

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
const BACKDROP_BASE_URL = process.env.REACT_APP_BACKDROP_BASE_URL;

export const mapperMedia = (data, type) => {
    const { id, backdrop_path, poster_path, overview, media_type } = data;
    const mediaType = media_type || type;
    const title = mediaType === 'movie' ? data.title : data.name;
    const date = mediaType === 'movie' ? data.release_date : data.first_air_date;
    const route = mediaType === 'movie' ? `/movies` : `/tv`;

    return {
        id,
        to: `/${route}/${id}`,
        image: `${IMAGE_BASE_URL}${poster_path}`,
        backdrop: `${BACKDROP_BASE_URL}${backdrop_path}`,
        title,
        description: overview,
        date: date
    };
}
