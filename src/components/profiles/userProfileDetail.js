import React, {Component} from 'react';
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
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class UserProfileDetail extends Component {
  constructor(props) {
    super(props);

    const APropProfile = this.props.profile;

    let APropAddressPrimary = APropProfile?.addresses?.find(
      aItem => aItem.isPrimary == true
    );

    this.state = {
      countryStatesList: [],
      successProfileCommitt: false,
      errorMessages: [],
      uxFirstName: APropProfile?.firstName ?? "",
      uxLastName: APropProfile?.lastName ?? "",
      uxActive: APropProfile?.active ?? false,
      uxAddress1: APropAddressPrimary?.address1 ?? "",
      uxAddress2: APropAddressPrimary?.address2 ?? "",
      uxCity: APropAddressPrimary?.city ?? "",
      uxStateAbrev: APropAddressPrimary?.stateAbrev ?? "",
      uxZipCode: APropAddressPrimary?.zipCode ?? ""
      
    };

    this.populateCountryStates();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >

        <ul style={{color:"red"}}>
          {this.state.errorMessages.map(errorMessage => (
            <li>{errorMessage.message}</li>
          ))}

        </ul>

        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={6} spacing={0}>
            <TextField
              id="uxFirstName"
              name="uxFirstName"
              value={this.state.uxFirstName}
              label="First Name"
              required
              fullWidth
              onChange={this.handleProfileChange.bind(this)}
            />
          </Grid>
          <Grid container item xs={6} spacing={0}>
            <TextField
              id="uxLastName"
              name="uxLastName"
              value={this.state.uxLastName}
              label="Last Name"
              required
              onChange={this.handleProfileChange.bind(this)}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <RadioGroup
            aria-label="position"
            id="uxActive"
            name="uxActive"
            value={this.state.uxActive}
            row
            required
            onChange={this.handleProfileChangeBool.bind(this)}
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
        <Grid container item xs={12} spacing={0}>
          <TextField
            id="uxAddress1"
            name="uxAddress1"
            value={this.state.uxAddress1}
            label="Address1"
            required
            fullWidth
            onChange={this.handleProfileChange.bind(this)}
          />
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <TextField
            id="uxAddress2"
            name="uxAddress2"
            value={this.state.uxAddress2}
            label="Address2"
            fullWidth
            onChange={this.handleProfileChange.bind(this)}
          />
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <TextField
            id="uxCity"
            name="uxCity"
            value={this.state.uxCity}
            label="City"
            required
            fullWidth
            onChange={this.handleProfileChange.bind(this)}
          />
        </Grid>

        <Grid container item xs={12} spacing={0}>
          <FormControl
            required
          >

            <InputLabel htmlFor="age-native-required">State</InputLabel>
            <Select
              required
              label= "States"
              name="uxStateAbrev"
              id="uxStateAbrev"
              value={this.state.uxStateAbrev}
              onChange={this.handleProfileChange.bind(this)}
              inputProps={{
                id: 'age-native-required',
              }}
            >
              {/* <MenuItem value=""><em>Select a State</em></MenuItem> */}
              {this.state.countryStatesList.map(aItem => (
                <MenuItem key={aItem.stateAbrev} key={aItem.stateAbrev} value={aItem.stateAbrev} >
                  {aItem.stateName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <TextField
            id="uxZipCode"
            name="uxZipCode"
            value={this.state.uxZipCode}
            label="ZipCode"
            required 
            type="number"
            onChange={this.handleProfileChange.bind(this)}
          />
        </Grid>
        <Grid container item xs={12} spacing={0} justify="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ padding: 4, margin: 10, borderRadius: 25 }}
            onClick={this.props.onCancel}
            startIcon={<CancelIcon />}
            >
            Cancel
          </Button>
          <Hidden smUp={this.props.profile ? true : false}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ padding: 4, margin: 10, borderRadius: 25 }}
              type="Submit"
              startIcon={<SaveIcon />}
            >
              Add
            </Button>
          </Hidden>
          <Hidden smUp={this.props.profile ? false : true}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ padding: 4, margin: 10, borderRadius: 25 }}
              type="Submit"
              startIcon={<SaveIcon />}
            >
              Update
            </Button>
          </Hidden>
        </Grid>
      </form>
    );
  }

  handleSubmit = (event) => {


    event.preventDefault() ;
//    this.testConfirm();

    if(this.props.profile === null){
        this.handleAddProfile(event);
    } else {
      this.handleUpdateProfile(event);
    }

    return false;

}

  handleProfileChangeBool = event => {

    const { name, value } = event.target;

    let ValueBool = (value === "true")
 
    this.setState({
      [name]: ValueBool
    });
  };

  handleProfileChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleAddProfile = event => {

    const {
      uxFirstName,
      uxLastName,
      uxActive,
      uxAddress1,
      uxAddress2,
      uxCity,
      uxStateAbrev,
      uxZipCode
    } = this.state;

     let ProfileNew = {
      "firstName": uxFirstName,
      "lastName": uxLastName,
      "active": uxActive,
      "addresses": [
          {
              "isPrimary": true,
              "address1": uxAddress1,
              "address2": uxAddress2,
              "city": uxCity,
              "stateAbrev": uxStateAbrev,
              "zipCode": uxZipCode
          }
    
      ]
    }

    this.putProfileData(ProfileNew)
    .then(response => {

      if(this.state.successProfileCommitt === true) {

        this.props.onCreate(response);

      } else {

        this.setState({
          errorMessages : response
        })

      }

    });


  }
  handleUpdateProfile = event => {
    const { profile } = this.props;

    fetch("http://localhost:54969/api/v1/profiles/" + profile.profileId)
      .then(resp => resp.json())
      .then(aProfileToUpdate => {
        const AUpdateProfile = { ...aProfileToUpdate };

        let APropAddressPrimary = AUpdateProfile?.addresses?.find(
          aItem => aItem.isPrimary == true
        );

        const {
          uxFirstName,
          uxLastName,
          uxActive,
          uxAddress1,
          uxAddress2,
          uxCity,
          uxStateAbrev,
          uxZipCode
        } = this.state;

        AUpdateProfile.firstName = uxFirstName;
        AUpdateProfile.lastName = uxLastName;
        AUpdateProfile.active = uxActive;

        APropAddressPrimary.address1 = uxAddress1;
        APropAddressPrimary.address2 = uxAddress2;
        APropAddressPrimary.city = uxCity;
        APropAddressPrimary.stateAbrev = uxStateAbrev;
        APropAddressPrimary.zipCode = uxZipCode;

        this.postProfileData(AUpdateProfile)
          .then(response => {

            if(this.state.successProfileCommitt === true) {

              this.props.onUpdate(AUpdateProfile);

            } else {

              this.setState({
                errorMessages : response
              })

            }

          });

      })
      .catch(error => {
        console.log(error);
      });
  };

  postProfileData = (profile) => {

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
          this.setState({ successProfileCommitt: false });
        } else {
          this.setState({ successProfileCommitt: true });
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

  putProfileData = (profile) => {

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
          this.setState({ successProfileCommitt: false });
        } else {
          this.setState({ successProfileCommitt: true });
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

  componentDidUpdate(prevProps) {
    if (this.props?.profile?.profileId != prevProps?.profile?.profileId) {
      this.populateProfileDetail();
    }
  }

  populateProfileDetail() {
    const AProfile = this.props.profile;

    let AddressPrimary = AProfile?.addresses?.find(
      aItem => aItem.isPrimary == true
    );

    this.setState({
      uxFirstName: AProfile?.firstName ?? "",
      uxLastName: AProfile?.lastName ?? "",
      uxActive: AProfile?.active,
      uxAddress1: AddressPrimary?.address1 ?? "",
      uxAddress2: AddressPrimary?.address2 ?? "",
      uxCity: AddressPrimary?.city ?? "",
      uxStateAbrev: AddressPrimary?.stateAbrev ?? "",
      uxZipCode: AddressPrimary?.zipCode ?? ""
    });
  }

  populateCountryStates() {
    if (this.state.countryStatesList.length > 0) return;

    let countryStates = [];
    return fetch("http://localhost:54969/api/v1/states")
      .then(resp => resp.json())
      .then(json => {
        this.setState({ countryStatesList: json });
      });
  }
}


export default UserProfileDetail;