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


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} /> {/* /*/}
        <Route path='/validate' element={<Validate/>}></Route>
        <Route path='/user' element={ <RequireAuth><User/></RequireAuth>}></Route>
        <Route path='/auth'>
          <Route path='register' element={<Register/>}></Route>
          <Route path='login' element={<Login/>}></Route>
        </Route>
      </Routes>
      <footer>
        <p>Esto es el footer</p>
      </footer>
  </BrowserRouter>

  );


}

export default App;
