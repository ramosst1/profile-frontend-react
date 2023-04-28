import { IMessageModel } from "../error-messages-models";
import { ISignInModel } from "./signin-models";

export interface ISignInResponse{
    success: boolean
    messages: IMessageModel[]
    signInUser: ISignInModel
};