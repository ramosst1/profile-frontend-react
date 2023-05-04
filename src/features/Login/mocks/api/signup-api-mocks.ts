import { rest } from 'msw'
import { IMessageModel } from '../../interfaces/error-messages-models';
import { ISignUpRequest } from '../../interfaces/signup/signup-requests';
import { ISignUpResponse } from '../../interfaces/signup/signup-responses';
import { ISignUpModel } from '../../interfaces/signup/signup-models';

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
            const messages: IMessageModel[] = [{
              internalMessage: 'The user was created. An email was sent to verify.',
              externalMessage: 'The user was created. An email was sent to verify.',
              statusCode: '100'
            }];

            const response: ISignUpResponse = {
              success: true,
              messages: messages,
              signupUser: aSignInModel
            }

            return res(ctx.json(response))

          }
          //#endregion

          //#region Begin could not create a user.
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

