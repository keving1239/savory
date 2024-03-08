import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, TextField, Card, CardContent, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../../redux/store';
import { updateUser } from '../../../redux/User/user-slice';
import { height } from '@mui/system';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const isAuthenticated = useSelector((state: RootState) => state.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    const [blogUsername, setBlogUsername] = useState(user?.username || '');
    const [blogImg, setBlogImg] = useState(user?.img || '');
    const [blogBio, setBlogBio] = useState(user?.bio || '');
    const [usernameError, setUsernameError] = useState({error: false, helperText: ''});

    const handleProfileEdits = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user) return;
        // ensure username is unique
        if(!user.username) {
            try {
                const checkUsername = await fetch(`${process.env.REACT_APP_URL_KEY}/api/person/usernameExists/${blogUsername}`, fetchOptions({
                    method: 'GET',
                }));
                const exists = await checkUsername.json();
                if(exists) return setUsernameError({error: true, helperText: 'Username is already in use.'})
                const isValid = /^[\w\.]{3,30}$/.test(blogUsername);
                if(!isValid) return setUsernameError({error: true, helperText: 'Only letters, numbers, "_", or "." and 3-30 characters'});
                setUsernameError({error: false, helperText: ''});
            } catch(error){console.error(error);}
        }
        await dispatch(updateUser({id: user.id, username: user.username || blogUsername, 
            email: user.email, img: blogImg, bio: blogBio}));
        navigate(`/profile/${user.username || blogUsername}`);
    }

    return (
        <Grid container justifyContent='center' alignItems='stretch' >
            <Grid item xs={12}>
                <Typography variant='h4' sx={{mb: '1vh'}}>
                    {user?.username ? 'Update your Profile' : 'Create your Profile'}
                </Typography>
            </Grid>
            <Grid container item md={12} lg={7} sx={{bgcolor: 'primary.light'}} alignItems='center' justifyContent='space-around'>
                <Grid item xs={8}>
                    <Paper 
                    component='img'
                    alt={blogUsername}
                    src={user?.img}
                    sx={{minHeight: '40vh', minWidth: '34vw', margin: '2vh 0',
                    maxHeight: '40vh', maxWidth: '34vw', objectFit: 'cover'}}/>
                </Grid>
                <Grid item xs={4}><Grid container direction={'column'} justifyContent={'space-between'}>
                    <Typography maxWidth='100%' variant='h4' noWrap>{blogUsername}</Typography>
                    <br></br>
                    <Typography maxWidth='100%' maxHeight='40vh' overflow='hidden'>{blogBio}</Typography>
                </Grid></Grid>
            </Grid>
        <Grid container item md={12} lg={5} sx={{bgcolor: 'primary.light'}}>
            <Card style={{ maxWidth: '85%', margin: '0 auto', marginTop: 50, marginBottom: 50, padding: 10 }}>
                <CardContent>
                    <form onSubmit={(e) => handleProfileEdits(e)}>
                    {!user?.username ? <TextField
                        type='text'
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        {...usernameError}
                        margin= 'normal'
                        value={blogUsername}
                        onChange={(e) => {setBlogUsername(e.target.value)}}
                    /> : <></>}
                    <TextField 
                        type="text"
                        label="Image URL"
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        placeholder='https://images.unsplash.com/...'
                        value = {blogImg}  
                        onChange={(e) => {setBlogImg(e.target.value)}}
                    />
                    <TextField
                        type='text'
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={5}
                        maxRows={5}
                        margin="normal"
                        value={blogBio}
                        onChange={(e) => {setBlogBio(e.target.value)}}/>
                    <span></span>
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
        </Grid>
    );
}

export default ProfileEdit;
