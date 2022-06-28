
/**
 * Esto es un ejemplo de ruta privada. Ejemplo de la docu
 * https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
 */

import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/auth.hook";
import { useUser } from "../../core/users/users.hook";
import './styles.css';

function User() {
    const { logout } = useAuth();
    const { user, removeUser } = useUser();
    
    console.log(user)
    const handleDelete = async () => {
        await removeUser();
        logout();
    }

    return (
        <div className="formulary ">
            <p className="text-formulary user-icon"><FaUserCircle></FaUserCircle></p>
            <h5 className="text-formulary">USER</h5>
            <h6  className="text-formulary user-date">{user.email}</h6>
            <h5 className="text-formulary">EDAD</h5>
            <h6 className="text-formulary user-date">{user.age}</h6>
            <h5 className="text-formulary">NOMBRE</h5>
            <p className="text-formulary user-date">{user.name}</p>
            <h5  className="text-formulary">APELLIDOS</h5>
            <p  className="text-formulary user-date">{user.surname}</p>
            <div className="d-flex justify-content-end">
            <button  onClick={handleDelete}>DAR DE BAJA</button>
            </div>
        </div>

    );
}

export default User;