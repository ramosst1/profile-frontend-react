import { loginApiMockHandler } from "../../features/Login/mocks/api/loginApiMockHandler"
import { profilesApiMockHandler } from "../../pages/user-profiles/mocks/api/profiles-api-mock-handler"
import { statesGetApiMockHandlers } from "./states/states-get-api-mocks"


export const handler =  [
  ...statesGetApiMockHandlers,
  ...loginApiMockHandler,
  ...profilesApiMockHandler
];