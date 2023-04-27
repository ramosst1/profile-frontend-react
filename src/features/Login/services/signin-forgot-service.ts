import httpAdapter from "../../../util/httpAdapter";
import { ISigninRequest } from "../interfaces/signin/signin-requests";
import { ISigninResponse } from "../interfaces/signin/signin-responses";

class SignInForgotService{

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/forgotsignin/';

    public async signInForgotAsync(signupRequest: ISigninRequest) {
      return await httpAdapter.post<ISigninResponse>(this.ULR_BASE, signupRequest);
    }
}

export default new SignInForgotService();


