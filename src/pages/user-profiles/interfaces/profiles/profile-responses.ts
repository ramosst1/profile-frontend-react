import { IProfileModel } from './profile-models';
import { IMessageModel } from './error-message-model';

export interface IProfileResponse {
    success: boolean;
    messages: IMessageModel[];
    profile: IProfileModel;
};

export interface IProfilesResponse {
    success: boolean;
    messages: IMessageModel[];
    profiles: IProfileModel [];
};