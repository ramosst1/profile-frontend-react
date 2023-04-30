import { loginApiMockHandler } from "../../features/Login/mocks/api/loginApiMockHandler"
import { profilesApiMockHandler } from "../../pages/user-profiles/mocks/api/profilesApiMockHandler"
import { statesGetApiMockHandlers } from "./states/states-get-api-mocks"


export const handler = [ 
  loginApiMockHandler[0],
  loginApiMockHandler[1],
  loginApiMockHandler[2],
  profilesApiMockHandler[0],
  profilesApiMockHandler[1],
  profilesApiMockHandler[2],
  statesGetApiMockHandlers[0]
]