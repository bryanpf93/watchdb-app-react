import './styles.css';
import { Link } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';


function Header() {
    return (
        <header className='header_container'>
            <h1><Link className='nav-container' to='/'>WATCHDB</Link></h1>
            <nav className='peliculas-series'>
              <h4><Link className='nav-container' to="/peliculas">PELICULAS</Link></h4>
               <h4><Link className='nav-container' to="/series">SERIES</Link></h4> 
            </nav>
            <select name='select'>
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
            <Container>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                ></Form.Check>
            </Form>
            </Container>

            <input type="text" placeholder='Introduce el nombre'/>
            <nav className='register-login'>
               <h4><Link className='nav-container' to="/auth/register">REGISTRARSE</Link></h4> 
                <h4><Link className='nav-container' to="/auth/login">ACCEDER</Link></h4>
            </nav>
        </header>
    )
}

export default Header;