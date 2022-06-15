import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MostPopular from "./components-home/most-popular";
import Trending from "./components-home/trending";
import UpComing from "./components-home/up-coming";
import './styles.css'


function Home() {

  const [mostPopularMovies, setMostPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upComingMovies, setUpComingMovies] = useState([])
  const {t} = useTranslation('global');

  const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

  console.log(API_KEY)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es&region=ES`)
      .then(res => res.json())
      .then(data => setUpComingMovies(data.results))

  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=es&region=ES`)
      .then(res => res.json())
      .then(data => setTrendingMovies(data.results))
  }, [])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es&region=ES`)
      .then(res => res.json())
      .then(data => setMostPopularMovies(data.results))
  }, [])

  

  console.log(upComingMovies)

  return (
    <>
    <div className="welcome">
        <h1>{t('header.WELCOME')}.</h1>
        <h2>{t('header.WELCOME_MESSAGE')}</h2>
      </div>
    <div className="home-container">
      <h2>{t('header.UPCOMING_MOVIES')}</h2>
      <div className="home-upcoming">
        {upComingMovies.map(u => <UpComing key={u.id} upcoming={u}></UpComing>)}
        </div>
      <h2>{t('header.MOST_POPULAR')}</h2>
      <div className="home-popular">
        {mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
      </div>
      <h2>{t('header.TRENDING')}</h2>
      <div className="home-trending">
        {trendingMovies.map(t => <Trending key={t.id} trending={t}></Trending>)}
      </div>
    </div>
    </>
  );
}

export default Home;