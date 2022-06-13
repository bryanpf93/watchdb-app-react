import './styles.css';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';


function Header() {
    return (
        <header className='header_container'>
            <h1><Link className='nav-container' to='/'>WATCHDB</Link></h1>
            <nav>
                <Link className='nav-container' to="/peliculas">PELICULAS</Link>
                <Link className='nav-container' to="/series">SERIES</Link>
            </nav>
            <select name='select'>
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                />
            </Form>

            <input type="text" placeholder='Introduce el nombre'/>
            <nav>
                <Link className='nav-container' to="/auth/register">REGISTER</Link>
                <Link className='nav-container' to="/auth/login">LOGIN</Link>
            </nav>
        </header>
    )
}

export default Header;