import { useTranslation } from "react-i18next";
import { getMoviePopular, getMovieUpcoming, getPopularTvShows, getTrending } from "../../core/media/media.services";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { MdUpcoming } from 'react-icons/md';
import { BiMoviePlay } from 'react-icons/bi';
import { BsDisplayFill } from 'react-icons/bs';
import './styles.css'
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Card from "../../components/card";

const MAX_ITEMS_SLIDER = 3;

function Home() {
  const { t } = useTranslation('global');

  const { data: trending } = useFetchMedia('trending/all/week', getTrending);
  const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMoviePopular);
  const { data: upComingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming);
  const { data: popularTvShows } = useFetchMedia('tv/popular', getPopularTvShows);

  return (
    <>
      <main className='container-fluid'>
        <div className='m-3 d-flex align-items-center'>
          <h2>{t('header.WELCOME')},{t('header.WELCOME_MESSAGE')}</h2>
        </div>
        <Carousel className='w-75 d-flex m-auto'>
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
                    <button >VER TRAILER</button>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>)}
        </Carousel>

        <div className="home-trending">
          {trending && (trending.slice(0, MAX_ITEMS_SLIDER)).map(media =>
            <Card key={media.id} {...media}></Card>
          )}
        </div>

        <div className="title-home mt-5 m-3">
          <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
          <span>{t('header.UPCOMING_MOVIES')}</span>
        </div>
        <div className='d-flex home-upcoming m-5 '>
          {upComingMovies && (upComingMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Card key={movie.id} {...movie}></Card>
          )}
        </div>


        <div className="title-home mt-5 m-3">
          <span className="title-icon">{<BiMoviePlay></BiMoviePlay>}</span>
          <span><Link className="title" to={'/movies'}>{t('header.MOVIES_MOST_POPULAR')}</Link></span>
        </div>
        <div className="d-flex home-popular m-5">
          {mostPopularMovies && (mostPopularMovies.slice(0, MAX_ITEMS_SLIDER)).map(movie =>
            <Card key={movie.id} {...movie}></Card>
          )}
        </div>


        <div className="title-home mt-5 m-3">
          <span className="title-icon">{<BsDisplayFill></BsDisplayFill>}</span>
          <span><Link className="title" to={'/series'}>{t('header.TVSHOWS_MOST_POPULAR')}</Link></span>
        </div>
        <div className="d-flex home-popular m-5">
          {popularTvShows && (popularTvShows.slice(0, MAX_ITEMS_SLIDER)).map(serie =>
            <Card key={serie.id} {...serie}></Card>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
