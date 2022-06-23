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

const MAX_ITEMS_SLIDER = 10;

function Home() {
  const { t } = useTranslation('global');
  const { favorites, addFavorite } = useUser();

  const { data: trending } = useFetchMedia('trending/all/week', getTrending, favorites);
  const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMoviePopular, favorites);
  const { data: upComingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming, favorites);
  const { data: popularTvShows } = useFetchMedia('tv/popular', getPopularTvShows, favorites);

  const handleFavorite = (media) => {
    addFavorite(media);
  }

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
  const handleShow = () => setShow(true);

  return (
    <>
      <main className='container-fluid'>

        <div className='mb-3 mt-5 d-flex align-items-center'>
          <h2>{t('header.WELCOME')}, {t('header.WELCOME_MESSAGE')}</h2>
        </div>

        <Carousel>
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER))
            .map(({ id, title, backdrop }) =>
              <Carousel.Item key={id} interval={2000}>
                <img
                  className="d-block w-100"
                  src={backdrop}
                  alt={title}
                />
                <Carousel.Caption>
                  <div className="description-movie">
                    <h3>{title}</h3>
                    <Button variant="danger" onClick={handleShow}>
                      VER TRAILER
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body>
                        <iframe width="450" height="300" src={'https://www.youtube.com/embed/JDYdGnpmsgo'} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </Modal.Body>

                    </Modal>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>)}
        </Carousel>


        <div className="title-home mt-5">
          <span className="title-icon">{<HiTrendingUp></HiTrendingUp>}</span>
          <span>{t('header.MOVIES_TRENDING')}</span>
        </div>
        {/* <Row xs={2} md={3} lg={4} xl={5} className="g-4">
          {trending && (trending.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Col key={media.id}><Card {...media} onFavorite={() => handleFavorite(media)}></Card></Col>)}
        </Row> */}
        <Slider {...settings} className='slider'>
          {trending && (trending.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>


        <div className="title-home mt-5">
          <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
          <span><Link className="title" to={'/upcoming'}>{t('header.UPCOMING_MOVIES')}</Link></span>
        </div>
        {/* <Row xs={2} md={3} lg={4} xl={5} className="g-4">
          {upComingMovies && (upComingMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Col key={movie.id}><Card {...movie} onFavorite={() => handleFavorite(movie)}></Card></Col>)}
        </Row> */}
        <Slider {...settings} className='slider'>
          {upComingMovies && (upComingMovies.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>


        <div className="title-home mt-5">
          <span className="title-icon">{<BiMoviePlay></BiMoviePlay>}</span>
          <span><Link className="title" to={'/movies'}>{t('header.MOVIES_MOST_POPULAR')}</Link></span>
        </div>
        {/* <Row xs={2} md={3} lg={4} xl={5} className="g-4">
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Col key={movie.id}><Card {...movie} onFavorite={() => handleFavorite(movie)}></Card></Col>)}
        </Row> */}
        <Slider {...settings} className='slider'>
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>



        <div className="title-home mt-5">
          <span className="title-icon">{<BsDisplayFill></BsDisplayFill>}</span>
          <span><Link className="title" to={'/series'}>{t('header.TVSHOWS_MOST_POPULAR')}</Link></span>
        </div>
        {/* <Row xs={2} md={3} lg={4} xl={5} className="g-4">
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(serie =>
            <Col key={serie.id}><Card {...serie} onFavorite={() => handleFavorite(serie)}></Card></Col>)}
        </Row> */}
        <Slider {...settings} className='slider mb-5'>
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media} onFavorite={() => handleFavorite(media)}></Card>)}
        </Slider>
      </main>
    </>
  );
}

export default Home;
