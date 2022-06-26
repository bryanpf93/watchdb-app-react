import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiTrendingUp } from 'react-icons/hi';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import CardCredits from '../../components/card-credits';
import { useUser } from '../../core/users/users.hook';
import './styles.css';

function SeriesDetails() {

    const { id } = useParams();
    const [serie, setSerie] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { isFavorite, toggleFavorite } = useUser();

    const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=credits,videos`)
            .then(res => res.json())
            .then(data => {
                setSerie(data)
                setLoading(false)
            }
            )
            .catch(err => {
                setError(true)
                setLoading(false)
            }
            )
    }, [id])

    console.log(serie)

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

        <div>
            {loading ? <div>Loading...</div>
                :
                <div className='movie-details'>
                    <h3 className='mt-4 fw-bold'>{serie.name}</h3>
                    <p className='mb-4'>{serie.first_air_date}</p>
                    <div className='d-flex gap-2 mb-3 image-backdrop'>
                        <div className='movie-image' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${serie.poster_path})` }}>
                            <div className='buttons mb-4'>
                                {isFavorite(serie) && <div className='circle' onClick={() => toggleFavorite(serie)}><MdFavorite></MdFavorite></div>}
                                {!isFavorite(serie) && <div className='circle' onClick={() => toggleFavorite(serie)}><MdFavoriteBorder></MdFavoriteBorder></div>}
                                <div className='circle'><BsFillPlayFill></BsFillPlayFill></div>

                            </div>
                        </div>
                        <div className='movie-backdrop' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${serie.backdrop_path})` }}  ></div>
                    </div>
                    <div className="movie-info">
                        <h5 className='fw-bold mt-4 mb-4'>Vista General</h5>
                        <div className='genres mb-4'>{serie.genres.map(genre => <div key={genre.name} genre={genre} className='genre'>{genre.name}</div>)}</div>
                        <p>{serie.overview}</p>
                    </div>

                </div>}

            <h5 className='mt-5 mb-4 fw-bold'>Actores</h5>

            <Slider {...settings}>
                {(serie?.credits?.cast?.slice(0, 10))?.map(actor => <CardCredits key={actor.id} {...actor}></CardCredits>)}
            </Slider>


            <h5 className='mt-5 mb-4 fw-bold'>Videos</h5>
            <Row className='videos mb-5'>
                {serie?.videos?.results?.map(video => <Col key={video.id}><div className='video'>
                    <iframe width="300" height="185" src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div></Col>)}
            </Row>



        </div>



    )

}

export default SeriesDetails;