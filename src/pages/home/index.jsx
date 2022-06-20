import { useTranslation } from "react-i18next";
import { getMovieUpcoming } from "../../core/movies/movies.utils";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import MostPopular from "./components-home/most-popular";
import UpComing from "./components-home/up-coming";
import { MdUpcoming } from 'react-icons/md';
import { BiMoviePlay } from 'react-icons/bi';
import { BsDisplayFill } from 'react-icons/bs';
import './styles.css'
import TvPopular from "./components-home/tv-popular";
import { Link, useNavigate } from "react-router-dom";


function Home() {

  // const [mostPopularMovies, setMostPopularMovies] = useState([])
  // const [trendingMovies, setTrendingMovies] = useState([])
  // const [upComingMovies, setUpComingMovies] = useState([])
  const { t } = useTranslation('global');
  const navigate = useNavigate();

  const { data: mostPopularMovies } = useFetchMedia('movie/popular', getMovieUpcoming);
  const { data: upComingMovies } = useFetchMedia('movie/upcoming', getMovieUpcoming);
  const { data: popularTvShows } = useFetchMedia('tv/popular', getMovieUpcoming);

  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=es&region=ES`)
  //     .then(res => res.json())
  //     .then(data => setTrendingMovies(data.results))
  // }, [])

  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es&region=ES`)
  //     .then(res => res.json())
  //     .then(data => setMostPopularMovies(data.results))
  // }, [])


  return (
    <>
      <main>
        <div className="welcome">
          <h1>{t('header.WELCOME')}.</h1>
          <h2>{t('header.WELCOME_MESSAGE')}</h2>
        </div>
        <div className="home-container">
          <div className="title-home">
            <span className="title-icon">{<MdUpcoming></MdUpcoming>}</span>
            <span>{t('header.UPCOMING_MOVIES')}</span>
          </div>

      


          <div className="home-upcoming">
            {upComingMovies && (upComingMovies.slice(0, 10)).map(u => <UpComing navigate={navigate} key={u.id} upcoming={u} ></UpComing>)}
          </div>
          <div className="title-home">
            <span className="title-icon">{<BiMoviePlay></BiMoviePlay>}</span>
          <span><Link className="title" to={'/movies'}>{t('header.MOVIES_MOST_POPULAR')}</Link></span>
          </div>
          <div className="home-popular">
            
            {mostPopularMovies && (mostPopularMovies.slice(0, 10)).map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
          </div>
          {/* <h2>{t('header.MOVIES_TRENDING')}</h2>
      <div className="home-trending">
        { trendingMovies && (trendingMovies.slice(0,5)).map(t => <Trending key={t.id} trending={t}></Trending>)}
      </div> */}
          <div className="title-home">
            <span className="title-icon">{<BsDisplayFill></BsDisplayFill>}</span>
          <span><Link className="title" to={'/series'}>{t('header.TVSHOWS_MOST_POPULAR')}</Link></span>
          </div>
          <div className="home-popular">
            {popularTvShows && (popularTvShows.slice(0, 10)).map(m => <TvPopular key={m.id} popularTV={m}></TvPopular>)}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
