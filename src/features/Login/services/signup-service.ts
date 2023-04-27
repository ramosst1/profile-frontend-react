import httpAdapter from "../../../util/httpAdapter";
import { ISignUpRequest } from "../interfaces/signup/signup-requests";
import { ISignUpResponse } from "../interfaces/signup/signup-responses";

class SignUpService{

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/signup/';

    public async SignUpAsync(signupRequest: ISignUpRequest) {
      return await httpAdapter.post<ISignUpResponse>(this.ULR_BASE, signupRequest);
    }

}
export default new SignUpService();


