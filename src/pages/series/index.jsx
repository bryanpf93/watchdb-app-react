import { useState } from 'react';
import './styles.css'

function Series (){

    const [seriesList, setSeriesList] = useState([])

    const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

    return(
        <h1>Esto es la pagina de series</h1>
    )
} 

export default Series;