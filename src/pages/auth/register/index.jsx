import { useAuth } from "../../../core/auth/auth.hook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles.css';

function Register() {
    const { register, isLoading, isAuth } = useAuth();
    const [showEmailConfirm, updateShowEmail] = useState(false);
    const navigate = useNavigate();
    if (isAuth) navigate("/"); // si entro al registro logado, no me lo debe permitir

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            email: e.target.email.value,
            password: e.target.pass.value,
            age: e.target.age.value
        };
        register(user).then(() => updateShowEmail(true));
    }

    return (
        <>
            {isLoading ? <h1>Loading...</h1> :
                <>  
                    <h3 className="text-formulary mt-5"> Regístrate y disfruta de las ventajas de WATCHDB </h3>
                    {showEmailConfirm ? <h3 className="text-formulary text-primary">Te hemos enviado un email, revisa tu bandeja para validarlo</h3> : ''}
                    <form onSubmit={handleSubmit} className='container text-center formulary'>
                        <h5 className="text-formulary">NOMBRE</h5>
                        <input name="name" type="text" placeholder="Introduzca su nombre"></input>
                        <h5 className="text-formulary">APELLIDOS</h5>
                        <input name="surname" type="text" placeholder="Introduzca su apellido"></input>
                        <h5 className="text-formulary">EMAIL</h5>
                        <input name="email" type="email" placeholder="Introduzca su email"></input>
                        <h5 className="text-formulary">CONTRASEÑA</h5>
                        <input name="pass" type="password" placeholder="introduzca su password"></input>
                        <h5 className="text-formulary">EDAD</h5>
                        <input name="age" type="number" min={18} />
                       
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <input className="me-1" type='checkbox' />
                            <span className="privacity">Acepto las 
                                <a target='blank' href='https://www.freeprivacypolicy.com/live/186315a2-a3bf-4bd6-9984-fce7ee0fdea5'> Condiciones de Servicio y la Politica de Privacidad </a>
                            de WATCHDB </span>
                        </div>

                        <button className='mt-3 mb-4 fs-5' type="submit">Registrarse</button>

                        
                        
                    </form>
                </>
            }
            
        </>

    )
}


export default Register;