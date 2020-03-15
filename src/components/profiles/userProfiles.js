import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Hidden from '@material-ui/core/Hidden';
import UserProfileDetail from './userProfileDetail';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
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
        <Grid container item xs={12} spacing={0}>
          <div>
            <h1>User Profiles</h1>
          </div>
        </Grid>

        <Grid container item xs={12} spacing={5} alignItems="baseline">
          <Grid container item xs={6} spacing={0}>
          <form>

          <Grid container item xs={12} spacing={0}>
            <Tabs
              value={this.state.profileActiveStatus ?? ""}
              indicatorColor="primary"
              onChange={this.handleProfileFilterChange}
              // aria-label="active or inactiv profiles"
            >
              <Tab label="Active" value="true" />
              <Tab label="Inactive" value="false" />
              <Tab label="All" value="" />
            </Tabs>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ padding: 4, margin: 10, borderRadius: 25 }}
              onClick={this.handleAddProfile}
            >
              Add Profile
            </Button>
          </Grid>

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead style={{ backgroundColor: "whitesmoke" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell
                    style={{
                      width: 10,
                      display:
                        this.state.profileActiveStatus === "" ? "" : "none"
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
                  <TableRow key={profile.profileId}>
                    <TableCell component="th" scope="row">
                      {profile.firstName} {profile.lastName}
                    </TableCell>
                    <TableCell
                      style={{
                        display:
                          this.state.profileActiveStatus === "" ? "" : "none"
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
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </form>
          </Grid>
          
          <Grid container item xs={6} spacing={0} alignContent="flex-start">
            <Hidden smUp={this.state.openProfileDetail ? false : true}>
              <div>
                <strong>Profile Detail</strong>
              </div>
              <Grid
                container
                item
                xs={12}
                spacing={0}
                style={{ boxAlign: "baseline" }}
              >
                <UserProfileDetail
                  key={this.state.keyProfileKey}
                  profile={this.state.selectedProfile}
                  onUpdate={this.handleProfileDetailUpdate}
                  onCancel={this.handleProfileDetailCancel}
                  onCreate={this.handleProfileCreate}
                />
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
        this.state.profileActiveStatus === "" ||
        aProfile.active === (this.state.profileActiveStatus === "true")
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
