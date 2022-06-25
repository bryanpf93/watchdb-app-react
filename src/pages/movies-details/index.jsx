import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { FaListUl } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs'
import CardCredits from '../../components/card-credits';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import { useUser } from '../../core/users/users.hook';

function MoviesDetails() {

    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { isFavorite, toggleFavorite } = useUser();

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

    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            {/* {loading ? <div>Loading...</div> :
                <div className="row p-5 mt-5 bg-danger">
                    <img className='movie-image col-md-3' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width={300} height={450} />
                    <div className="movie-info col-md">
                        <h1>{movie.title}</h1>
                        <p>{movie.release_date}</p>
                        <p>Duracion: {movie.runtime} minutos</p>
                        <div className='genres'>{movie.genres.map(genre => <div key={genre.name} genre={genre} className='genre'>{genre.name}</div>)}</div>

                        <div className='buttons'>
                            {isFavorite(movie) && <div className='circle' onClick={() => toggleFavorite(movie)}><MdFavorite></MdFavorite></div>}
                            {!isFavorite(movie) && <div className='circle' onClick={() => toggleFavorite(movie)}><MdFavoriteBorder></MdFavoriteBorder></div>}
                            <div className='trailer'>
                                <span className='play'><BsFillPlayFill></BsFillPlayFill></span>
                                <button className='play-trailer'>Reproducir trailer</button>
                            </div>
                        </div>
                        <h3>Vista General</h3>
                        <p>{movie.overview}</p>

                    </div>

                </div>} */}

                <Row>
                    <Col>
                        <div className='path-image' style={{}}></div>
                    </Col>
                    <Col>
                        <div className='back-image'></div>
                    </Col>

                </Row>

            <h3 className='mt-5 mb-4'>Actores</h3>
            {/* <div className='actors'>
                {movie?.credits?.cast?.map(actor => <div key={actor.id} className='actor'>
                    <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} width={100} height={150} />
                    <p>{actor.name}</p>
                </div>)}
            </div>

            <div className='actors'>
                {movie?.credits?.cast?.map(actor => <CardCredits key={actor.id}></CardCredits>)}
            </div> */}

            {/* <Row xs={2} md={2} lg={4} xl={5} className="g-4">
                {mostPopularMovies && mostPopularMovies.map(movie =>
                    <Col key={movie.id}><Card {...movie}></Card></Col>)}
            </Row> */}

            {/* <Row xs={3} md={4} lg={6} xl={8} className="g-4">
                {(movie?.credits?.cast?.slice(0,12))?.map(actor =>
                    <Col key={actor.id}><CardCredits {...actor}></CardCredits></Col>)}
            </Row> */}

            <Slider {...settings}>
                {(movie?.credits?.cast?.slice(0, 20))?.map(actor => <CardCredits key={actor.id} {...actor}></CardCredits>)}

            </Slider>
            <br></br>
            <br></br>
            <br></br>
            <br></br>



            <h3 className='mt-5 mb-4'>Videos</h3>
            <Row className='videos mb-5'>
                {movie?.videos?.results?.map(video => <Col key={video.id}><div className='video'>
                    <iframe width="300" height="185" src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div></Col>)}
            </Row>


        









        </div>
    )

}

export default MoviesDetails;