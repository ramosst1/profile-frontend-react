import { IProfileCreateModel, IProfileUpdateModel } from "../interfaces/profiles/profile-models";
import http from "../../../util/http";
import { IProfileResponse, IProfilesResponse } from "../interfaces/profiles/profile-responses";

class ProfilesService {

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/profiles/';

    public async getProfiles() {

      return await http.get<IProfilesResponse>(this.ULR_BASE);
    }

    public async getProfile(profileId:number) {
      return await http.get<IProfileResponse>(this.ULR_BASE+profileId);
   }

    public async createProfile(newProfile:IProfileCreateModel) {
      return await http.post<IProfileResponse>(this.ULR_BASE, newProfile);
    }

    public async updateProfile(profile:IProfileUpdateModel){

      return await http.put<IProfileResponse>(this.ULR_BASE,profile);
    }
  
    public async deleteProfile(profileId:number){
      return await http.delete<any>(this.ULR_BASE + profileId)
    }

  }
  
  export default new ProfilesService();