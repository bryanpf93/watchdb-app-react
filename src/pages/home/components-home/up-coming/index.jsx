import './styles.css'

function UpComing({ upcoming }) {
    return (
        <div className="up-coming-container">
            <img className='up-coming-image' src={`https://image.tmdb.org/t/p/w500${upcoming.poster_path}`} alt="" />
            <div>
            <h3>{upcoming.title}</h3>
            <h3 className='date'>{upcoming.release_date}</h3>
            </div>
            
        </div>
    )
}

export default UpComing;