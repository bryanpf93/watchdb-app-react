
/**
 * Esto es un ejemplo de ruta privada. Ejemplo de la docu
 * https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
 */

 import { useUser } from "../../core/users/users.hook";

 function User(){
     const {user} = useUser();
     return (
         <div>
             <h1>User</h1>
             <p>{user[0]?._id}</p>
             <p>{user[0]?.email}</p>
             <p>{user[0]?.age}</p>
         </div>
     );
 }
 
 export default User;