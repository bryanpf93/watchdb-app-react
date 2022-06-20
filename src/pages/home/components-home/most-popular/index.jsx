import { Carousel } from 'react-bootstrap';
import './styles.css';

function MostPopular ({ popular, navigate }) {
    return (
        <div className="most-popular" onClick={() => navigate(`/movies/${popular.id}`)}>
            <img className='popular-image' src={`https://image.tmdb.org/t/p/w500/${popular.poster_path}`} alt={popular.title} />
            <div>
            <h3 className='title-popular'>{popular.title}</h3>
            <h3 className='date'>{popular.release_date}</h3>
            </div>
        </div>
    )
}
export default MostPopular;