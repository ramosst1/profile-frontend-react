import { ISignInModel } from '../../interfaces/signin/signin-models';
import { rest } from 'msw'
import { ISignInRequest } from '../../interfaces/signin/signin-requests'
import { ISignInResponse } from '../../interfaces/signin/signin-responses';
import { IMessageModel } from '../../interfaces/error-messages-models';

export const signinUserhandlers = [  
  //#endregion post to sign in
  rest.post<ISignInRequest, ISignInRequest>('http://localhost:54969/api/v1/signin/', async (req, res, ctx) => {

    const { userName, password} = await req.json<ISignInRequest>()

        //#region Begin an existing user
        if(password === 'password'){

          const aSignInModel: ISignInModel ={
            signInId: 1,
            userName: userName,
            firstName: 'Joe',
            lastName: 'Smith'
          }


          // const messages: IMessageModel[] = [{
          //   internalMessage: 'My error message',
          //   externalMessage: 'My error message',
          //   statusCode: '999'
          // }];

          const response: ISignInResponse = {
            success: true,
            messages: [],
            signInUser: aSignInModel
          }

          return res(ctx.json(response))

        }
        //#endregion

        //#region Begin an existing user
        if(password === 'password2'){

          const aSignInModel: ISignInModel ={
            signInId: 1,
            userName: userName,
            firstName: 'Jill',
            lastName: 'Peterson'
          }


          const response: ISignInResponse = {
            success: true,
            messages: [],
            signInUser: aSignInModel
          }

          return res(ctx.json(response))

        }
        //#endregion

        ////#region Begin no user found
        {
          const messages: IMessageModel[] = [{
            internalMessage: 'The user is not found',
            externalMessage: 'The user is not found',
            statusCode: '999'
          }];

          const response: ISignInResponse = {
            success: false,
            messages: messages,
            signInUser: undefined
          }

          return res(ctx.json(response))

        }
        //#endregion

  }),
  //#endregion
]
