import { useTranslation } from "react-i18next";
import { getMoviePopular, getMovieUpcoming, getPopularTvShows, getTrending } from "../../core/media/media.services";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { MdUpcoming } from 'react-icons/md';
import { BiMoviePlay } from 'react-icons/bi';
import { BsDisplayFill } from 'react-icons/bs';
import { HiTrendingUp } from 'react-icons/hi'
import './styles.css'
import { Link } from "react-router-dom";
import { Button, Carousel, Col, Modal, Row } from "react-bootstrap";
import Card from "../../components/card";
import { useUser } from "../../core/users/users.hook";
import Slider from "react-slick";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { mapperTrailer } from "../../core/media/media.utils";

const MAX_ITEMS_SLIDER = 15;

function Home() {
  const { t } = useTranslation('global');
  const { favorites, toggleFavorite } = useUser();

  const { data: trending } = useFetchMedia('trending/all/week', getTrending, favorites);
  const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMoviePopular, favorites);
  const { data: upComingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming, favorites);
  const { data: popularTvShows } = useFetchMedia('tv/popular', getPopularTvShows, favorites);

  const [trailer, setTrailer] = useState('');

  const handleFavorite = (media) => {
    toggleFavorite(media);
  }

  var settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplaySpeed: 5000,
    cssEase: "linear",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async (type, id) => {
    const response = await fetch(`${process.env.REACT_APP_API_MOVIES_BASE_URL}/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY_MOVIE_DB}&language=es-ES&region=ES&watch_region=ES&include_video_language=es,null`)
      .then(res => res.json());
    setTrailer(mapperTrailer(response.results))
    setShow(true)
  };

  return (
    <>
      <main className='container-fluid'>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="p-0">
            <iframe width="100%" height="100%" src={trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Modal.Body>
        </Modal>

        <div className='mb-3 mt-4 d-flex align-items-center '>
          <h2 className='fw-bold title'>{t('header.WELCOME')}, {t('header.WELCOME_MESSAGE')}</h2>
        </div>

        <Carousel>
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER))
            .map(({ id, type, title, backdrop }) =>
              <Carousel.Item key={id} interval={555000}>
                <img
                  className="d-block w-100"
                  src={backdrop}
                  alt={title}
                />
                <Carousel.Caption>
                  <div className="description-movie">
                    <h3>{title}</h3>
                    <Button variant="danger" onClick={() => handleShow(type, id)}>
                      VER TRAILER
                    </Button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>)}
        </Carousel>



        {favorites.length >= 5 ? <><div className="title-home mt-5">
          <span className="title-icon">{<FcLike></FcLike>}</span>
          <span className="title">{t('header.FAVORITES')}</span>
        </div>
          <Slider {...settings} className='slider'>
            {favorites && (favorites.slice(0, MAX_ITEMS_SLIDER)).map(media =>
              <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
          </Slider>
        </> : ''}




        <div className="title-home mt-5">
          <span className="title-icon">{<HiTrendingUp></HiTrendingUp>}</span>
          <span className="title">{t('header.MOVIES_TRENDING')}</span>
        </div>
        <Slider {...settings} className='slider'>
          {trending && (trending.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>


        <div className="title-home mt-5">
          <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
          <span><Link className="title title-link" to={'/upcoming'}>{t('header.UPCOMING_MOVIES')}</Link></span>
        </div>
        <Slider {...settings} className='slider'>
          {upComingMovies && (upComingMovies.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>


        <div className="title-home mt-5">
          <span className="title-icon">{<BiMoviePlay></BiMoviePlay>}</span>
          <span><Link className="title title-link" to={'/movies'}>{t('header.MOVIES_MOST_POPULAR')}</Link></span>
        </div>
        <Slider {...settings} className='slider'>
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>



        <div className="title-home mt-5">
          <span className="title-icon">{<BsDisplayFill></BsDisplayFill>}</span>
          <span><Link className="title title-link" to={'/tv'}>{t('header.TVSHOWS_MOST_POPULAR')}</Link></span>
        </div>
        <Slider {...settings} className='slider mb-5'>
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>

        {/* <Row xs={2} md={3} lg={4} xl={5} className="g-4">
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(serie =>
            <Col key={serie.id}><Card {...serie} onFavorite={() => handleFavorite(serie)}></Card></Col>)}
        </Row> */}
      </main>
    </>
  );
}

export default Home;
