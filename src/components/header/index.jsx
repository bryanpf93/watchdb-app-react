import './styles.css';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme.context';
import { FcSearch } from 'react-icons/fc';
import { useAuth } from '../../core/auth/auth.hook';
import { BsFillSunFill, BsSun } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { MdDarkMode } from 'react-icons/md';



function Header() {
  const { isAuth } = useAuth();
  const [theme, setTheme] = useContext(ThemeContext);
  const { t, i18n } = useTranslation('global');


  const handleChange = (e) => {
    const checked = e.target.checked;
    const theme = checked ? 'dark' : 'light';
    setTheme(theme);
  }

  return (
    <>
      <header className='header-container'>
          <div className='container d-flex p-0'>
          <div className='nav'>
            <h1><Link className='logo' to='/'>WATCHDB</Link></h1>
          </div>
          <div className='nav-toggle'>
            <div>
              <button className='button' onClick={() => i18n.changeLanguage('es')} >ES</button>
              <button className='button' onClick={() => i18n.changeLanguage('en')}>EN</button>
            </div>
            <div className='theme'>
              {/* <nav className='me-2 mb-1 sun'><BsFillSunFill></BsFillSunFill></nav> */}
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  onChange={handleChange}
                  checked={theme === 'dark'}
                />
              </Form>
              {/* <nav className='mb-1 moon'><MdDarkMode></MdDarkMode></nav> */}
            </div>
            <Link to={'/search'}>
              <InputGroup className="d-flex ">
                <InputGroup.Text  id="basic-addon1"><FcSearch></FcSearch></InputGroup.Text>
              </InputGroup>
            </Link>
            {isAuth
              ? <h5>H</h5>
              : (
                <>
                  <nav className='register-login'>
                    <h4><Link className='header-text' to="/auth/register">{t('header.REGISTER')}</Link></h4>
                    <h4><Link className='header-text' to="/auth/login">{t('header.LOGIN')}</Link></h4>
                  </nav>
                </>
              )
            }
            </div>

            
          </div>

        
      </header>
      {/* <header className='header-container'>
      <Navbar bg="danger" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="fs-1 fw-bold">WATCHDB</Navbar.Brand>
          <ButtonGroup className="me-2" aria-label="First group">
                <Button onClick={() => i18n.changeLanguage('es')}>ES</Button>
                <Button onClick={() => i18n.changeLanguage('en')}>EN</Button>
              </ButtonGroup>
              <Form className='d-flex align-items-center'>
                <nav className='me-2'><BsSun></BsSun></nav>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  onChange={handleChange} 
                  checked={theme==='dark'}
                />
                <nav><BiMoon></BiMoon></nav>
              </Form>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end' >
            <Nav className="me-auto">
              
              <InputGroup className="d-flex ">
                <InputGroup.Text id="basic-addon1"><FcSearch></FcSearch></InputGroup.Text>
                <FormControl
                  placeholder={t('header.SEARCH_LABEL')}
                  aria-label={t('header.SEARCH_LABEL')}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              { isAuth
                ? <h5>Hola</h5>
                : (
                  <>
                    <Nav.Link href="/auth/register" className='d-flex align-items-center register-login'>{t('header.REGISTER')}</Nav.Link>
                    <Nav.Link href="/auth/login" className='d-flex align-items-center register-login'>{t('header.LOGIN')}</Nav.Link>
                  </>
                  )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header> */}
    </>
  )
}

export default Header;