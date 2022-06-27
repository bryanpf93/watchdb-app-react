import { useAuth } from "../../../core/auth/auth.hook";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import './styles.css';

function Validate() {
    const { isLoading, isAuth, validate } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    if (isAuth) navigate("/"); // si entro al registro logado, no me lo debe permitir
    useEffect(() => {
        validate(searchParams.get('token'));
    }, [searchParams]);
    return (
        <>
            {
                isLoading
                    ? <h3 className="text-formulary">Validando su email...</h3>
                    : (
                        <>
                            <h3 className="text-formulary text-primary fs-3">Su email se ha validado con éxito. Ya puedes hacer login</h3>
                            <div className="validate-image"></div>
                            <Link to={'/auth/login'}>Ir a Login</Link>
                        </>
                    )
            }
        </>
    )
}



export default Validate;