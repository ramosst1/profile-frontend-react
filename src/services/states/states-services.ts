import { IStatesResponse } from "../../interfaces/states/states-responses";
import httpAdapter  from "../../util/httpAdapter";

class StatesServices {

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/states/';

    public async getStatesAsync() {
        return await httpAdapter.get<IStatesResponse>(this.ULR_BASE);
     }
 
}

export default new StatesServices();