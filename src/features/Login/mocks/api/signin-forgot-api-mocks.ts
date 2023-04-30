import { rest } from 'msw'
import { IMessageModel } from '../../interfaces/error-messages-models';
import ISignInForgotRequest from '../../interfaces/signin-forgot/signin-forgot-requests';
import ISignInForgotResponse from '../../interfaces/signin-forgot/signin-forgot-response';

export const signinForgotUserhandlers = [  
  //#endregion post to sign in
  rest.post<ISignInForgotRequest, ISignInForgotRequest>('http://localhost:54969/api/v1/signin/forgot/', async (req, res, ctx) => {

    const { userName} = await req.json<ISignInForgotRequest>()

        //#region Begin an existing user
        if(userName === 'email@email.com'){

          const messages: IMessageModel[] = [{
            internalMessage: 'An email was sent with instruction on how to reset your credentials.',
            externalMessage: 'An email was sent with instruction on how to reset your credentials.',
            statusCode: '200'
          }];

          const response: ISignInForgotResponse = {
            success: true,
            messages: messages
          }

          return res(ctx.json(response))

        }
        //#endregion

        //#region Begin no user found
        {
          const messages: IMessageModel[] = [{
            internalMessage: 'Your account is not found.',
            externalMessage: 'Your account is not found.',
            statusCode: '200'
          }];

          const response: ISignInForgotResponse = {
            success: true,
            messages: messages
          }

          return res(ctx.json(response))

        }
        //#endregion

  })
  //#endregion
]
