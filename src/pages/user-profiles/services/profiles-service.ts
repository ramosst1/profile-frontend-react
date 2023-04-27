import { IProfileCreateModel, IProfileUpdateModel } from "../interfaces/profiles/profile-models";
import httpAdapter from "../../../util/httpAdapter";
import {IProfileResponse, IProfilesResponse } from "../interfaces/profiles/profile-responses";
import { IApiResponse } from "../interfaces/profiles/api-response";

class ProfilesService {

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/profiles/';

    public async getProfilesAsync() {

      return await httpAdapter.get<IProfilesResponse>(this.ULR_BASE);
    }

    public async getProfileAsync(profileId:number) {
      return await httpAdapter.get<IProfileResponse>(this.ULR_BASE+profileId);
   }

    public async createProfileAsync(newProfile:IProfileCreateModel) {
      return await httpAdapter.post<IProfileResponse>(this.ULR_BASE, newProfile);
    }

    public async updateProfileAsync(profile:IProfileUpdateModel){

      return await httpAdapter.put<IProfileResponse>(this.ULR_BASE,profile);
    }
  
    public async deleteProfileAsync(profileId:number){
      return await httpAdapter.delete<IApiResponse>(this.ULR_BASE + profileId)
    }

  }
  
  export default new ProfilesService();