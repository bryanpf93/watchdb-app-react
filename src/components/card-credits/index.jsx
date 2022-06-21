import { Link } from 'react-router-dom';
import './styles.css'

function CardCredits(actor) {
    return (
        <>
            <div className='credits'>
                <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} width={135} height={180} />
                <p>{actor.name}</p>
            </div>

            {/* <Link className="credit" to={'/'}>
                <div
                    className='credit-image'
                    style={{ backgroundImage: `url(${actor.profile_path})` }}
                ></div>
                <div className='credit-body'>
                    <h3 className='credit-title'>{actor.name}</h3>
                </div>
            </Link> */}

        </>
    )
}

export default CardCredits;