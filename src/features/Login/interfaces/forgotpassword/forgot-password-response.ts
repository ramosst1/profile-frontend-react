import { IMessageModel } from "../error-messages-models"
import IForgotPasswordModel from "./forgot-password-models"

export default interface IForgotPasswordResponse {

    success: boolean
    messages: IMessageModel[]
    // signInUser: IForgotPasswordModel

}