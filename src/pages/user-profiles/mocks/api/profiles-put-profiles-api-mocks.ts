import { rest } from 'msw'
import { IProfileResponse } from '../../interfaces/profiles/profile-responses';
import { IProfileModel, IProfileUpdateModel, IProfileAddressModel } from './../../interfaces/profiles/profile-models';

export const profilesPutHandlers = [  


  //#endregion get all profiles
    rest.put<IProfileUpdateModel, any>('http://localhost:54969/api/v1/profiles/', async (req, res, ctx) => {

    const updateItem = await req.json<IProfileUpdateModel>()

    //#region update an existing profile
    {
      const adresslist = updateItem.addresses.map<IProfileAddressModel>(item => {
        const aProfile: IProfileAddressModel = {
          profileId: item.profileId,
          addressId: item.addressId,
          address1: item.address1,
          address2: item.address2,
          city: item.city,
          stateAbrev: item.stateAbrev,
          zipCode: item.zipCode,
          isPrimary: item.isPrimary,
          isSecondary: item.isSecondary
        }
        return aProfile;
      } 
      );
  
      const aProfileModel: IProfileModel ={
        profileId: updateItem.profileId,
        firstName: updateItem.firstName,
        lastName: updateItem.lastName,
        active: updateItem.active,
        addresses: adresslist
      }

      const response: IProfileResponse = {
        success: true,
        messages: [],
        profile: aProfileModel
      };
      

      return res(ctx.json(response))

    }
    //#endregion

  }),

  //#endregion
]
