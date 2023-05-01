import { IProfileModel } from "../../interfaces/profiles/profile-models";

class profilesList {

    PROFILES: IProfileModel[] = [
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
        }
    ]

    getProfiles(){
  
        return this.PROFILES;
    }

    getProfileById(profileId: string){
        return this.PROFILES.find(item => item.profileId.toString() === profileId);
    }
    
} export default new profilesList();