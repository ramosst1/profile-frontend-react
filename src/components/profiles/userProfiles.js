import React, {Component} from 'react';
import {
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Slide,
  Hidden
  
} from "@material-ui/core";
import UserProfileDetail from './userProfileDetail';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    userProfileUnselected: {
      backgroundColor: "",
    },
    userProfileSelected: {
      backgroundColor: "red",
    }    

  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const classes = useStyles;
  
class Profiles extends Component {


  constructor(props) {
    super(props);
    this.state = {
      keyProfileKey: 0,
      profileActiveStatus: "true",
      profiles: [],
      openDeleteConfirm: false,
      selectedProfile: null,
      openProfileDetail: false
    };

  }

  render() {
    return (
      <div>
        <Grid container item xs={12} spacing={0} >
          <div>
            <h1>User Profiles</h1>
          </div>
        </Grid>

        <Grid container item xs={12} spacing={5}  >
          <Grid item xs={6} spacing={0}>
            <form>
              <Grid containeritem xs={12} spacing={0}>
                <Grid container>
                  <Grid item xs={9} style={{padding: "0px 0px 0px 10px"}}>
                    <Tabs
                      value={this.state.profileActiveStatus}
                      indicatorColor="primary"
                      onChange={this.handleProfileFilterChange}
                    >
                      <Tab label="Active" value="true" />
                      <Tab label="Inactive" value="false" />
                      <Tab label="All" value={null} />
                    </Tabs>
                  </Grid>
                  <Grid item xs={3} style={{textAlign:"right"}}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ padding: 4, margin: 10, borderRadius: 25 }}
                      onClick={this.handleAddProfile}
                      startIcon={<PersonAddIcon />}
                    >
                      Add Profile
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <TableContainer
                component={Paper}
                style={{ borderRadius: "15px" }}
                elevation={10}
              >
                <Table size="small" aria-label="a dense table">
                  <TableHead style={{ backgroundColor: "whitesmoke" }}>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell
                        style={{
                          width: 10,
                          display:
                            this.state.profileActiveStatus === null
                              ? ""
                              : "none"
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell align="center" style={{ width: 150 }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.getProfileFilters().map(profile => (
                      <TableRow
                        key={profile.profileId}
                        className={classes.userProfileSelected}
                      >
                        <TableCell component="th" scope="row">
                          {profile.firstName} {profile.lastName}
                        </TableCell>
                        <TableCell
                          style={{
                            display:
                              this.state.profileActiveStatus === null
                                ? ""
                                : "none"
                          }}
                        >
                          <span style={{ color: "grey" }}>
                            {profile.active === true ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => this.handleEditProfile(profile)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            style={{ fontSize: 14 }}
                            onClick={() => this.handleDialogOpen(profile)}
                          >
                            <Box color="error.main">
                              <DeleteIcon />
                            </Box>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </form>
          </Grid>
          <Grid container item xs={6} spacing={0}>
            <Hidden smUp={this.state.openProfileDetail ? false : true} >
              <br/>&nbsp; <br/>
              <Grid item xs={12} style={{ borderRadius: "15px", padding: 0 }} component={Paper} elevation={10}>
                <Grid item xs={12}>
                  <Box
                    color="white"
                    bgcolor="primary.main"
                    style={{ borderRadius: "15px 15px 0px 0px", padding: 5 }}
                  >
                    <strong>Profile Detail</strong>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      backgroundColor: "whitesmoke",
                      padding: 5,
                      borderRadius: "0px 0px 15px 15px"
                    }}
                  >
                    <UserProfileDetail
                      key={this.state.keyProfileKey}
                      profile={this.state.selectedProfile}
                      onUpdate={this.handleProfileDetailUpdate}
                      onCancel={this.handleProfileDetailCancel}
                      onCreate={this.handleProfileCreate}
                    />
                  </div>
                </Grid>
              </Grid>
            </Hidden>
            </Grid>
        </Grid>
        {this.renderDeleteProfileDialogBox()}
      </div>
    );
  }

  getProfileFilters = () => {
    const ProfileFiltered = this.state.profiles.filter(
      aProfile =>
        this.state.profileActiveStatus === null ||
        aProfile.active == (this.state.profileActiveStatus == "true")
    );

    return ProfileFiltered;
  }

  handleProfileFilterChange = (event, profileActiveStatus) => {

    this.setState({
      openProfileDetail: false,
      profileActiveStatus
    });
  };

  handleDialogOpen = profile => {

    this.setState({
      openDeleteConfirm: true,
      selectedProfile: profile,
    });
  };

  handleDialogClose = (event, value) => {
    this.setState({ openDeleteConfirm: false });
  };

  handleAddProfile = () => {
    this.setState({
      openProfileDetail: true,
      keyProfileKey: 0,
      selectedProfile: null
    });
  };

  handleProfileDetailUpdate = profile => {
    this.populateProfileList();

    this.setState({
      openProfileDetail: false,
      selectedProfile: null
    });
  };

  handleProfileCreate = profile => {
    this.populateProfileList();

    this.setState({
      openProfileDetail: false,
      selectedProfile: null
    });
  };

  handleProfileDetailCancel = () => {
    this.setState({
      openProfileDetail: false,
      selectedProfile: null
    });
  };

  handleDeleteProfile = () => {
    this.deleteProfileData()
      .then(newProfile => {

        const ProfileNew = this.state.profiles.filter(
          aItem => aItem.profileId != this.state.selectedProfile.profileId
        );

        this.setState({
          openDeleteConfirm: false,
          profiles: ProfileNew,
          openProfileDetail: false, 
        });
    });
  };

  deleteProfileData = () => {
    const { selectedProfile } = this.state;

    return fetch(
      "http://localhost:54969/api/v1/profiles/" + selectedProfile.profileId,
      {
        method: "delete"
      }
    )
      .then(resp => resp.json())
      .then(response => response);
  };

  handleEditProfile = profile => {
    this.setState({
      openProfileDetail: true,
      keyProfileKey: profile.ProfileId,
      selectedProfile: profile
    });
  };

  componentDidMount(prevProps) {
    this.populateProfileList();
  }

  populateProfileList() {
    return fetch("http://localhost:54969/api/v1/profiles")
      .then(resp => resp.json())
      .then(profileList => {
        this.setState({
          profiles: profileList
        });
      });
  }

  renderDeleteProfileDialogBox() {
    return (
      <Dialog
        open={this.state.openDeleteConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Profile Delete Dialog"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the user profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={this.handleDeleteProfile} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Profiles;
