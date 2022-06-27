
/**
 * Esto es un ejemplo de ruta privada. Ejemplo de la docu
 * https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/auth.hook";
import { useUser } from "../../core/users/users.hook";

function User() {
    const { logout } = useAuth();
    const { user, removeUser } = useUser();
    
    console.log(user)
    const handleDelete = async () => {
        await removeUser();
        logout();
        window.location.href = '/auth/login';
    }

    return (
        <div>
            <h1>User</h1>
            <p>{user.email}</p>
            <p>{user.age}</p>
            <p>{user.name}</p>
            <p>{user.surname}</p>
            <button onClick={handleDelete}>DAR DE BAJA</button>
        </div>

    );
}

export default User;