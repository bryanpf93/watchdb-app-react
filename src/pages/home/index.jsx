import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [movies, setMovies] = useState([])

  const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/76341?api_key=${API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  console.log(movies)

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;