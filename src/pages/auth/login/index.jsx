import { useAuth } from "../../../core/auth/auth.hook";
import './styles.css';


function Login() {
    // missing is Loading
    const { isAuth, login } = useAuth();
    if (isAuth) window.location.href = "/"; // si entro al registro logado, no me lo debe permitir
    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            password: e.target.pass.value
        };
        login(user)
            .then(() => window.location = "/"); // despues de logarme tengo que navegar
    }
    return (
        <>
            <form onSubmit={handleLogin} className='container text-center formulary'>
                <h5 className="text-formulary">EMAIL</h5>
                <input name="email" type="email" placeholder="Email"></input>
                <h5 className="text-formulary">CONTRASEÑA</h5>
                <input name="pass" type="password" placeholder="Pass"></input>
                <br></br>
                <button className="mt-4 mb-4 fs-5" type="submit">Log In</button>
            </form>
        </>
    )
}


export default Login;