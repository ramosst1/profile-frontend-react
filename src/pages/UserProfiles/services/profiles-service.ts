import { IProfileCreateModel, IProfileUpdateModel } from "../interfaces/profiles/profile-models";

class ProfilesService {

    private readonly ULR_BASE: string = 'http://localhost:54969/api/v1/profiles/';

    public async getProfiles() {
       return await fetch(this.ULR_BASE)
    }

    public async getProfile(profileId:number) {
      return await fetch(this.ULR_BASE+profileId)
   }

    public async createProfile(newProfile:IProfileCreateModel) {
      return fetch(this.ULR_BASE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify(newProfile)
      });
    }

    public async updateProfile(profile:IProfileUpdateModel){
      return fetch(this.ULR_BASE, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify(profile)
      });

    }
  
    public async deleteProfile(profileId:number){
      return await fetch(
        this.ULR_BASE + profileId,
        {
          method: "delete"
        }
      )
    }

  }

  
  export default new ProfilesService();