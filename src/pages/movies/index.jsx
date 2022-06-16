import { useState } from 'react';
import './styles.css'

function Movies (){

    const [moviesList, setMoviesList] = useState([])

    const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

    return(
        <h1>Esto es la pagina de peliculas</h1>
    )
} 

export default Movies;