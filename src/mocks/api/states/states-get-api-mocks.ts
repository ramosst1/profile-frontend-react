import { rest } from 'msw'
import { IStatesResponse } from '../../../interfaces/states/states-responses';
import { IStateModel } from '../../../interfaces/states/states-model';

export const statesGetApiMockHandlers = [  


  //#endregion get all profiles
  rest.get('http://localhost:54969/api/v1/states/', async (req, res, ctx) => {

        const states: IStateModel[] = 
        [
          {
            "stateName": "Alabama",
            "stateAbrev": "AL"
          },
          {
            "stateName": "Alaska",
            "stateAbrev": "AK"
          },
          {
            "stateName": "American Samoa",
            "stateAbrev": "AS"
          },
          {
            "stateName": "Arizona",
            "stateAbrev": "AZ"
          },
          {
            "stateName": "Arkansas",
            "stateAbrev": "AR"
          },
          {
            "stateName": "California",
            "stateAbrev": "CA"
          },
          {
            "stateName": "Colorado",
            "stateAbrev": "CO"
          },
          {
            "stateName": "Connecticut",
            "stateAbrev": "CT"
          },
          {
            "stateName": "Delaware",
            "stateAbrev": "DE"
          },
          {
            "stateName": "District Of Columbia",
            "stateAbrev": "DC"
          },
          {
            "stateName": "Federated States Of Micronesia",
            "stateAbrev": "FM"
          },
          {
            "stateName": "Florida",
            "stateAbrev": "FL"
          },
          {
            "stateName": "Georgia",
            "stateAbrev": "GA"
          },
          {
            "stateName": "Guam",
            "stateAbrev": "GU"
          },
          {
            "stateName": "Hawaii",
            "stateAbrev": "HI"
          },
          {
            "stateName": "Idaho",
            "stateAbrev": "ID"
          },
          {
            "stateName": "Illinois",
            "stateAbrev": "IL"
          },
          {
            "stateName": "Indiana",
            "stateAbrev": "IN"
          },
          {
            "stateName": "Iowa",
            "stateAbrev": "IA"
          },
          {
            "stateName": "Kansas",
            "stateAbrev": "KS"
          },
          {
            "stateName": "Kentucky",
            "stateAbrev": "KY"
          },
          {
            "stateName": "Louisiana",
            "stateAbrev": "LA"
          },
          {
            "stateName": "Maine",
            "stateAbrev": "ME"
          },
          {
            "stateName": "Marshall Islands",
            "stateAbrev": "MH"
          },
          {
            "stateName": "Maryland",
            "stateAbrev": "MD"
          },
          {
            "stateName": "Massachusetts",
            "stateAbrev": "MA"
          },
          {
            "stateName": "Michigan",
            "stateAbrev": "MI"
          },
          {
            "stateName": "Minnesota",
            "stateAbrev": "MN"
          },
          {
            "stateName": "Mississippi",
            "stateAbrev": "MS"
          },
          {
            "stateName": "Missouri",
            "stateAbrev": "MO"
          },
          {
            "stateName": "Montana",
            "stateAbrev": "MT"
          },
          {
            "stateName": "Nebraska",
            "stateAbrev": "NE"
          },
          {
            "stateName": "Nevada",
            "stateAbrev": "NV"
          },
          {
            "stateName": "New Hampshire",
            "stateAbrev": "NH"
          },
          {
            "stateName": "New Jersey",
            "stateAbrev": "NJ"
          },
          {
            "stateName": "New Mexico",
            "stateAbrev": "NM"
          },
          {
            "stateName": "New York",
            "stateAbrev": "NY"
          },
          {
            "stateName": "North Carolina",
            "stateAbrev": "NC"
          },
          {
            "stateName": "North Dakota",
            "stateAbrev": "ND"
          },
          {
            "stateName": "Northern Mariana Islands",
            "stateAbrev": "MP"
          },
          {
            "stateName": "Ohio",
            "stateAbrev": "OH"
          },
          {
            "stateName": "Oklahoma",
            "stateAbrev": "OK"
          },
          {
            "stateName": "Oregon",
            "stateAbrev": "OR"
          },
          {
            "stateName": "Palau",
            "stateAbrev": "PW"
          },
          {
            "stateName": "Pennsylvania",
            "stateAbrev": "PA"
          },
          {
            "stateName": "Puerto Rico",
            "stateAbrev": "PR"
          },
          {
            "stateName": "Rhode Island",
            "stateAbrev": "RI"
          },
          {
            "stateName": "South Carolina",
            "stateAbrev": "SC"
          },
          {
            "stateName": "South Dakota",
            "stateAbrev": "SD"
          },
          {
            "stateName": "Tennessee",
            "stateAbrev": "TN"
          },
          {
            "stateName": "Texas",
            "stateAbrev": "TX"
          },
          {
            "stateName": "Utah",
            "stateAbrev": "UT"
          },
          {
            "stateName": "Vermont",
            "stateAbrev": "VT"
          },
          {
            "stateName": "Virgin Islands",
            "stateAbrev": "VI"
          },
          {
            "stateName": "Virginia",
            "stateAbrev": "VA"
          },
          {
            "stateName": "Washington",
            "stateAbrev": "WA"
          },
          {
            "stateName": "West Virginia",
            "stateAbrev": "WV"
          },
          {
            "stateName": "Wisconsin",
            "stateAbrev": "WI"
          },
          {
            "stateName": "Wyoming",
            "stateAbrev": "WY"
          }
        ]

        //#region Begin no user found
        {
          const response: IStatesResponse = {
            success: true,
            messages: [],
            states: states
          }

          return res(ctx.json(response))

        }
        //#endregion

  })
  //#endregion
]
