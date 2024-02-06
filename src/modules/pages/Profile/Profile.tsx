import React from 'react';
import { useState } from 'react';
import { Typography, Grid, Button, Stack, MenuItem, Menu, Paper, Box, IconButton } from '@mui/material';
import {Edit, Share, Group} from '@mui/icons-material'
import ProfileTile from './Profile.tile';
import Feed from '../../shared/Feed';

const Profile = ({username}: {username: string}) => {
    // To be retrieved by REST API and use state *******************************
    const tile = {name: username, imgSrc: '', bio: 'hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! hello world! '};  
    const stats = {likes: 189, followers: 18, following: 42};
    const isOwner = false;
    const [ownerOptions, setOwnerOptions] = useState(isOwner) // Will need to raise level to change on logout/login/session user
    // *************************************************************************
    // LOGIC FROM NAVBAR - TO CHANGE *******************************************
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const followOptions = ['Follow', 'Block'];
    // **************************************************************************    
    return(
        <Box sx={{ mt: 5 }}>
            <Paper
            elevation={2}
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: '50vw',
                flexGrow: 1,
                backgroundColor: 'primary.light'}}
            ><Grid container direction={'row'} columnSpacing={3} justifyContent={'center'} alignItems={'flex-start'}>
                    <Grid item><ProfileTile {...tile}/></Grid>
                    <Grid item><ProfileStats {...stats}/></Grid>
                    <Grid item><Grid container direction={'column'} justifyContent={'space-between'}>
                        {ownerOptions && <Grid item><IconButton><Edit sx={{ color: 'primary.dark' }}></Edit></IconButton></Grid>}
                        {!ownerOptions && <Grid item><IconButton onClick={handleOpenUserMenu}><Group sx={{ color: 'primary.dark' }}></Group></IconButton>
                            <Menu keepMounted
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                                {followOptions.map((option) => (
                                    <MenuItem key={option} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{option}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu></Grid>}
                        <Grid item><IconButton><Share sx={{ color: 'primary.dark' }}></Share></IconButton></Grid>
                        {/* <Grid item><Button variant='contained' sx={{color: 'primary.dark'}} onClick={() => setOwnerOptions(!ownerOptions)}>L</Button></Grid> */}
                    </Grid></Grid>
            </Grid></Paper>
            <Feed></Feed>
        </Box>
    );
}

interface ProfileStatsProps {
    likes?: number,
    followers?: number,
    following?: number
}

const ProfileStats = ({likes, followers, following}: ProfileStatsProps) => {
    return (
    <Grid container direction ={'column'} spacing={4} justifyContent={'space-between'}>
        <Grid container item spacing={3} justifyContent={'space-between'}>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>Likes</Typography></Grid>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>{likes}</Typography></Grid>
        </Grid>
        <Grid container item spacing={3} justifyContent={'space-between'}>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>Followers</Typography></Grid>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>{followers}</Typography></Grid>
        </Grid>
        <Grid container item spacing={3} justifyContent={'space-between'}>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>Following</Typography></Grid>
            <Grid item><Typography color='primary.dark' variant='h5' align='left'>{following}</Typography></Grid>
        </Grid>
    </Grid>
    );
}


export default Profile;