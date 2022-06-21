import { useTranslation } from "react-i18next";
import { getMoviePopular, getMovieUpcoming, getPopularTvShows, getTrending } from "../../core/media/media.services";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { MdUpcoming } from 'react-icons/md';
import { BiMoviePlay } from 'react-icons/bi';
import { BsDisplayFill } from 'react-icons/bs';
import { HiTrendingUp } from 'react-icons/hi'
import './styles.css'
import { Link } from "react-router-dom";
import { Carousel, Col, Row } from "react-bootstrap";
import Card from "../../components/card";

const MAX_ITEMS_SLIDER = 4;

function Home() {
  const { t } = useTranslation('global');

  const { data: trending } = useFetchMedia('trending/all/week', getTrending);
  const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMoviePopular);
  const { data: upComingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming);
  const { data: popularTvShows } = useFetchMedia('tv/popular', getPopularTvShows);

  return (
    <>
      <main className='container-fluid'>

        <div className='mb-3 mt-5 d-flex align-items-center'>
          <h2>{t('header.WELCOME')},{t('header.WELCOME_MESSAGE')}</h2>
        </div>

        <Carousel className='w-100 d-flex m-auto'>
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER))
            .map(({ id, title, backdrop }) =>
              <Carousel.Item key={id} interval={2000} className='carousel-item'>
                <img
                  className="d-block w-100"
                  src={backdrop}
                  alt={title}
                />
                <Carousel.Caption>
                  <div className="description-movie">
                    <h3>{title}</h3>
                    <button >VER TRAILER</button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>)}
        </Carousel>


        <div className="title-home mt-5">
          <span className="title-icon">{<HiTrendingUp></HiTrendingUp>}</span>
          <span>{t('header.UPCOMING_MOVIES')}</span>
        </div>
        <Row xs={2} md={2} lg={4} xl={5} className="g-4">
          {trending && (trending.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Col key={media.id}><Card {...media}></Card></Col>)}
        </Row>


        <div className="title-home mt-5">
          <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
          <span>{t('header.UPCOMING_MOVIES')}</span>
        </div>
        <Row xs={2} md={2} lg={4} xl={5} className="g-4">
          {upComingMovies && (upComingMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Col key={movie.id}><Card {...movie}></Card></Col>)}
        </Row>
        

        <div className="title-home mt-5">
          <span className="title-icon">{<BiMoviePlay></BiMoviePlay>}</span>
          <span><Link className="title" to={'/movies'}>{t('header.MOVIES_MOST_POPULAR')}</Link></span>
        </div>
        <Row xs={2} md={2} lg={4} xl={5} className="g-4">
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Col key={movie.id}><Card {...movie}></Card></Col>)}
        </Row>
        {/* <div className="d-flex home-popular m-5">
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Card key={movie.id} {...movie}></Card>
          )}
        </div> */}
        

        <div className="title-home mt-5">
          <span className="title-icon">{<BsDisplayFill></BsDisplayFill>}</span>
          <span><Link className="title" to={'/series'}>{t('header.TVSHOWS_MOST_POPULAR')}</Link></span>
        </div>
        <Row xs={2} md={2} lg={4} xl={5} className="g-4">
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(serie =>
            <Col key={serie.id}><Card {...serie}></Card></Col>)}
        </Row>
        {/* <div className="d-flex home-popular m-5">
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(serie =>
            <Card key={serie.id} {...serie}></Card>
          )}
        </div> */}
      </main>
    </>
  );
}

export default Home;
