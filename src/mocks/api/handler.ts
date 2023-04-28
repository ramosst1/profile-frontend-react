import { signupUserhandlers } from "./signin-and-signout/signup-api-mocks";
import { signinUserhandlers } from './signin-and-signout/signin-api-mocks';
import { signinForgotUserhandlers } from "./signin-and-signout/signin-forgot-api-mocks";

export const handler = [  
  signinUserhandlers[0], 
  signupUserhandlers[0],
  signinForgotUserhandlers[0]
]
