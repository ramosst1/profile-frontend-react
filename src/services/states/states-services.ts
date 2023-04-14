import { IStatesResponse } from "../../interfaces/states/states-responses";
import http  from "../../util/http";

class StatesServices {

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/states/';

    public async getStates() {
        return await http.get<IStatesResponse>(this.ULR_BASE);
     }
 
}

export default new StatesServices();