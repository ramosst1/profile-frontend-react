
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
  Box,
  Hidden
  
} from "@material-ui/core";

import UserProfileDetail from './userProfileDetail';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ProfilesService from '../services/profiles-service';
import { IProfileModel } from '../interfaces/profiles/profile-models';
import { IProfilesResponse} from '../interfaces/profiles/profile-responses';
import useServiceApiResponse from '../../../hooks/useServiceApiResponse';
import IErrorMessageModel from '../../../interfaces/api-error-message';
import { IApiResponse } from '../interfaces/profiles/api-response'; 
import ConfirmationDialog from '../../../components/ui/ConfirmationDialog';
import ProcessingDialog from '../../../components/ui/ProcessingDialog';

export default function UserProfileList(){
    const [keyProfileKey,setKeyProfileKey] = useState(0);
    const [profileActiveStatus,setProfileActiveStatus] = useState("true");
    const[profiles , setProfiles] = useState<IProfileModel[]>([]);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<IProfileModel>();
    const [openProfileDetail, setOpenProfileDetail] = useState(false);
    const [errorMessages, setErrorMessages] = useState<IErrorMessageModel[]>([]);

    const [profilesResponse, setProfilesResponse] = useState<Promise<IProfilesResponse>>();
    const { apiResponse:apiProfilesResponse, messages:apiProfilesMessage, loading:apiProfilesLoading} = useServiceApiResponse<IProfilesResponse>(profilesResponse);

    const [deleteProfileResponse, setDeleteProfileResponse] = useState<Promise<IApiResponse> | undefined>();
    const {apiResponse:apiProfileDeleteResponse} = useServiceApiResponse<IApiResponse>(deleteProfileResponse);

    useEffect(() => {
       populateProfileList();
    },[]);  

    useEffect(() => {

      apiProfilesResponse && setProfiles(apiProfilesResponse.profiles);     
      apiProfilesMessage && setErrorMessages(apiProfilesMessage);     


    }, [apiProfilesResponse])

    useEffect(() =>{

      if(apiProfileDeleteResponse?.success){
        const profileListNew = profiles.filter(
          aItem => aItem.profileId !== selectedProfile?.profileId
        );

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

      setOpenDeleteConfirm(false);
    };
  
    function handleEditProfile (profile: IProfileModel){
      setOpenProfileDetail(true);
      setKeyProfileKey(profile.profileId);
      setSelectedProfile(profile);
    };

    function populateProfileList(){

      setProfilesResponse(ProfilesService.getProfilesAsync()) ;
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
        <Grid item xs={12} >
          <Hidden smUp={apiProfilesLoading ? false : true} >
            <ProcessingDialog message='Profiles are loading...' />
          </Hidden>
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
        {openDeleteConfirm && (
          <ConfirmationDialog title='Profile Delete Dialog' message='Are you sure you want to delete the user profile?x' openDialog = {openDeleteConfirm} onConfirm={handleDeleteProfile} onClose={handleDialogClose}/>
        )}
      </>
    );


}