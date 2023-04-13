import { IProfileModel } from './profile-models';
import { IErrorMessageModel } from './error-message-model';

export interface IProfileResponse {
    success: boolean;
    messages: IErrorMessageModel[];
    profile: IProfileModel;
};

export interface IProfilesResponse {
    success: boolean;
    messages: IErrorMessageModel[];
    profile: IProfileModel [];
};