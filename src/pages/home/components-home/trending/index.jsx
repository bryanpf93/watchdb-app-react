import './styles.css'

function Trending ({ trending }) {
    return (
        <div className="trending">
            <img className='trending-image' src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`} alt={trending.title} />
            <div>
            <h3 className='title-trending'>{trending.title}</h3>
            <h3 className='date'>{trending.release_date}</h3>
            </div>
        </div>
    )
}

export default Trending;