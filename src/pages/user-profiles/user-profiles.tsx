import React, {useState} from 'react';
import UserProfileList from './features/user-profile-list';
import UserProfileDetail from './features/user-profile-detail';
import {
  Grid,
  Paper,
  Box,
  Hidden
} from "@mui/material";
import { IProfileModel } from './interfaces/profiles/profile-models';
import { IProfileResponse} from './interfaces/profiles/profile-responses';
import ModalWindow from '../../components/ui/window-modals/modal_window';

export default function UserProfiles() {

  const [keyProfileKey,setKeyProfileKey] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<IProfileModel>();
  const [openProfileDetail, setOpenProfileDetail] = useState(false);

  const [createdProfileCommitted, setCreatedProfileCommitted] = useState<IProfileResponse>();
  const [updatedProfileCommitted, setUpdateProfileCommitted] = useState<IProfileResponse>();


  function handleDeleteDialogOpen(profile: IProfileModel){
    setSelectedProfile(profile);
  };

  function handleAddProfile() {

    setOpenProfileDetail(true)
    setKeyProfileKey(0);
    setSelectedProfile(undefined);
  };


  function handleProfileDetailUpdate(profileResponse: IProfileResponse) {

    setUpdateProfileCommitted(profileResponse);

    setOpenProfileDetail(false);
    setSelectedProfile(undefined);
  };

  function handleEditProfile (profile: IProfileModel){
    setOpenProfileDetail(true);
    setKeyProfileKey(profile.profileId);
    setSelectedProfile(profile);
  };

  function handleProfileDetailCreate(profileResponse: IProfileResponse){

    setCreatedProfileCommitted(profileResponse);
    setOpenProfileDetail(false);
    setSelectedProfile(undefined);
  };

  function handleProfileDetailCancel() {
    setOpenProfileDetail(false);
    setSelectedProfile(undefined);
  };

  return (
    <>
      <Grid container >
          <Grid item xs={12} md={6} >
            <UserProfileList
              onProfileEdit={handleEditProfile}
              onProfileDelete={handleDeleteDialogOpen}
              onProfileAdd={handleAddProfile}
              onProfileAddCommitted={createdProfileCommitted}
              onProfileUpdateCommitted={updatedProfileCommitted}
            />
          </Grid>
          <Grid item md={6} >
            <Grid item xs={12} md={8}>
            <Hidden smUp={openProfileDetail ? false : true} >
              <br/>&nbsp; <br/>
              <Box sx={{ flexGrow: 1,  display: { xs: 'none', md: 'flex' } }} mt={10}
                >
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
                        <Grid item xs={12} >
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
              </Box>
            </Hidden>
            </Grid>
          </Grid>
      </Grid>

      <ModalWindow xs={{ flexGrow: 1,  display: { xs: 'flex', md: 'none' } }}  open={openProfileDetail ? true : false} title='Profile Detail ' width='40%' onClose={handleProfileDetailCancel} >
        <UserProfileDetail
          key={keyProfileKey}
          profile={selectedProfile}
          onUpdate={handleProfileDetailUpdate}
          onCancel={handleProfileDetailCancel}
          onCreate={handleProfileDetailCreate}
        />
      </ModalWindow>
    </>
  )

}

