import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import {MdOutlineFavorite}  from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai';

function Card({ title, date, image, to, favorite, onFavorite }) {
    const handleFavoriteClick = (event) => {
        event.stopPropagation();
        if (onFavorite) {
            onFavorite();
        }
    };

    return (
        <div className="card">
            <Link to={to}
                className='card-image'
                style={{ backgroundImage: `url(${image?image:'https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-sin-imagen-en-miniatura-marcador-de-posici%C3%B3n-para-foros-blogs-y-sitios-web.jpg'})` }}
            ></Link>
            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>
                <h3 className='card-date'>{date}</h3>
            </div>
            <button className='favorite' onClick={handleFavoriteClick}>{favorite ? <AiOutlineClose></AiOutlineClose> : <MdOutlineFavorite></MdOutlineFavorite>}</button>
        </div>
    )
}

export default Card;