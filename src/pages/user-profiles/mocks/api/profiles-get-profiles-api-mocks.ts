import { rest } from 'msw'
import { IProfileResponse, IProfilesResponse } from '../../interfaces/profiles/profile-responses';
import { IProfileModel } from '../../interfaces/profiles/profile-models';

export const profilesGetHandlers = [  


  //#endregion get all profiles
  rest.get('http://localhost:54969/api/v1/profiles/', async (req, res, ctx) => {

        const profiles: IProfileModel[] = [
          {
            "active": false,
            "addresses": [
              {
                "address1": "1 Main St",
                "address2": "",
                "city": "White Plains",
                "stateAbrev": "NY",
                "zipCode": "12345",
                "addressId": 11,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 1,

              }
            ],
            "firstName": "Steven",
            "lastName": "Ramos",
            "profileId": 1
          },
          {
            "active": false,
            "addresses": [
              {
                "address1": "45 Rockefeller Plaza",
                "address2": "",
                "city": "New York",
                "stateAbrev": "NY",
                "zipCode": "10111",
                "addressId": 12,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 2,

              }
            ],
            "firstName": "Joe",
            "lastName": "Smith",
            "profileId": 2
          },
          {
            "active": true,
            "addresses": [
              {
                "address1": "Yellowstone National Park",
                "address2": "PO Box 168",
                "city": "Yellowstone National Park",
                "stateAbrev": "WY",
                "zipCode": "821900168",
                "addressId": 13,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 3,

              }
            ],
            "firstName": "Jane",
            "lastName": "Smith",
            "profileId": 3
          },
          {
            "active": false,
            "addresses": [
              {
                "address1": "2 15th St NW",
                "address2": "",
                "city": "Washington DC",
                "stateAbrev": "DC",
                "zipCode": "20024",
                "addressId": 14,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 4,

              }
            ],
            "firstName": "Emilio",
            "lastName": "Estevez",
            "profileId": 4
          },
          {
            "active": true,
            "addresses": [
              {
                "address1": "401 Gaylen St",
                "address2": "",
                "city": "Nashville",
                "stateAbrev": "TN",
                "zipCode": "37219",
                "addressId": 15,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 5,

              }
            ],
            "firstName": "Jayden",
            "lastName": "Smith",
            "profileId": 5
          },
          {
            "active": false,
            "addresses": [
              {
                "address1": "3001 Shoppes Blvd",
                "address2": "#3000",
                "city": "Moosic",
                "stateAbrev": "PA",
                "zipCode": "18507",
                "addressId": 16,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 6,

              }
            ],
            "firstName": "Kevin",
            "lastName": "Delgado",
            "profileId": 6
          },
          {
            "active": true,
            "addresses": [
              {
                "address1": "6000 Universal Blvd",
                "address2": "",
                "city": "Orlando",
                "stateAbrev": "FL",
                "zipCode": "32819",
                "addressId": 17,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 7,

              }
            ],
            "firstName": "Peter",
            "lastName": "Pan",
            "profileId": 7
          },
          {
            "active": false,
            "addresses": [
              {
                "address1": "8 Yogi Berra Drive",
                "address2": "",
                "city": "Little Falls",
                "stateAbrev": "NJ",
                "zipCode": "07424",
                "addressId": 18,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 8,

              }
            ],
            "firstName": "Yogi",
            "lastName": "Berra",
            "profileId": 8
          },
          {
            "active": true,
            "addresses": [
              {
                "address1": "222 5th Ave S",
                "address2": "",
                "city": "Nashville",
                "stateAbrev": "TN",
                "zipCode": "37203",
                "addressId": 19,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 9,

              }
            ],
            "firstName": "Johnny",
            "lastName": "Cash",
            "profileId": 9
          },
          {
            "active": false,
            "addresses": [
              {
                "address1": "1 Arizona Memorial Pl",
                "address2": "",
                "city": "Honolulu",
                "stateAbrev": "HI",
                "zipCode": "96818",
                "addressId": 20,
                "isPrimary": true,
                "isSecondary": false,
                "profileId": 10,

              }
            ],
            "firstName": "Tobert",
            "lastName": "Bates",
            "profileId": 10
          }
        ]

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
 
  const { profileId } = req.params
    
    const profile: IProfileModel = {
      "active": true,
      "addresses": [
        {
          "address1": "Yellowstone National Park",
          "address2": "PO Box 168",
          "city": "Yellowstone National Park",
          "stateAbrev": "WY",
          "zipCode": "821900168",
          "addressId": 13,
          "isPrimary": true,
          "isSecondary": false,
          "profileId": 3,

        }
      ],
      "firstName": "Janex",
      "lastName": "Smith",
      "profileId": 3
    }

    const response: IProfileResponse = {
      success: true,
      messages: [],
      profile: profile
    }

    return res(ctx.json(response))


  }),
  //#endregion

]
