import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Card from '../../components/card';
import {  getPopularTvShows } from '../../core/media/media.services';
import { useUser } from '../../core/users/users.hook';
import { useFetchMedia } from '../../hooks/useFetchMedia';
// import TvPopular from '../home/components-home/tv-popular';
import './styles.css'

function Series() {

    const { t } = useTranslation('global');
    const { favorites } = useUser();

    const { data: popularTvShows } = useFetchMedia('tv/popular', getPopularTvShows, favorites);

    console.log(popularTvShows);

    return (
        <>
            <h2 className='mt-5'>{t('header.TVSHOWS_MOST_POPULAR')}</h2>
            {/* <div className="home-popular">
                    {popularTvShows && popularTvShows.map(m => <TvPopular key={m.id} popularTV={m}></TvPopular>)}
                </div> */}
            <Row xs={2} md={3} lg={4} xl={5} className="g-4">
                {popularTvShows && popularTvShows.map(movie =>
                    <Col key={movie.id}><Card {...movie}></Card></Col>)}
            </Row>
        </>
    )
}

export default Series;