import httpAdapter from "../../../util/httpAdapter";
import { ISignupRequest } from "../interfaces/signup/signup-requests";
import { ISignupResponse } from "../interfaces/signup/signup-responses";

class SignupService{

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/signup/';

    public async signUpAsync(signupRequest: ISignupRequest) {
      return await httpAdapter.post<ISignupResponse>(this.ULR_BASE, signupRequest);
    }

}
export default new SignupService();


