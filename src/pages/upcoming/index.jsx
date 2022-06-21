import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Card from '../../components/card';
import { getMovieUpcoming } from '../../core/media/media.services';
import { useFetchMedia } from '../../hooks/useFetchMedia';
import './styles.css'

function UpComing() {

    const { t } = useTranslation('global');

    const { data: upcomingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming);
    
    console.log(upcomingMovies);

    return (
        <>
            <h3 className='mt-5'>{t('header.UPCOMING_MOVIES')}</h3>

            <Row xs={2} md={2} lg={4} xl={5} className="g-4">
                {upcomingMovies && upcomingMovies.map(movie =>
                    <Col key={movie.id}><Card {...movie}></Card></Col>)}
            </Row>

        </>
    )
}

export default UpComing;