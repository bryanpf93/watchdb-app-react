import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Card from '../../components/card';
import { Col, Row } from 'react-bootstrap';
import { mapperMedia } from '../../core/media/media.utils';
import { t } from 'i18next';
import {BiSearchAlt2} from 'react-icons/bi';

function SearchAll() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        setLoading(true);
        setError(false);

        if (search) {
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY_MOVIE_DB}&language=es-ES&query=${search}`)
                .then(res => res.json())
                .then(data => {
                    setMovies(data.results);
                    setLoading(false);
                }
                )
                .catch(err => {
                    setError(true);
                    setLoading(false);
                }
                )
        }

    }, [search]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const val = await e.target.value.toLowerCase();
        setSearch(val);
    }

    return (
        <div className='search-all'>
            <div className='search-all-header'>
                <div className="title-home mt-5">
                <span className="title-icon">{<BiSearchAlt2></BiSearchAlt2>}</span>
                <span className="title title-link">BUSCAR</span>
            </div>
                <div className='search-all-header-search'>
                    <input type='text' placeholder='Buscar...' onChange={handleSearch} />
                </div>
            </div>
            <div className='search-all-content'>
                {loading ? ''
                    :
                    <div>
                        {error ? <div>Error</div>
                            :
                            <div>
                                <div className='d-flex flex-wrap gap-3'>
                                    {/* {movies?.map(movie => (
                                        <Link to={`/tv/${movie.id}`} key={movie.id} className='title fs'>
                                            <div className='search-media'>
                                                <div className='search-image' style={{
                                                    backgroundImage: `${movie.poster_path
                                                        ? `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
                                                        : 'url(https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-sin-imagen-en-miniatura-marcador-de-posici%C3%B3n-para-foros-blogs-y-sitios-web.jpg)'}`
                                                }}>
                                                </div>
                                                <div>
                                                    <h1>{movie.title || movie.name}</h1>
                                                    <p>{movie.release_date}</p>

                                                </div>
                                            </div>
                                        </Link>
                                    ))} */}
                                </div>
                                <Row xs={2} md={3} lg={4} xl={5} className="g-4">
                                    {movies && movies?.map(tv =>
                                        <Col key={tv.id}><Card  {...mapperMedia(tv)}></Card></Col>)}
                                </Row>
                            </div>
                        }
                    </div>

                }
            </div>
        </div>
    )
}

export default SearchAll;