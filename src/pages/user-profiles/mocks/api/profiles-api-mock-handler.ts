import { profilesGetHandlers } from "./profiles-get-profiles-api-mocks";
import { profilesPutHandlers } from "./profiles-put-profiles-api-mocks";
import { profilesPostHandlers } from './profiles-post-profiles-api-mocks';
import { profilesDeleteHandlers } from "./profiles-delete-profiles-api-mocks";

export const profilesApiMockHandler = [
    ...profilesGetHandlers,
    ...profilesPutHandlers,
    ...profilesPostHandlers,
    ...profilesDeleteHandlers
    ] 
