import httpAdapter from "../../../util/httpAdapter";
import { ISigninRequest } from "../interfaces/signin/signin-requests";
import { ISigninResponse } from "../interfaces/signin/signin-responses";

class SignInService{

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/signin/';

    public async signInAsync(signupRequest: ISigninRequest) {
      return await httpAdapter.post<ISigninResponse>(this.ULR_BASE, signupRequest);
    }
}

export default new SignInService();


