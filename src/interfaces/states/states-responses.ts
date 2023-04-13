import { IStateModel } from "./states-model";
import { IErrorMessageModel } from "./error-message-model";

export interface IStatesResponse {
    success:Boolean;
    states: IStateModel[];
    messages: IErrorMessageModel[];
}