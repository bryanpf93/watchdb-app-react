import './styles.css';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme.context';
import { FcSearch } from 'react-icons/fc';



function Header() {

  const [theme, setTheme] = useContext(ThemeContext);
  const { t, i18n } = useTranslation('global');


  console.log(setTheme);
  const handleChange = (e) => {
    const checked = e.target.checked;
    const theme = checked ? 'dark' : 'light';
    setTheme(theme);
  }

  return (
    <>
      {/* <header className='header_container'>
      <div className='logo'>
        <h1><Link className='nav-container' to='/'>WATCHDB</Link></h1>
      </div>
      <nav className='peliculas-series'>
        <h4><Link className='nav-container' to="/movies">{t('header.MOVIES')}</Link></h4>
        <h4><Link className='nav-container' to="/series">{t('header.TVSHOWS')}</Link></h4>
      </nav>
      <div>
        <button onClick={() => i18n.changeLanguage('es')} >ES</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>
      <div>
        <label className='switch'>
          <input  type="checkbox" onChange={handleChange} checked={theme==='dark'}></input>
          <span className='slider round'></span>
        </label>
      </div>
      <input type="text" placeholder={t('header.SEARCH_LABEL')} />
      <nav className='register-login'>
        <h4><Link className='nav-container' to="/auth/register">{t('header.REGISTER')}</Link></h4>
        <h4><Link className='nav-container' to="/auth/login">{t('header.LOGIN')}</Link></h4>
      </nav>
    </header> */}
    <header className='header-container'>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="fs-1">WATCHDB</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav" class='justify-content-end' >
            <Nav className="me-auto">
              <ButtonGroup className="me-2" aria-label="First group">
                <Button onClick={() => i18n.changeLanguage('es')}>ES</Button>
                <Button onClick={() => i18n.changeLanguage('en')}>EN</Button>
              </ButtonGroup>
              <Form className='d-flex align-items-center'>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  onChange={handleChange} 
                  checked={theme==='dark'}
                />
              </Form>
              <InputGroup className="d-flex ">
                <InputGroup.Text id="basic-addon1"><FcSearch></FcSearch></InputGroup.Text>
                <FormControl
                  placeholder={t('header.SEARCH_LABEL')}
                  aria-label={t('header.SEARCH_LABEL')}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Nav.Link href="/auth/register" className='d-flex align-items-center'>{t('header.REGISTER')}</Nav.Link>
              <Nav.Link href="/auth/login" className='d-flex align-items-center'>{t('header.LOGIN')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    </>
  )
}

export default Header;