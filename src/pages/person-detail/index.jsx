import { useEffect, useState } from 'react'
import { BiCameraMovie } from 'react-icons/bi'
import { BsFillImageFill, BsFillPlayFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import Card from '../../components/card'
import CardCredits from '../../components/card-credits'
import CardImages from '../../components/card-images'
import Movies from '../movies'
import './styles.css'

function PersonDetail() {

    const { id } = useParams()

    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=combined_credits,images`)
            .then(res => res.json())
            .then(data => {
                setPerson(data)
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
        autoplay: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 5,
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

    console.log(person?.images?.profiles)

    return (
        <>
            <div className='person-details'>
                {loading ? <div>Loading...</div> :
                    <div>
                        <h3 className='mt-4'>{person.name}</h3>
                        <p className='mb-4'>{person.birthday}</p>
                        <div className='image-biography d-flex gap-3'>
                            <div className='person-image' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${person.profile_path})` }}></div>
                            <div className='person-biography d-flex'>
                                {  person.biography ?
                                   <><h4>BIOGRAFÍA</h4>
                                <p>{person.biography}</p>
                                </> 
                            : <h4>No hay biografía</h4>}
                            </div>
                        </div>
                        <div className='person-credits mt-5'>
                            <h5 className='mb-4 d-flex align-items-center'><BiCameraMovie className='title-icon fs-3'></BiCameraMovie> CONOCID@ POR </h5>

                            <Slider {...settings}>
                                {(person?.combined_credits?.cast?.slice(0,15))?.map(credit => <CardCredits key={credit.id} {...credit}></CardCredits>)}

                            </Slider>

                        </div>

                        <div className='person-images mt-4 mb-5'>
                            <h5 className='mb-4 d-flex align-items-center'> <BsFillImageFill className='title-icon'></BsFillImageFill> IMÁGENES</h5>
                            <Slider {...settings}>
                                {(person?.images?.profiles?.slice(0,15))?.map(image => <CardImages key={image.vote_average} {...image}></CardImages>)}
                            </Slider>
                        </div>
                    </div>
                }

                    </div>


        </>
            )
}

            export default PersonDetail;