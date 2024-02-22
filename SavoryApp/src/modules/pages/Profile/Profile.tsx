import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Box, IconButton } from '@mui/material';
import {Favorite, FavoriteBorder, Link, Edit} from '@mui/icons-material';
import ProfileFeed from '../../shared/ProfileFeed';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchLocalUser } from '../../../redux/User/user-slice';

const Profile = () => {
    const {username, post} = useParams();
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const navigate = useNavigate();
    const isOwner = user?.username === username;
    const [status, setStatus] = useState(true);
  //  const displayedUser = {id: 420, username: 'you.found.me', img: 'logo512.png', bio: 'I am the one you have been searching for', role: false};
    const dispatch = useDispatch<AppDispatch>();
    async function loadLocalUser() {
        if (username) {
            try {
                await dispatch(fetchLocalUser({ username }));
            } catch(error){console.error("Error Fetching Local User: ", error)}
        }
    }
        useEffect(() => {
          const loader = async () => {
            // Perform asynchronous operations
            await loadLocalUser();
            setStatus(false); // Set isLoading to false when loading completes
          };
          loader();
          if (!status) {
            const page = `/profile/${username}`
            navigate(`${page}`);
          }
        }, []);


    function handleProfileAction() {
        if(isOwner) return navigate(`/profile/edit`);
        console.log(`Liked ${username}'s blog`);
    }
    const localUser = useSelector((state: RootState) => state.persistedReducer.userReducer.localUser);
    const displayedUser = isOwner ? user : localUser;


    return(
        <Box>
            <Paper sx={{p: '1.5vh', margin: '4vh auto', maxWidth: '70vw', backgroundColor: 'primary.light'}}>
                <Grid container direction={'row'} justifyContent={'space-around'} alignItems={'flex-start'}>
                    <Grid item xs={6}>
                    <Paper 
                            component='img'
                            alt={displayedUser?.username}
                            src={displayedUser?.img}
                            sx={{minHeight: '37vh', minWidth: '34vw', 
                            maxHeight: '37vh', maxWidth: '34vw', objectFit: 'cover'}}/>
                    </Grid>
                    <Grid item xs={5.5}><Grid container direction={'column'} justifyContent={'space-between'}>
                        <Typography maxWidth='100%' variant='h4' noWrap>{displayedUser?.username}</Typography>
                        <br></br>
                        <Typography maxWidth='100%' maxHeight='37vh' overflow='hidden'>{displayedUser?.bio}</Typography>
                    </Grid></Grid>
                    <Grid item xs={0.5}><Grid container direction={'column'} justifyContent={'space-between'}>
                        <Grid item>
                            <IconButton onClick={() => {handleProfileAction();}}>
                                {isOwner ? <Edit/> : <FavoriteBorder/>}
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => {navigator.clipboard.writeText(window.location.href);}}>
                                <Link/>
                            </IconButton>
                        </Grid>
                    </Grid></Grid>
                </Grid>
            </Paper>                      
            <ProfileFeed id = {displayedUser?.id}></ProfileFeed>
        </Box>
    );
}

export default Profile;