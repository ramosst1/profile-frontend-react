import { rest } from 'msw'
import { IProfileResponse, IProfilesResponse } from '../../interfaces/profiles/profile-responses';
import profilesList from './profile-list';
import { IMessageModel } from '../../interfaces/profiles/error-message-model';

export const profilesDeleteHandlers = [  


  //#region  delete  a profile 
  rest.delete('http://localhost:54969/api/v1/profiles/:profileId', async (req, res, ctx) => {
 
    const {profileId }  = req.params;

    const aProfile = profilesList.getProfileById(profileId.toString())

    const response: IProfileResponse = {
      success: false,
      messages: [],
      profile: undefined
    }

    if(aProfile){

      response.success = true;

      return res(ctx.json(response))

    }

    const messages: IMessageModel[] = [{
      internalMessage: 'The use is not found.',
      externalMessage: 'The user is not found.',
      statusCode: '999'
    }];

    response.messages = messages;


  }),
  //#endregion

]
