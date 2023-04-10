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

export default function UserProfileDetail(props) {

  const APropProfile = props.profile;

  const APropAddressPrimary = APropProfile?.addresses?.find(
    aItem => aItem.isPrimary === true
  );

  const [countryStatesList, setCountryStatesList] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  let successProfileCommitt = false;

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
  
  const handleSubmit = (event) => {

    event.preventDefault() ;

    if(props.profile === null){
      handleAddProfile(event);
    } else {
      handleUpdateProfile(event);
    }

    return false;
  }

  const handleProfileChangeBool = event => {

    const { name, value } = event.target;

    let ValueBool = (value === "true")

    setUxProfile({ ...uxProfile, [name]: ValueBool });
  };

  const handleProfileChange = event => {
    const { name, value } = event.target;

    setUxProfile({ ...uxProfile, [name]: value });

  };

  const handleAddProfile = event => {

     let ProfileNew = {
      "firstName": uxProfile.firstName,
      "lastName": uxProfile.lastName,
      "active": uxProfile.active,
      "addresses": [
          {
              "isPrimary": true,
              "address1": uxProfile.address1,
              "address2": uxProfile.address2,
              "city": uxProfile.city,
              "stateAbrev": uxProfile.stateAbrev,
              "zipCode": uxProfile.zipCode
          }
    
      ]
    }

    postProfileData(ProfileNew)
    .then(response => {

      if(successProfileCommitt === true) {

        props.onCreate(response);

      } else {
//        setErrorMessages(response);
      }
    });

    return true;
  }
  
  const handleUpdateProfile = event => {
    const { profile } = props;

    fetch("http://localhost:54969/api/v1/profiles/" + profile.profileId)
      .then(resp => resp.json())
      .then(aProfileToUpdate => {
        const AUpdateProfile = { ...aProfileToUpdate.profile };

        let APropAddressPrimary = AUpdateProfile?.addresses?.find(
          aItem => aItem.isPrimary === true
        );

        AUpdateProfile.firstName = uxProfile.firstName;
        AUpdateProfile.lastName = uxProfile.lastName;
        AUpdateProfile.active = uxProfile.active;

        APropAddressPrimary.address1 = uxProfile.address1;
        APropAddressPrimary.address2 = uxProfile.address2;
        APropAddressPrimary.city = uxProfile.city;
        APropAddressPrimary.stateAbrev = uxProfile.stateAbrev;
        APropAddressPrimary.zipCode = uxProfile.zipCode;

        putProfileData(AUpdateProfile)
          .then(response => {

            if(successProfileCommitt === true) {

              props.onUpdate(AUpdateProfile);

            } else {
              // setErrorMessages(response);
            }

          });

      })
      .catch(error => {
        console.log(error);
      });
  };

  const postProfileData = (profile) => {

    return fetch("http://localhost:54969/api/v1/profiles/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(profile)
    })
      .then(resp => {
        if (!resp.ok) {
          successProfileCommitt = false;
        } else {
          successProfileCommitt = true;
        }
        return resp.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error.message);
      });

  }

  const putProfileData = (profile) => {

    return fetch("http://localhost:54969/api/v1/profiles/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(profile)
    })
      .then(resp => {

        if (!resp.ok) {
          successProfileCommitt = false;
        } else {
          successProfileCommitt = true;          
        }

        return resp.json();

      })
      .then(data => {

        return data;

      })
      .catch(error => {
        console.error(error);
      });
  }

  const populateProfileDetail = () => {
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
      stateAbrev: AddressPrimary?.stateAbrev ?? null,
      zipCode: AddressPrimary?.zipCode ?? ""
    });
 
  }

  const populateCountryStates = () => {
    if (countryStatesList.length > 0) return;

    return fetch("http://localhost:54969/api/v1/states")
      .then(resp => resp.json())
      .then(statesResponse => {

        setCountryStatesList(statesResponse.states);
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
                required
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
                required sx={{ m: 1 }}
              >

                <InputLabel htmlFor="age-native-required">State</InputLabel>
                <Select
                  label= "States"
                  name="stateAbrev"
                  id="stateAbrev"
                  value={uxProfile.stateAbrev}
                  onChange={handleProfileChange.bind(this)}
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
