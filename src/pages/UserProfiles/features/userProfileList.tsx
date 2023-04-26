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
  Hidden,
  tableCellClasses,
  styled
} from "@mui/material";
import UserProfileDetail from './userProfileDetail';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ProfilesService from '../services/profiles-service';
import { IProfileModel } from '../interfaces/profiles/profile-models';
import { IProfileResponse, IProfilesResponse} from '../interfaces/profiles/profile-responses';
import useServiceApiResponse from '../../../hooks/useServiceApiResponse';
import IErrorMessageModel from '../../../interfaces/api-error-message';
import { IApiResponse } from '../interfaces/profiles/api-response'; 
import ConfirmationDialog from '../../../components/ui/dialogs/ConfirmationDialog';
import ProcessingDialog from '../../../components/ui/dialogs/ProcessingDialog';

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
    const {apiResponse:apiProfileDeleteResponse, loading:apiProfileDeleteLoading} = useServiceApiResponse<IApiResponse>(deleteProfileResponse);

    useEffect(() => {
       initPopulateProfileList();
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

    function initPopulateProfileList(){

      setProfilesResponse(ProfilesService.getProfilesAsync()) ;
    };

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

    function handleDeleteDialogOpen(profile: IProfileModel){
      setOpenDeleteConfirm(true);
      setSelectedProfile(profile);
    };

    function handleDeleteDialogClose(event: any){
      setOpenDeleteConfirm(false);
    };

    function handleAddProfile() {

      setOpenProfileDetail(true)
      setKeyProfileKey(0);
      setSelectedProfile(undefined);
    };

    function addProfileToList(profileResponse:IProfileResponse){

        const newProfiles = [...profiles, profileResponse.profile].sort(sortProfileArrayByName);
        setProfiles(newProfiles);
    };

    function handleProfileDetailUpdate(profileResponse: IProfileResponse) {

      const newProfileList = [...profiles].map(item => {
        return item.profileId === profileResponse.profile.profileId? profileResponse.profile: item;
      }).sort(sortProfileArrayByName)

      setProfiles(newProfileList);

      setOpenProfileDetail(false);
      setSelectedProfile(undefined);
    };

    function handleEditProfile (profile: IProfileModel){
      setOpenProfileDetail(true);
      setKeyProfileKey(profile.profileId);
      setSelectedProfile(profile);
    };

    function handleProfileDetailCreate(profileResponse: IProfileResponse){

      addProfileToList(profileResponse);
      setOpenProfileDetail(false);
      setSelectedProfile(undefined);
    };

    function handleProfileDetailCancel() {
      setOpenProfileDetail(false);
      setSelectedProfile(undefined);
    };

    function handleDeleteProfileConfirmDialog(){
      setDeleteProfileResponse(ProfilesService.deleteProfileAsync(selectedProfile?.profileId ?? 0));

      setOpenDeleteConfirm(false);
    };
  
    function sortProfileArrayByName(a: IProfileModel, b:IProfileModel ) {

      const aFirstName = a.firstName.toUpperCase();
      const aLastName = a.lastName.toLocaleUpperCase();

      const bFirstName = b.firstName.toUpperCase();
      const bLastName = b.lastName.toLocaleUpperCase();

      if (aLastName < aLastName) {
        return -1;
      }
      if (aLastName > bLastName) {
        return 1;
      }
      if (aFirstName <  bFirstName) {
        return -1;
      }
      if (aFirstName > bFirstName) {
        return 1;
      }
      return 0;
    };


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    return (
      <>
        <Grid container spacing={0} >
          <div>
            <h1>User Profiles</h1>
          </div>
        </Grid>
        <Grid container spacing={0} >
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
            <Hidden smUp={apiProfileDeleteLoading ? false : true} >
              <ProcessingDialog message='Profiles is being deleted...' />
            </Hidden>
          </Grid>
        </Grid>

        <Grid container spacing={2}  >
          <Grid item xs={6}>
            <form>
              <Grid 
              >
                <Grid container>
                  <Grid item xs={9} style={{padding: "0px 0px 0px 10px"}}>
                    <Tabs
                      value={profileActiveStatus}
                      indicatorColor="secondary" textColor='secondary'
                      onChange={handleProfileFilterChange}
                    >
                      <Tab label="Active" value="true" />
                      <Tab label="Inactive" value="false" />
                      <Tab label="All" value={null} />
                    </Tabs>
                  </Grid>
                  <Grid item xs={3} style={{textAlign:"right", whiteSpace:'nowrap' }} >
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
                  <TableHead >
                    <TableRow >
                      <StyledTableCell color='primary.main' >Name</StyledTableCell>
                      <StyledTableCell
                        style={{
                          width: 10,
                          display:
                            profileActiveStatus === null
                              ? ""
                              : "none"
                        }}
                      >
                        Status
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 150 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getProfileFilters().map((profile) => (
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
                          <Box whiteSpace='nowrap'>
                            <Button
                              size="small"
                              onClick={() => handleEditProfile(profile)}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleDeleteDialogOpen(profile)}
                            >
                              <Box color="error.main">
                                <DeleteIcon />
                              </Box>
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </form>
          </Grid>
          <Grid container item xs={6}>
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
                <Grid item xs={12} bgcolor="primary.main" >
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
                      onCreate={handleProfileDetailCreate}
                    />
                  </div>
                </Grid>
              </Grid>
            </Hidden>
            </Grid>
        </Grid>
        {openDeleteConfirm && (
          <ConfirmationDialog title='Profile Delete Dialog' message='Are you sure you want to delete the user profile?' openDialog = {openDeleteConfirm} onConfirm={handleDeleteProfileConfirmDialog} onClose={handleDeleteDialogClose}/>
        )}
      </>
    );
}