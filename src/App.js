import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/auth/register';
import Validate from './pages/auth/validate';
import Login from './pages/auth/login';
import RequireAuth from './core/auth/auth.component';
import User from './pages/user';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import Movies from './pages/movies';
import Series from './pages/series';
import { useContext } from 'react';
import { ThemeContext } from './contexts/theme.context';
import MoviesDetails from './pages/movies-details';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UpComing from './pages/upcoming';
import PersonDetail from './pages/person-detail';


function App() {
  const [theme] = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <Header></Header>

        <div className='container'>
          <Routes>
            <Route path="/" element={<Home></Home>} /> {/* /*/}
            <Route path='/movies' element={<Movies></Movies>}></Route>
            <Route path='/movies/:id' element={<MoviesDetails></MoviesDetails>}></Route>
            <Route path='/upcoming' element={<UpComing></UpComing>}></Route>
            <Route path='/series' element={<Series></Series>}></Route>
            <Route path='/person/:id' element={<PersonDetail></PersonDetail>}></Route>
            <Route path='/validate' element={<Validate />}></Route>
            <Route path='/user' element={<RequireAuth><User /></RequireAuth>}></Route>
            <Route path='/auth'>
              <Route path='register' element={<Register />}></Route>
              <Route path='login' element={<Login />}></Route>
            </Route>
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>

  );


}

export default App;
