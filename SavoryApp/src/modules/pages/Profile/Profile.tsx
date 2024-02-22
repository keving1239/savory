import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid, Paper, Box, IconButton } from '@mui/material';
import {Favorite, FavoriteBorder, Link, Edit} from '@mui/icons-material';
import Feed from '../../shared/Feed';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const Profile = () => {
    const {username, post} = useParams();
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const navigate = useNavigate();
    const isOwner = user?.username === username;
    const displayedUser = isOwner ? user : retrieveUser();
    function retrieveUser() {    
        // const response = await fetch(`http://localhost:8080/api/person/username/${username}`);
        // const data = await response.json();
        // const found = {id: data.id, username: data.username, 
        // img: data.img, bio: data.bio, role: data.admin};
        return {id: 420, username: 'you.found.me', img: 'logo512.png', bio: 'I am the one you have been searching for', role: false};
    }
    function handleProfileAction() {
        if(isOwner) return navigate(`/profile/edit`);
        console.log(`Liked ${username}'s blog`);
    }

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
            {post ? <Feed id={+post}/> : <Feed/>}
        </Box>
    );
}

export default Profile;