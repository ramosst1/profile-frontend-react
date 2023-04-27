import { IMessageModel } from "../error-messages-models";
import { ISignUpModel } from "./signup-models"

export interface ISignUpResponse{
    success: boolean
    messages: IMessageModel[];
    signupUser: ISignUpModel;
};