import './styles.css';

function TvPopular ({ popularTV }) {

    return (
        <div className="most-popular">
            <img className='popular-image' src={`https://image.tmdb.org/t/p/w500/${popularTV.poster_path}`} alt={popularTV.title} />
            <div>
            <h3 className='title-popular'>{popularTV.name}</h3>
            <h3 className='date'>{popularTV.first_air_date}</h3>
            </div>
        </div>
    )
}
export default TvPopular;