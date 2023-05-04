import { useContext, useEffect, useState } from "react";
import { ISignInModel } from "../interfaces/signin/signin-models";
import AuthContext from "../../../context/AuthContext";


export default function useAuthLogin(){

    const LOCAL_STORAGE_USER = 'LOCAL_STORAGE_USER'

    const  {setAuth:setAuthContext} = useContext(AuthContext)

    const [user, setUser] = useState<ISignInModel>()

    useEffect(() =>{

        if(user) {

            if(user?.signInId > 0){

                window.localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))                
                setAuthContext(user);
            }
        }

    }, [user])

    return {user, setUser};
}