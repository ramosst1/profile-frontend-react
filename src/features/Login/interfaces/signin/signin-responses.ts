import { IMessageModel } from "../error-messages-models";
import { ISignInModel } from "./signin-models";
export interface ISigninResponse{
    success: boolean
    messages: IMessageModel[]
    signInUser: ISignInModel
};