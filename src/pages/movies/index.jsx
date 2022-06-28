import { useEffect, useState } from 'react';
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
    const [page,setPage] = useState(1);
    const [mostPopularMovies, setMovies] = useState([]);

    const { data } = useFetchMedia(`movie/popular?page=${page}`, getMovieUpcoming, favorites);

    const handlePage = () => {
        setPage(prevPage => prevPage + 1);
    }

    useEffect(() => {
        if (Array.isArray(data)) {
            setMovies(prevMovies => [...prevMovies, ...data]);
        }
    }, [data]);

    return (

        <>
            <h3 className='mt-5'>{t('header.MOVIES_MOST_POPULAR')}</h3>

            <Row xs={2} md={3} lg={4} xl={5} className="g-4">
                {mostPopularMovies && mostPopularMovies.map(movie =>
                    <Col key={movie.id}><Card {...movie} onFavorite={() =>toggleFavorite(movie)}></Card></Col>)}
            </Row>

            <button onClick={handlePage} > NEXT</button>

            {/* <div className = 'container'>
            <h2>{t('header.MOVIES_MOST_POPULAR')}</h2>
                
                {mostPopularMovies && mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
                
            </div> */}
        </>
    )
}

export default Movies;