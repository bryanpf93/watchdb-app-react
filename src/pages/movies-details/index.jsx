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
import {IoIosPerson} from 'react-icons/io'
import {BsFillCameraVideoFill} from 'react-icons/bs'

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

    console.log(movie)

    var settings = {
        dots: true,
        infinite: true,
        autoplay: false,
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
        <div className='movie-details'>
            {loading ? <div>Loading...</div>
                :

                <div>
                    <h3 className='mt-4 fw-bold'>{movie.title}</h3>
                    <p className='mb-4'>{movie.release_date} - {movie.runtime} minutos</p>
                    <div className='d-flex gap-2 mb-3 image-backdrop'>
                        <div className='movie-image' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}>
                            <div className='buttons mb-4'>
                                {isFavorite(movie) && <div className='circle' onClick={() => toggleFavorite(movie)}><MdFavorite></MdFavorite></div>}
                                {!isFavorite(movie) && <div className='circle' onClick={() => toggleFavorite(movie)}><MdFavoriteBorder></MdFavoriteBorder></div>}
                                <div className='circle'><BsFillPlayFill></BsFillPlayFill></div>
                                
                            </div>
                        </div>
                        <div className='movie-backdrop' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})` }}  ></div>
                    </div>
                    {/* <img className='movie-image col-md-3' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width={300} height={450} /> */}
                    <div className="movie-info">
                        <h3 className='fw-bold mt-4 mb-4'>Vista General</h3>
                        <div className='genres mb-4'>{movie.genres.map(genre => <div key={genre.name} genre={genre} className='genre'>{genre.name}</div>)}</div>
                        <p>{movie.overview}</p>

                    </div>

                </div>}



            <h5 className='mt-5 mb-5 fw-bold d-flex align-items-center'><IoIosPerson className='title-icon'></IoIosPerson>Actores</h5>

            <Slider {...settings}>
                {(movie?.credits?.cast?.slice(0, 20))?.map(actor => <CardCredits key={actor.id} {...actor}></CardCredits>)}

            </Slider>
            

            <h5 className='mt-5 mb-4 fw-bold d-flex align-items-center'><BsFillCameraVideoFill className='title-icon'></BsFillCameraVideoFill>Videos</h5>
            <Row className='videos mt-5 mb-5'>
                {movie?.videos?.results?.map(video => <Col key={video.id}><div className='video'>
                    <iframe width="300" height="185" src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div></Col>)}
            </Row>

            
        </div>
    )

}

export default MoviesDetails;