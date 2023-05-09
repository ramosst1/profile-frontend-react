import { rest } from 'msw'
import { IProfileResponse } from '../../interfaces/profiles/profile-responses';
import { IProfileModel, IProfileAddressModel, IProfileCreateModel } from '../../interfaces/profiles/profile-models';

export const profilesPostHandlers = [  

  //#endregion add a  profiles
    rest.post<IProfileCreateModel, any>('http://localhost:54969/api/v1/profiles/', async (req, res, ctx) => {

    const createItem = await req.json<IProfileCreateModel>()

    {
      const adresslist = createItem.addresses.map<IProfileAddressModel>(item => {
        const aProfile: IProfileAddressModel = {
          profileId: 99,
          addressId: 99,
          address1: item.address1,
          address2: item.address2,
          city: item.city,
          stateAbrev: item.stateAbrev,
          zipCode: item.zipCode,
          isPrimary: item.isPrimary,
          isSecondary: item.isSecondary,
        }
        return aProfile;
      } 
      );
  
      const aProfileModel: IProfileModel ={
        profileId: 99,
        firstName: createItem.firstName,
        lastName: createItem.lastName,
        active: createItem.active,
        addresses: adresslist
      }

      const response: IProfileResponse = {
        success: true,
        messages: [],
        profile: aProfileModel
      };

      return res(ctx.json(response))

    };

  }),

  //#endregion
]
