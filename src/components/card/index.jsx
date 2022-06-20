import { Link } from 'react-router-dom';
import './styles.css';

function Card({ title, date, image, to }) {
    return (
        <Link className="card" to={to}>
            <div
                className='card-image'
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <h3 className='card-date'>{date}</h3>
            </div>
        </Link>
    )
}

export default Card;