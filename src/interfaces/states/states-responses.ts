import { IStateModel } from "./states-model";
import { IMessageModel } from "./error-message-model";

export interface IStatesResponse {
    success:Boolean;
    states: IStateModel[];
    messages: IMessageModel[];
}