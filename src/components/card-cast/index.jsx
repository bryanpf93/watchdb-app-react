import { Link } from 'react-router-dom';
import './styles.css'

function CardCast(actor) {
    return (
        <>  
            {/* <Link to={`/person/${actor.id}`}>
            <div className='credits'>
                <img src={actor.profile_path?`https://image.tmdb.org/t/p/w500/${actor.profile_path}`:'https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-sin-imagen-en-miniatura-marcador-de-posici%C3%B3n-para-foros-blogs-y-sitios-web.jpg'} alt={actor.name} width={135} height={180} />
                <p>{actor.name}</p>
            </div>
            </Link> */}

            <Link  className="casts title-link d-flex flex-column align-items-center" to={`/person/${actor.id}`}>
                <div
                    className='cast-image'
                    style={{ backgroundImage: `${actor.profile_path
                    ?`url(https://image.tmdb.org/t/p/w500/${actor.profile_path})`
                    :'url(https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-sin-imagen-en-miniatura-marcador-de-posici%C3%B3n-para-foros-blogs-y-sitios-web.jpg)'}` }}
                ></div>
                <div className='cast-body'>
                    <h5 className='cast-title'>{actor.name}</h5>
                </div>
            </Link>

        </>
    )
}

export default CardCast;