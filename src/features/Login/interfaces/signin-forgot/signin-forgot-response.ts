import { IMessageModel } from "../error-messages-models"
import ISignInForgotModel from "./signin-forgot-models"

export default interface ISignInForgotResponse {

    success: boolean
    messages: IMessageModel[]
    // signInUser: IForgotPasswordModel

}