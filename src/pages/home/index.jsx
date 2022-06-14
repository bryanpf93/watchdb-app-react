import { useEffect, useState } from "react";
import MostPopular from "./components-home/most-popular";
import Trending from "./components-home/trending";
import UpComing from "./components-home/up-coming";
import './styles.css'


function Home() {

  const [mostPopularMovies, setMostPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upComingMovies, setUpComingMovies] = useState([])

  const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

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

  

  console.log(mostPopularMovies)

  return (
    <>
    <div className="welcome">
        <h1>BIENVENID@.</h1>
        <h2>Millones de películas, series y personas por descubrir.</h2>
      </div>
    <div className="home-container">
      <h2>PRÓXIMOS ESTRENOS</h2>
      <div className="home-upcoming">
        {upComingMovies.map(u => <UpComing key={u.id} upcoming={u}></UpComing>)}
        </div>
      <h2>LO MÁS POPULAR</h2>
      <div className="home-popular">
        {mostPopularMovies.map(m => <MostPopular key={m.id} popular={m}></MostPopular>)}
      </div>
      <h2>TENDENCIAS</h2>
      <div className="home-trending">
        {trendingMovies.map(t => <Trending key={t.id} trending={t}></Trending>)}
      </div>
    </div>
    </>
  );
}

export default Home;