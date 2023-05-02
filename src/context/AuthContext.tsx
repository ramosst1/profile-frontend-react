import React, {createContext, useState } from 'react';
import { ISignInModel } from '../features/Login/interfaces/signin/signin-models';

const a: ISignInModel = undefined;

const test = {auth:a, setAuth:undefined}

const AuthContext = createContext({auth:undefined, setAuth:undefined});

export function AuthProvider({children}){


    const[auth, setAuth] = useState<ISignInModel>({
        signInId: 0,
        userName: undefined,
        firstName: undefined,
        lastName: undefined
    });

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;