import { IMessageModel } from "./error-message-model";

export interface IApiResponse {
    success: boolean;
    messages: IMessageModel[];
};