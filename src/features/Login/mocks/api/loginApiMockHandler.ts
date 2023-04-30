import { signupUserhandlers } from "./signup-api-mocks";
import { signinUserhandlers } from "./signin-api-mocks";
import { signinForgotUserhandlers } from "./signin-forgot-api-mocks";

export const loginApiMockHandler = [
  ...signinUserhandlers,
  ...signupUserhandlers,
  ...signinForgotUserhandlers
]; 