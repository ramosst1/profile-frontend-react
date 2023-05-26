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
  tableCellClasses,
  styled,
  Tooltip,
  IconButton,
  Collapse,
  Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProfilesService from '../services/profiles-service';
import { IProfileModel } from '../interfaces/profiles/profile-models';
import { IProfileResponse, IProfilesResponse} from '../interfaces/profiles/profile-responses';
import useServiceApiResponse from '../../../hooks/use-service-api-response';
import IErrorMessageModel from '../../../interfaces/api-error-message';
import { IApiResponse } from '../interfaces/profiles/api-response';
import ConfirmationDialog from '../../../components/ui/dialogs/confirmation-dialog';
import ProcessingDialog from '../../../components/ui/dialogs/processing-dialog';
import ErrorMessagesDisplay from '../../../components/ui/error_displays/error-messages-display';

export default function UserProfileList(
    props: {
      onProfileEdit:any, 
      onProfileDelete:any, 
      onProfileAdd:any, 
      onProfileAddCommitted:IProfileResponse,
      onProfileUpdateCommitted:IProfileResponse,
    }
){

    const [profileActiveStatus,setProfileActiveStatus] = useState("true");
    const[profiles , setProfiles] = useState<IProfileModel[]>([]);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<IProfileModel>();
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
      };


    }, [apiProfileDeleteResponse])

    useEffect(() => {

      if(props.onProfileAddCommitted?.profile !== undefined) {

        const newProfiles = [...profiles, props.onProfileAddCommitted.profile].sort(sortProfileArrayByName);
        setProfiles(newProfiles);
      }


    },[props.onProfileAddCommitted])

    useEffect(() => {

      if(props.onProfileUpdateCommitted?.profile !== undefined) {


        const newProfileList = [...profiles].map(item => {
          return item.profileId === props.onProfileUpdateCommitted.profile.profileId? props.onProfileUpdateCommitted.profile: item;
        }).sort(sortProfileArrayByName)

        setProfiles(newProfileList);
      }


    },[props.onProfileUpdateCommitted])


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
      setProfileActiveStatus(profileActiveStatus);
    };

    function handleDeleteDialogOpen(profile: IProfileModel){

      setSelectedProfile(profile);
      setOpenDeleteConfirm(true);
      props.onProfileDelete(profile)
    };

    function handleDeleteDialogClose(event: any){
      setOpenDeleteConfirm(false);
    };

    function handleAddProfile() {
      props.onProfileAdd();
    };

    function handleEditProfile (profile: IProfileModel){

      const newProfileList = [...profiles].map(item => {
      return item.profileId === profile.profileId? profile: item;
    }).sort(sortProfileArrayByName)


      props.onProfileEdit(profile);
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


    function Row(props: { profile: IProfileModel }) {

      const { profile } = props;
      const [openProfileDetailRow, setOpenProfileDetailRow] = React.useState(false);
    
      return (
        <>
          <TableRow key={profile.profileId} >
            <TableCell style={{borderBottom: 0}}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpenProfileDetailRow(!openProfileDetailRow)}
              >
                {openProfileDetailRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <Typography component='div'
                  style={{
                        color: 'rgba(0, 0, 0, 0.4)',
                          display:
                            profileActiveStatus === null
                              ? ""
                              : "none"
                        }}
              >
                {profile.active === true ? "Active" : "Inactive"}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row" style={{borderBottom: 0}}>
              {profile.firstName} {profile.lastName}
            </TableCell>
            <TableCell align="left" sx={{margin:0, padding:0,borderBottom:0}}>
              <Box whiteSpace='nowrap' sx={{margin:0, padding:0}}>
                <Tooltip title="Edit" >
                    <Button
                      size="small"
                      onClick={() => handleEditProfile(profile)} color='secondary'
                      sx={{margin:0, padding:0, border:0}}
                    >
                      <EditIcon style={{margin: 0, padding: 0}} />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete" arrow>
                  <Button
                    size="small"
                    onClick={() => handleDeleteDialogOpen(profile)}
                    sx={{margin:0, padding:0, border:0}}
                  >
                    <Box color="error.main">
                      <DeleteIcon style={{margin: 0, padding: 0}} />
                    </Box>
                  </Button>
                </Tooltip>
              </Box>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={3}>
              <Collapse in={openProfileDetailRow} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  {profile.addresses[0].address1}<br/>
                  {profile.addresses[0].address2 !== '' && (<>{profile.addresses[0].address2} <br/></>)}
                  {profile.addresses[0].city},{profile.addresses[0].stateAbrev} {profile.addresses[0].zipCode} 
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      );
    }
    


    return (
      <>
        <Grid container spacing={0} >
          <Grid item xs={12} >
              <ErrorMessagesDisplay errorMessages={errorMessages} />
          </Grid>
          <Grid item xs={12} >
              <ProcessingDialog open={apiProfilesLoading}message='Profiles are loading...' />
              <ProcessingDialog open={apiProfileDeleteLoading} message='Profiles is being deleted...' />
          </Grid>
        </Grid>

        <Grid container spacing={1} >
          <Grid item xs={12} md={12}>
            <form>
              <Grid
              >
                <Grid container>
                  <Grid item xs={9} style={{ padding: "0px 0px 0px 10px"}}>
                    <Tabs
                      value={profileActiveStatus}
                      indicatorColor="secondary" textColor='secondary'
                      onChange={handleProfileFilterChange}

                    >
                      <Tab label="Active" value="true" style={{fontSize: 13}} />
                      <Tab label="Inactive" value="false" style={{fontSize: 13}} />
                      <Tab label="All" value={null} style={{fontSize: 13}} />
                    </Tabs>
                  </Grid>
                  <Grid item xs={3} style={{textAlign:"right", whiteSpace:'nowrap' }} >
                  </Grid>
                </Grid>
              </Grid>

              <TableContainer
                component={Paper}
                sx={{ maxHeight: {md: 560, xs: 400} }}
                style={{ borderRadius: "15px" }}
              >
                <Table size="small" aria-label="a dense table" stickyHeader>
                  <TableHead >
                    <TableRow >
                    <StyledTableCell color='primary.main' style={{width:1}} ></StyledTableCell>
                      <StyledTableCell color='primary.main' >Name</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 150 }}>
                        <Button 
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ whiteSpace:'nowrap', paddingTop:0, paddingBottom:0, paddingLeft: 4, paddingRight:4, margin: 0, borderRadius: 25 }}
                          onClick={handleAddProfile}
                          startIcon={<PersonAddIcon />}
                        >
                          Add Profile
                        </Button>
                        
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getProfileFilters().map((profile) => (
                      <>
                        <Row key={profile.profileId} profile={profile} />
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </form>
          </Grid>
        </Grid>
        <ConfirmationDialog open={openDeleteConfirm} title='Profile Delete Dialog' message='Are you sure you want to delete the user profile?' openDialog = {openDeleteConfirm} onConfirm={handleDeleteProfileConfirmDialog} onClose={handleDeleteDialogClose}/>
      </>
    );
}