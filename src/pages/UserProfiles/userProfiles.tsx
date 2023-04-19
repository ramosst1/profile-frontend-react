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
  Hidden
  
} from "@material-ui/core";
import UserProfileDetail from './components/userProfileDetail';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ProfilesService from './services/profiles-service';
import { IProfileModel } from './interfaces/profiles/profile-models';
import { IProfilesResponse } from './interfaces/profiles/profile-responses';
import useServiceApiResponse from '../../hooks/useServiceApiResponse';
import IErrorMessageModel from '../../interfaces/api-error-message';
import { IApiResponse } from './interfaces/profiles/api-response';

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

  }));

  const classes = useStyles;
  
  export default function Profiles() {

    const [keyProfileKey,setKeyProfileKey] = useState(0);
    const [profileActiveStatus,setProfileActiveStatus] = useState("true");
    const[profiles , setProfiles] = useState<IProfileModel[]>([]);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<IProfileModel>();
    const [openProfileDetail, setOpenProfileDetail] = useState(false);
    const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);
    const [profilesResponse, setProfilesResponse] = useState<Promise<IProfilesResponse> | undefined>(undefined);
    const [deleteProfileResponse, setDeleteProfileResponse] = useState<Promise<IApiResponse> | undefined>(undefined);
 
    const { apiResponse:apiProfileResponse, messages:apiProfileMessage} = useServiceApiResponse<IProfilesResponse>(profilesResponse);
    const {apiResponse:apiProfileDeleteResponse, messages:apiProfileDeleteMessage} = useServiceApiResponse<IApiResponse>(deleteProfileResponse);

    useEffect(() => {
       populateProfileList();
    },[]);  

    useEffect(() => {

      apiProfileResponse && setProfiles(apiProfileResponse.profiles);     
      apiProfileMessage && setErrorMessages(apiProfileMessage);     
      apiProfileResponse && console.log(apiProfileResponse.success+ ' hello');

    }, [apiProfileResponse])

    useEffect(() =>{

      if(apiProfileDeleteResponse?.success){
        const profileListNew = profiles.filter(
          aItem => aItem.profileId !== selectedProfile?.profileId
        );

        setOpenDeleteConfirm(false);
        setProfiles(profileListNew);
        setOpenProfileDetail(false);
      };


    }, [apiProfileDeleteResponse])

    function getProfileFilters() {
      const ProfileFiltered = profiles.filter(
        aProfile =>
          profileActiveStatus === null ||
          aProfile.active === (profileActiveStatus === "true")
      );

      return ProfileFiltered;
    }

    function handleProfileFilterChange(event: any, profileActiveStatus: React.SetStateAction<string>){
      setOpenProfileDetail(false);
      setProfileActiveStatus(profileActiveStatus);
    };

    function handleDialogOpen(profile: IProfileModel){
      setOpenDeleteConfirm(true);
      setSelectedProfile(profile);
    };

    function handleDialogClose(event: any){
      setOpenDeleteConfirm(false);
    };

    function handleAddProfile() {

      setOpenProfileDetail(true)
      setKeyProfileKey(0);
      setSelectedProfile(undefined);
    };

    function handleProfileDetailUpdate(profile: any) {
      populateProfileList();

      setOpenProfileDetail(false);
      setSelectedProfile(undefined);
    };

    function handleProfileCreate(profile: any){
      populateProfileList();

      setOpenProfileDetail(false);
      setSelectedProfile(undefined);
    };

    function handleProfileDetailCancel() {
      setOpenProfileDetail(false);
      setSelectedProfile(undefined);
    };

    function handleDeleteProfile(){
      setDeleteProfileResponse(ProfilesService.deleteProfileAsync(selectedProfile?.profileId ?? 0));
    };
  
    function handleEditProfile (profile: IProfileModel){
      setOpenProfileDetail(true);
      setKeyProfileKey(profile.profileId);
      setSelectedProfile(profile);
    };

    function populateProfileList(){

      const aServiceCallResponse2 = ProfilesService.getProfilesAsync();
      setProfilesResponse(aServiceCallResponse2) ;
    }

    function renderDeleteProfileDialogBox(){
      return (
        <Dialog
          open={openDeleteConfirm}
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
        <>
          <Grid container item xs={12} spacing={0} >
            <div>
              <h1>User Profiles</h1>
            </div>
          </Grid>
          <Grid item xs={12} >
              <Box color="error.main">
                <ul >
                  {errorMessages.map(errorMessage => (
                    <li>{errorMessage.message}</li>
                  ))}
                </ul>
              </Box>
          </Grid>

          <Grid container item xs={12} spacing={5}  >
            <Grid item xs={6} spacing={0}>
              <form>
                <Grid 
                >
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
        </>
      );
}

