import { useTranslation } from 'react-i18next';
import { getMovieUpcoming } from '../../core/movies/movies.utils';
import { useFetchMedia } from '../../hooks/useFetchMedia';
import MostPopular from '../home/components-home/most-popular';
import './styles.css'

function Movies() {

    const { t } = useTranslation('global');

    const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMovieUpcoming);

    return (

        <>
            <div className='movies'>
                <h2>{t('header.MOVIES_MOST_POPULAR')}</h2>
                <div className="home-popular">
                    {mostPopularMovies && mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
                </div>
            </div>
        </>
    )
}

export default Movies;