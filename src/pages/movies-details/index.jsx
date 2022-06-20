import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { FaListUl } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs'

function MoviesDetails() {

    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=credits,videos`)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
                setLoading(false)
            }
            )
            .catch(err => {
                setError(true)
                setLoading(false)
            }
            )
    }, [id])

    console.log(movie)

    return (
        <div className='page-movie'>
            {loading ? <div>Loading...</div> :
                <div className="movie-details">
                    <img className='movie-image' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width={300} height={450} />
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <p>{movie.release_date}</p>
                        <p>Duracion: {movie.runtime} minutos</p>
                        <div className='genres'>{movie.genres.map(genre => <div key={genre.name} genre={genre} className='genre'>{genre.name}</div>)}</div>

                        <div className='buttons'>
                            <div className='circle'><FaListUl></FaListUl></div>
                            <div className='circle'><MdFavorite></MdFavorite></div>
                            <div className='trailer'>
                                <span className='play'><BsFillPlayFill></BsFillPlayFill></span>
                                <button className='play-trailer'>Reproducir trailer</button>
                            </div>
                        </div>
                        <h3>Vista General</h3>
                        <p>{movie.overview}</p>

                    </div>

                </div>}

            <div className='cast-container'>
                <h3>Actores</h3>
                <div className='cast'>
                    {  (movie?.credits?.cast?.slice(0,8))?.map(actor => <div key={actor.id} className='actor'>
                        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} width={140} height={190} />
                        <p>{actor.name}</p>
                    </div>
                    )}
                </div>
            </div>

            <div className='videos-container'>
                <h3>Videos</h3>
                <div className='videos'>
                    {  (movie?.videos?.results)?.map(video => <div key={video.id} className='video'>
                        <iframe width="300" height="200" src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div> )}
                </div>
            </div>

        </div>
    )

}

export default MoviesDetails;