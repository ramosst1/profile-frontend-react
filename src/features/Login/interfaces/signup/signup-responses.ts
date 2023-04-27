import { IMessageModel } from "../error-messages-models";
import { ISignUpModel } from "./signup-models"

export interface ISignupResponse{
    success: boolean
    messages: IMessageModel[];
    signup: ISignUpModel;
};