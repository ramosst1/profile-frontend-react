import { rest } from 'msw'
import { IProfileResponse, IProfilesResponse } from '../../interfaces/profiles/profile-responses';
import { IProfileModel } from '../../interfaces/profiles/profile-models';
import profilesList from './profile-list';

export const profilesGetHandlers = [  


  //#endregion get all profiles
  rest.get('http://localhost:54969/api/v1/profiles/', async (req, res, ctx) => {

        const profiles: IProfileModel[] = profilesList.getProfiles();

        //#region Begin no user found
        {
          const response: IProfilesResponse = {
            success: true,
            messages: [],
            profiles: profiles
          }

          return res(ctx.json(response))

        }
        //#endregion

  }),
  //#endregion

  //#region  get a profile 
  rest.get('http://localhost:54969/api/v1/profiles/:profileId', async (req, res, ctx) => {
 
    const { profileId} = req.params

    const profile: IProfileModel = profilesList.getProfileById(profileId.toString());

    const response: IProfileResponse = {
      success: true,
      messages: [],
      profile: profile
    }

    return res(ctx.json(response))

  }),
  //#endregion

]
