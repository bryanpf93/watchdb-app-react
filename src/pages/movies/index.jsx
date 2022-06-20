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
            <h2 className='mt-5 m-5'>{t('header.MOVIES_MOST_POPULAR')}</h2>
            
                <div className=" d-flex home-popular m-5">
                    {mostPopularMovies && mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
                </div>

            {/* <div className = 'container'>
            <h2>{t('header.MOVIES_MOST_POPULAR')}</h2>
                
                {mostPopularMovies && mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
                
            </div> */}
        </>
    )
}

export default Movies;