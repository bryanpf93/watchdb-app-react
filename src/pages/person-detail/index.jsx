import { useEffect, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import { MdFavorite } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import './styles.css'

function PersonDetail() {

    const { id } = useParams()

    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    const API_KEY = process.env.REACT_APP_API_KEY_MOVIE_DB

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=es-ES`)
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

    console.log(person)

    return (
        <>
            {loading ? <div>Loading...</div> :
                <div className="row p-5 mt-5 bg-danger">
                    <img className='movie-image col-md-3' src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name} width={300} height={450} />
                    <div className="movie-info col-md">
                        <h1>{person.name}</h1>
                        <p>{person.birthday}</p>
                        <p>{person.place_of_birth}</p>
                        <p>{person.biography}</p>
                        </div>
                </div>
                
                
                
                } 

            
        </>
    )
}

export default PersonDetail;