import { useTranslation } from "react-i18next";
import { getMovieUpcoming } from "../../core/movies/movies.utils";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import MostPopular from "./components-home/most-popular";
import UpComing from "./components-home/up-coming";
import Trending from "./components-home/trending";
import { MdUpcoming } from 'react-icons/md';
import { BiMoviePlay } from 'react-icons/bi';
import { BsDisplayFill } from 'react-icons/bs';
import './styles.css'
import TvPopular from "./components-home/tv-popular";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";


function Home() {

  // const [mostPopularMovies, setMostPopularMovies] = useState([])
  // const [trendingMovies, setTrendingMovies] = useState([])
  // const [upComingMovies, setUpComingMovies] = useState([])
  const { id } = useParams();
  const { t } = useTranslation('global');
  const navigate = useNavigate();

  const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMovieUpcoming);
  const { data: trendingMovies } = useFetchMedia('trending/all', getMovieUpcoming);
  const { data: upComingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming);
  const { data: popularTvShows } = useFetchMedia('tv/popular', getMovieUpcoming);



  return (
    <>
      <main className='container-fluid'>
        <div className='m-3 d-flex align-items-center'>
          <h2>{t('header.WELCOME')},{t('header.WELCOME_MESSAGE')}</h2>
        </div>
        <Carousel className='w-75 d-flex m-auto'>
          {mostPopularMovies && (mostPopularMovies.slice(0, 10)).map(m => <Carousel.Item interval={2000}>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`}
              alt="First slide"
            />
            <Carousel.Caption>
              <div className="description-movie">
                <h3>{m.title}</h3>
                <p>{m.overview}</p>
                <button >VER TRAILER</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>)}
        </Carousel>

        <div className="title-home mt-5 m-3">
          <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
          <span>{t('header.UPCOMING_MOVIES')}</span>
        </div>


        <div className='d-flex home-upcoming m-5 '>
          {upComingMovies && (upComingMovies.slice(0, 10)).map(u => <UpComing navigate={navigate} key={u.id} upcoming={u} ></UpComing>)}
        </div>

        <div className="title-home mt-5 m-3">
          <span className="title-icon">{<BiMoviePlay></BiMoviePlay>}</span>
          <span><Link className="title" to={'/movies'}>{t('header.MOVIES_MOST_POPULAR')}</Link></span>
        </div>
        <div className="d-flex home-popular m-5">
          {mostPopularMovies && (mostPopularMovies.slice(0, 10)).map(m => <MostPopular navigate={navigate} key={m.id} popular={m}></MostPopular>)}
        </div>

        <div className="title-home mt-5 m-3">
          <span className="title-icon">{<BsDisplayFill></BsDisplayFill>}</span>
          <span><Link className="title" to={'/series'}>{t('header.TVSHOWS_MOST_POPULAR')}</Link></span>
        </div>
        <div className="d-flex home-popular m-5">
          {popularTvShows && (popularTvShows.slice(0, 10)).map(m => <TvPopular key={m.id} popularTV={m}></TvPopular>)}
        </div>

        {/* <div className="home-trending">
          {trendingMovies && (trendingMovies.slice(0, 5)).map(t => <Trending key={t.id} trending={t}></Trending>)}
        </div> */}
      </main>
    </>
  );
}

export default Home;
