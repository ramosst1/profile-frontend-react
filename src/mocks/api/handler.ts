import { loginApiMockHandler } from "../../features/Login/mocks/api/loginApiMockHandler"
import { profilesApiMockHandler } from "../../pages/user-profiles/mocks/api/profilesApiMockHandler"
import { statesGetApiMockHandlers } from "./states/states-get-api-mocks"


export const handler =  [
  ...statesGetApiMockHandlers,
  ...loginApiMockHandler,
  ...profilesApiMockHandler
];