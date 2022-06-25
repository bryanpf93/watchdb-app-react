import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Card from '../../components/card';
import { getMovieUpcoming } from '../../core/media/media.services';
import { useUser } from '../../core/users/users.hook';
import { useFetchMedia } from '../../hooks/useFetchMedia';
import './styles.css'

function Movies() {

    const { t } = useTranslation('global');
    const { favorites, toggleFavorite } = useUser();

    const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMovieUpcoming, favorites);
    

    return (

        <>
            <h3 className='mt-5'>{t('header.MOVIES_MOST_POPULAR')}</h3>

            <Row xs={2} md={2} lg={4} xl={5} className="g-4">
                {mostPopularMovies && mostPopularMovies.map(movie =>
                    <Col key={movie.id}><Card {...movie} onFavorite={() =>toggleFavorite(movie)}></Card></Col>)}
            </Row>

            {/* <div className = 'container'>
            <h2>{t('header.MOVIES_MOST_POPULAR')}</h2>
                
                {mostPopularMovies && mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
                
            </div> */}
        </>
    )
}

export default Movies;