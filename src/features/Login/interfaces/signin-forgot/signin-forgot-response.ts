import { IMessageModel } from "../error-messages-models"

export default interface ISignInForgotResponse {

    success: boolean
    messages: IMessageModel[]
}