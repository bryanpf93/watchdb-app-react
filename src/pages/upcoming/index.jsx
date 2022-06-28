import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MdUpcoming } from 'react-icons/md';
import Card from '../../components/card';
import { getMovieUpcoming } from '../../core/media/media.services';
import { useUser } from '../../core/users/users.hook';
import { useFetchMedia } from '../../hooks/useFetchMedia';
import './styles.css'

function UpComing() {

    const { t } = useTranslation('global');
    const { favorites } = useUser();
    const [page,setPage] = useState(1);
    const [upComingMovies, setUpComingMovies] = useState([]);

    const { data } = useFetchMedia(`movie/upcoming?page=${page}`, getMovieUpcoming, favorites);

    const handlePage = () => {
        setPage(prevPage => prevPage + 1);
    }

    useEffect(() => {
        if (Array.isArray(data)) {
            setUpComingMovies(prevUpComingMovies => [...prevUpComingMovies, ...data]);
        }
    }, [data]);

    console.log(upComingMovies);

    return (
        <>
            <div className="title-home mt-5">
                <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
                <span className="title title-link">{t('header.UPCOMING_MOVIES')}</span>
            </div>

            <Row xs={2} md={2} lg={4} xl={5} className="g-4">
                {upComingMovies && upComingMovies.map(movie =>
                    <Col key={movie.id}><Card {...movie}></Card></Col>)}
            </Row>

            <button onClick={handlePage} > NEXT</button>

        </>
    )
}

export default UpComing;