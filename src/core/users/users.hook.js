import { useEffect, useState } from "react"
import { useAuth } from "../auth/auth.hook";
import { getUserInfo } from "./users.api"




export const useUser = () => {
    const {isAuth} = useAuth();
    const [user, updateUser] = useState({});


    useEffect(() => {
        if (useAuth) {
            getUserInfo()
            .then(updateUser)
        }
    },[isAuth]);

    console.log(user)

    return {
        user
    }
}