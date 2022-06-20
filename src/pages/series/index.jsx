import { useTranslation } from 'react-i18next';
import { getMovieUpcoming } from '../../core/media/media.services';
import { useFetchMedia } from '../../hooks/useFetchMedia';
// import TvPopular from '../home/components-home/tv-popular';
import './styles.css'

function Series (){

    const { t } = useTranslation('global');

    const { data: popularTvShows } = useFetchMedia('tv/popular', getMovieUpcoming);

    return(
        <div className='series'>
                <h2>{t('header.TVSHOWS_MOST_POPULAR')}</h2>
                {/* <div className="home-popular">
                    {popularTvShows && popularTvShows.map(m => <TvPopular key={m.id} popularTV={m}></TvPopular>)}
                </div> */}
            </div>
    )
} 

export default Series;