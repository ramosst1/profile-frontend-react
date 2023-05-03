import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";


export default function useLogout(){

    const LOCAL_STORAGE_USER = 'LOCAL_STORAGE_USER'

    const  {auth:authContext, setAuth:setAuthContext} = useContext(AuthContext)

    const [success, setSuccess] = useState(true)
    const [logout, setLogout] = useState(false)

    useEffect(() => {

        if(logout){

            window.localStorage.removeItem(LOCAL_STORAGE_USER);
            setSuccess(true);
            setAuthContext(undefined);
        }

        return (
            setLogout(false)
        )
    },[logout])

    return {success,logout, setLogout}
}