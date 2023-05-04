import { useContext, useEffect, useState } from "react";
import { ISignInModel } from "../interfaces/signin/signin-models";
import AuthContext from "../../../context/AuthContext";

export default function useAuthUser(){

    const LOCAL_STORAGE_USER = 'LOCAL_STORAGE_USER'

    const {auth:authContext, setAuth:setAuthContext} = useContext(AuthContext)

    const [user, setUser] = useState<ISignInModel>();

    useEffect(() => {

        const localSignInModel = window.localStorage.getItem(LOCAL_STORAGE_USER);

        if(localSignInModel === null) {

            if(authContext?.signInId !== 0){
                window.localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(authContext))      
                setUser(authContext);
            };
        };

        if(localSignInModel !== 'undefined') {
           const aItem: ISignInModel =  JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_USER))
           setUser(aItem);
        };

    },[])

    useEffect(() => {
        if(authContext?.signInId !== 0){
            setUser(authContext);
        }
    }, [authContext])
    
    return {user}
} 