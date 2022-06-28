import { Link } from 'react-router-dom';
import './styles.css'

function CardCredits (credit) {
    return(
        <>
            <Link className='credit' to={`${credit.media_type === 'movie'? `/movies/${credit.id}`:`/tv/${credit.id}`}`}>
                
                <div
                    className='credit-image'
                    style={{ backgroundImage: `${credit.poster_path
                    ?`url(https://image.tmdb.org/t/p/w500/${credit.poster_path})`
                    :'url(https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-sin-imagen-en-miniatura-marcador-de-posici%C3%B3n-para-foros-blogs-y-sitios-web.jpg)'}` }}
                ></div>
                <div className='credit-body'>
                    <h5 className='credit-title'>{credit.title || credit.name}</h5>
                    <h6 className='credit-character'>{credit.character}</h6>
                  </div>  
                  
            </Link>
        
        </>
    )
}

export default CardCredits;