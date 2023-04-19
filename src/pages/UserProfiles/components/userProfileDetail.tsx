import React, {useState, useEffect} from 'react';
import {
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  Button,
  Hidden,
  MenuItem,
  FormHelperText, 
  Box
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import ProfilesService from '../services/profiles-service';
import StatesServices from '../../../services/states/states-services';
import { IProfileCreateModel, IProfileModel, IProfileAddressCreateModel, IProfileUpdateModel } from '../interfaces/profiles/profile-models';
import { IStateModel } from '../../../interfaces/states/states-model';
import IErrorMessageModel from '../../../interfaces/api-error-message'
import { IProfileResponse } from '../interfaces/profiles/profile-responses';
import useServiceApiResponse from '../../../hooks/useServiceApiResponse';

export default function UserProfileDetail(this: any, props: { profile?: IProfileModel; onCreate?: any; onUpdate?: any; onCancel?: any; }) {

  const APropProfile = props.profile;

  const [profileCreateResponse, setProfilesCreateResponse] = useState<Promise<IProfileResponse> | undefined>();
  const { apiResponse:apiProfileCreateResponse, messages:apiProfileCreateMessages, loading: apiProfileCreateLoading} = useServiceApiResponse<IProfileResponse>(profileCreateResponse);

  const [profileUpdateResponse, setProfilesUpdateeResponse] = useState<Promise<IProfileResponse> | undefined>();
  const { apiResponse:apiProfileUpdateResponse, messages:apiProfileUpdateMessages, loading:apiProfileUpdateLoading} = useServiceApiResponse<IProfileResponse>(profileUpdateResponse);

  const APropAddressPrimary = APropProfile?.addresses?.find(
    aItem => aItem.isPrimary === true
  );

  const [countryStatesList, setCountryStatesList] = useState<IStateModel[]>([]);
  const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);

  const [uxProfile, setUxProfile] = useState({
      firstName: APropProfile?.firstName ?? "",
      lastName : APropProfile?.lastName ?? "",
      active: APropProfile?.active ?? false,
      address1: APropAddressPrimary?.address1 ?? "",
      address2: APropAddressPrimary?.address2 ?? "",
      city: APropAddressPrimary?.city ?? "",
      stateAbrev: APropAddressPrimary?.stateAbrev ?? "",
      zipCode: APropAddressPrimary?.zipCode ?? ""
    });

    useEffect(() => {
      populateCountryStates();
      populateProfileDetail();      
  },[APropProfile?.profileId]); 

  useEffect(() => {

      if (!apiProfileCreateResponse?.success) {
      } else {
        props.onCreate(apiProfileCreateResponse);
      }
    
      apiProfileCreateMessages && setErrorMessages(apiProfileCreateMessages)

  }, [apiProfileCreateResponse])
  
  useEffect(() => {

        if (!apiProfileUpdateResponse?.success) {
        } else {
          props.onUpdate(apiProfileUpdateResponse);          
        }
    
        apiProfileUpdateMessages && setErrorMessages(apiProfileUpdateMessages)

  }, [apiProfileUpdateResponse])

  function handleSubmit(event: { preventDefault: () => void; }){

    event.preventDefault() ;

    if(props.profile){
      handleUpdateProfile();
    } else {
      handleAddProfile();
    }

    return false;
  }

  function handleProfileChangeBool(event: React.ChangeEvent<HTMLInputElement> ){

    const { name, value } = event.target;

    let ValueBool = (value === "true")

    setUxProfile({ ...uxProfile, [name]: ValueBool });
  };

  function handleProfileChange(event: React.ChangeEvent<HTMLInputElement> ){
    const { name, value } = event.target;

    setUxProfile({ ...uxProfile, [name]: value });

  };

  function handleProfileSelectChange (event: any){
    const { name, value } = event.target;

    setUxProfile({ ...uxProfile, [name]: value });
};

  function handleAddProfile(){

    let newAddress: IProfileAddressCreateModel = {
      isPrimary: true,
      address1: uxProfile.address1,
      address2: uxProfile.address2,
      city: uxProfile.city,
      stateAbrev: uxProfile.stateAbrev,
      zipCode: uxProfile.zipCode,
      isSecondary: false
    }

    let ProfileNew:IProfileCreateModel = {
      firstName: uxProfile.firstName,
      lastName: uxProfile.lastName,
      active: uxProfile.active,
      addresses: [newAddress]
    }

    setProfilesCreateResponse(ProfilesService.createProfileAsync(ProfileNew));

    return true;
  }
  
  function handleUpdateProfile(){
    const { profile } = props;

      ProfilesService.getProfileAsync(profile?.profileId?? 0)
      .then(response => {
        
        const aUpdateProfile = { ...response.profile };

        let aPropAddressPrimary = aUpdateProfile.addresses.find(
           aItem  => aItem.isPrimary === true
        )

        aUpdateProfile.firstName = uxProfile.firstName;
        aUpdateProfile.lastName = uxProfile.lastName;
        aUpdateProfile.active = uxProfile.active;

        if(aPropAddressPrimary !== undefined) {
          aPropAddressPrimary.address1 = uxProfile.address1;
          aPropAddressPrimary.address2 = uxProfile.address2;
          aPropAddressPrimary.city = uxProfile.city;
          aPropAddressPrimary.stateAbrev = uxProfile.stateAbrev;
          aPropAddressPrimary.zipCode = uxProfile.zipCode;
        }

        setProfilesUpdateeResponse(ProfilesService.updateProfileAsync(aUpdateProfile));

      })
      .catch((error: IErrorMessageModel[]) => {
        setErrorMessages(error)
      });
  };

  function populateProfileDetail(){
    const AProfile = props.profile;

    let AddressPrimary = AProfile?.addresses?.find(
      aItem => aItem.isPrimary === true
    );

    setUxProfile({
      firstName: AProfile?.firstName ?? "",
      lastName: AProfile?.lastName ?? "",
      active: AProfile?.active ?? false,
      address1: AddressPrimary?.address1 ?? "",
      address2: AddressPrimary?.address2 ?? "",
      city: AddressPrimary?.city ?? "",
      stateAbrev: AddressPrimary?.stateAbrev ?? "",
      zipCode: AddressPrimary?.zipCode ?? ""
    });
 
  }

  function populateCountryStates(){
    if (countryStatesList.length > 0) return;

      return StatesServices.getStatesAsync()
      .then(statesResponse => {
        setCountryStatesList(statesResponse.states);
      })
      .catch((error: IErrorMessageModel[]) => {
        setErrorMessages(error)
      });      
  }  
    return (
      <form onSubmit={handleSubmit} >
         <Grid container xs={12} spacing={1} >
            <Grid item xs={12} >
              <Box color="error.main">
                <ul >
                  {errorMessages.map(errorMessage => (
                    <li>{errorMessage.message}</li>
                  ))}
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} >
            <Hidden smUp={apiProfileUpdateLoading? false : true} >
                <Box > Profiles is updating ...
                </Box>
            </Hidden>
            <Hidden smUp={apiProfileCreateLoading? false : true} >
                <Box > Profiles is being created...
                </Box>
            </Hidden>
          </Grid>

            <Grid container item xs={12} >
                <Grid item xs={6} style={{padding: 5}} >
                  <TextField
                    id="firstName"
                    name="firstName"
                    value={uxProfile.firstName}
                    label="First Name"
                    required
                    fullWidth
                    onChange={handleProfileChange.bind(this)}
                  />
                </Grid>
                <Grid item xs={6} style={{padding: 5}}>

                  <TextField
                    id="lastName"
                    name="lastName"
                    value={uxProfile.lastName}
                    label="Last Name"
                    required
                    fullWidth
                    onChange={handleProfileChange.bind(this)}
                  />
                </Grid>
            </Grid>
            <Grid  item xs={12} style={{padding: 5}}>
              <RadioGroup
                aria-label="position"
                id="active"
                name="active"
                value={uxProfile.active}
                row
                onChange={handleProfileChangeBool.bind(this)}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio color="primary" />}
                  label="Active"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio color="primary" />}
                  label="InActive"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
            <Grid  item xs={12} style={{padding: 5}}>
              <TextField
                id="address1"
                name="address1"
                value={uxProfile.address1}
                label="Address1"
                required
                fullWidth
                onChange={handleProfileChange.bind(this)}
              />
            </Grid>
            <Grid  item xs={12} style={{padding: 5}}>
              <TextField
                id="address2"
                name="address2"
                value={uxProfile.address2}
                label="Address2"
                fullWidth
                onChange={handleProfileChange.bind(this)}
              />
            </Grid>
            <Grid  item xs={12} style={{padding: 5}}>
              <TextField
                id="city"
                name="city"
                value={uxProfile.city}
                label="City"
                required
                fullWidth
                onChange={handleProfileChange.bind(this)}
              />
            </Grid>

            <Grid  item xs={12} style={{padding: 5}}>
              <FormControl
                required 
              >
                <InputLabel htmlFor="age-native-required">State</InputLabel>
                <Select
                  label= "States"
                  name="stateAbrev"
                  id="stateAbrev"
                  value={uxProfile.stateAbrev} 
                  onChange={handleProfileSelectChange}
                  inputProps={{
                    id: 'age-native-required',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {countryStatesList.map(aItem => (
                    <MenuItem key={aItem.stateAbrev} value={aItem.stateAbrev} >
                      {aItem.stateName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid  item xs={12} style={{padding: 5}}>
              <TextField
                id="zipCode"
                name="zipCode"
                value={uxProfile.zipCode}
                label="ZipCode"
                required 
                type="number"
                onChange={handleProfileChange.bind(this)}
              />
            </Grid>
            <Grid container item xs={12} justify="center">
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ padding: 4, margin: 10, borderRadius: 25 }}
                onClick={props.onCancel}
                startIcon={<CancelIcon />}
                type="button"
                >
                Cancel
              </Button>
              <Hidden smUp={props.profile ? true : false}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ padding: 4, margin: 10, borderRadius: 25 }}
                  type="submit"
                  startIcon={<PersonAddIcon />}
                >
                  Add
                </Button>
              </Hidden>
              <Hidden smUp={props.profile ? false : true}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ padding: 4, margin: 10, borderRadius: 25 }}
                  type="submit"
                  startIcon={<PersonIcon />}
                >
                  Update
                </Button>
              </Hidden>
            </Grid>
          </Grid>
      </form>
    );
  }
