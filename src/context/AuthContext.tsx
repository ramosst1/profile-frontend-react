import React, {createContext, useState } from 'react';
import { ISignInModel } from '../features/Login/interfaces/signin/signin-models';

interface IUser {
    auth: ISignInModel,
    setAuth: React.Dispatch<React.SetStateAction<ISignInModel>>
};

const AuthContext = createContext<IUser>({auth:undefined, setAuth:undefined});

export function AuthProvider({children}){

    const[auth, setAuth] = useState<ISignInModel>({
        signInId: 0,
        userName: undefined,
        firstName: undefined,
        lastName: undefined
    });

    const providerValue: IUser = {
        auth: auth,
        setAuth: setAuth
    }

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;