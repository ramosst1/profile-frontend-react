class StatesServices {

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/states/';

    public async getStates() {
        return await fetch(this.ULR_BASE)
     }
 
}

export default new StatesServices();