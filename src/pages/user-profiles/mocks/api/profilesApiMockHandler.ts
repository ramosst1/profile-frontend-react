import { profilesGetHandlers } from "./profiles-get-profiles-api-mocks";
import { profilesPutHandlers } from "./profiles-put-profiles-api-mocks";

export const profilesApiMockHandler = [...profilesGetHandlers,...profilesPutHandlers] 
