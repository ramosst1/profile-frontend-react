import { rest } from 'msw'
import { IMessageModel } from '../../../interfaces/states/error-message-model';
import { ISignUpRequest } from '../../../features/Login/interfaces/signup/signup-requests';
import { ISignUpResponse } from '../../../features/Login/interfaces/signup/signup-responses';
import { ISignUpModel } from '../../../features/Login/interfaces/signup/signup-models';

export const signupUserhandlers = [  

    //#region post to signup
    rest.post<ISignUpRequest, ISignUpRequest>('http://localhost:54969/api/v1/signup/', async (req, res, ctx) => {

      const { firstName, lastName, userName, password} = await req.json<ISignUpRequest>()

          //#region Begin an existing user
          if(password === 'password'){

            const aSignInModel: ISignUpModel ={
              signInId: 1,
              userName: userName,
              firstName: firstName,
              lastName: lastName,
              password: password
            }

            const response: ISignUpResponse = {
              success: true,
              messages: undefined,
              signupUser: aSignInModel
            }

            return res(ctx.json(response))

          }
          //#endregion

          //#region Begin could not make a user.
          {

            const messages: IMessageModel[] = [{
              internalMessage: 'The user can not be created',
              externalMessage: 'The user can not be created',
              statusCode: '999'
            }];

            const response: ISignUpResponse = {
              success: false,
              messages: messages,
              signupUser: undefined
            }

            return res(ctx.json(response))

          }
          //#endregion

    }),
    //#endregion
]

