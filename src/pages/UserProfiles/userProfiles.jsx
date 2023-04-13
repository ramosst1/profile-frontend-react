import React, {useState, useEffect } from 'react';
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
import UserProfileDetail from './components/userProfileDetail';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ProfilesService from './services/profiles-service';

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
  
  export default function Profiles() {

  const [keyProfileKey,setKeyProfileKey] = useState(0);
  const [profileActiveStatus,setProfileActiveStatus] = useState("true");
  const[profiles, setProfiles] = useState([]);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openProfileDetail, setOpenProfileDetail] = useState(false);

  useEffect(() => {
    populateProfileList();
  },[]);  

  const getProfileFilters = () => {
    const ProfileFiltered = profiles.filter(
      aProfile =>
        profileActiveStatus === null ||
        aProfile.active === (profileActiveStatus === "true")
    );

    return ProfileFiltered;
  }

  const handleProfileFilterChange = (event, profileActiveStatus) => {
    setOpenProfileDetail(false);
    setProfileActiveStatus(profileActiveStatus);
  };

  const handleDialogOpen = profile => {
    setOpenDeleteConfirm(true);
    setSelectedProfile(profile);
  };

  const handleDialogClose = (event, value) => {
    setOpenDeleteConfirm(false);
  };

  const handleAddProfile = () => {

    setOpenProfileDetail(true)
    setKeyProfileKey(0);
    setSelectedProfile(null);
  };

  const handleProfileDetailUpdate = profile => {
    populateProfileList();

    setOpenProfileDetail(false);
    setSelectedProfile(null);
  };

  const handleProfileCreate = profile => {
    populateProfileList();

    setOpenProfileDetail(false);
    setSelectedProfile(null);
  };

  const handleProfileDetailCancel = () => {
    setOpenProfileDetail(false);
    setSelectedProfile(null);
  };

  const handleDeleteProfile = () => {
    deleteProfileData()
      .then(newProfile => {

        const ProfileNew = profiles.filter(
          aItem => aItem.profileId !== selectedProfile.profileId
        );

        setOpenDeleteConfirm(false);
        setProfiles(ProfileNew);
        setOpenProfileDetail(false);
    });
  };

  const deleteProfileData = () => {
    return ProfilesService.deleteProfile(selectedProfile.profileId)
      .then(resp => resp.json())
      .then(response => response);
  };

  const handleEditProfile = profile => {
    setOpenProfileDetail(true);
    setKeyProfileKey(profile.ProfileId);
    setSelectedProfile(profile);
  };

  const populateProfileList = () => {

    return ProfilesService.getProfiles()
      .then(resp => resp.json())
      .then(profileResponse => {
        setProfiles(profileResponse.profiles);
      },[]);
  }

  const renderDeleteProfileDialogBox = () => {
    return (
      <Dialog
        open={openDeleteConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
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
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteProfile} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

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
                      value={profileActiveStatus}
                      indicatorColor="primary"
                      onChange={handleProfileFilterChange}
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
                      onClick={handleAddProfile}
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
                            profileActiveStatus === null
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
                    {getProfileFilters().map(profile => (
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
                              profileActiveStatus === null
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
                            onClick={() => handleEditProfile(profile)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            style={{ fontSize: 14 }}
                            onClick={() => handleDialogOpen(profile)}
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
            <Hidden smUp={openProfileDetail ? false : true} >
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
                      key={keyProfileKey}
                      profile={selectedProfile}
                      onUpdate={handleProfileDetailUpdate}
                      onCancel={handleProfileDetailCancel}
                      onCreate={handleProfileCreate}
                    />
                  </div>
                </Grid>
              </Grid>
            </Hidden>
            </Grid>
        </Grid>
        {renderDeleteProfileDialogBox()}
      </div>
    );
}
