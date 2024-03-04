import React, { useState } from 'react';
import { Typography, Button, Grid, Switch, FormControlLabel, TextFieldProps, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Card, CardContent, PaletteMode } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser, deleteUser } from '../../../redux/User/user-slice';
import { clearRecipes } from '../../../redux/Recipes/recipes-slice';
import { clearInteractions } from '../../../redux/Interactions/interactions-slice';
import { useAuth0 } from '@auth0/auth0-react';
import { setThemeMode } from '../../../redux/Theme/theme-slice';

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { logout } = useAuth0();
    const mode = useSelector((state: RootState) => state.persistedReducer.themeReducer.mode) as string;
    const userId = useSelector((state: RootState) => state.persistedReducer.userReducer.user?.id);
    const isAuthenticated = useSelector((state: RootState) => state.persistedReducer.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    // dialog state
    const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [darkSwitch, setDarkSwitch] = useState(mode === 'dark');
    const [emailSwitch, setEmailSwitch] = useState(true);
    const [feedSwitch, setFeedSwitch] = useState(false);
    // forms
    const usernameFormProps: TextFieldProps = {label: 'New Username', value: newUsername, onChange: (e) => setNewUsername(e.target.value), fullWidth: true, margin: 'dense'};
    const emailFormProps: TextFieldProps = {label: 'New Email', value: newEmail, onChange: (e) => setNewEmail(e.target.value), fullWidth: true, margin: 'dense'};
    const submitHandler = async (type: 'username' | 'email' | 'delete') => {
        setFormOpen(false);
        if(type === 'username') {
            setUsernameDialogOpen(false);
            navigate('/');
        } else if(type === 'email') {
            setEmailDialogOpen(false);
            navigate('/');
        } else {
            setDeleteDialogOpen(false);
            await dispatch(deleteUser({id: userId || -1}));
            dispatch(clearUser);
            dispatch(clearRecipes());
            dispatch(clearInteractions());
            await logout({ logoutParams: { returnTo: window.location.origin } });
        }
    }
    // component props
    const buttons:{text: string, color: 'primary' | 'error', onClick: () => void}[] = [
        {text: 'Request Username Change', color: 'primary', onClick: ()=>setUsernameDialogOpen(true)},
        {text: 'Request Email Change', color: 'primary', onClick: ()=>setEmailDialogOpen(true)},
        {text: 'Delete Account', color: 'error', onClick: ()=>setDeleteDialogOpen(true)},
    ];
    const switches = [
        {text: 'Dark Theme (Beta)', checked: darkSwitch, onchange: () => {
            dispatch(setThemeMode({mode: !darkSwitch ? 'dark' : 'light'}));
            setDarkSwitch(!darkSwitch);
        }},
        {text: 'Email Notifications', checked: emailSwitch, onchange: () => setEmailSwitch(!emailSwitch)},
        {text: 'Infinite Feed Scroll', checked: feedSwitch, onchange: () => setFeedSwitch(!feedSwitch)},
    ];
    const links = [
        {text: 'Learn About Savory', to: '/info'},
        {text: 'FAQ Page', to: '/faq'},
        {text: 'Contact Support', to: '/support'},
        {text: 'Report an Issue', to: '/report'},
        {text: 'Privacy Policy', to: '/policy'},
    ];
    const dialogs = [
        {title: 'Change your Username?', open: usernameDialogOpen, closeDialog: () => {
            setUsernameDialogOpen(false);
            setFormOpen(false);
        }, 
        text: 'Are you sure you want to change your username? This can only be done once per three months.', formProps: usernameFormProps,
        color: 'secondary', action: 'Continue', form: formOpen, openForm: () => setFormOpen(true), submit: () => submitHandler('username')},
        {title: 'Change your Email?', open: emailDialogOpen, closeDialog: () => {
            setEmailDialogOpen(false);
            setFormOpen(false);
        }, 
        text: 'Are you sure you want to change your Email? This can only be done once per six months.', formProps: emailFormProps,
        color: 'secondary', action: 'Continue', form: formOpen, openForm: () => setFormOpen(true), submit: () => submitHandler('email')},
        {title: 'Delete your account?', open: deleteDialogOpen, closeDialog: () => {
            setDeleteDialogOpen(false);
            setFormOpen(false);
        }, 
        text: 'Are you sure you want to delete your account? This action cannot be undone. Your profile information and recipes will be lost.', formProps: {},
        color: 'error', action: 'Delete', form: false, openForm: () => submitHandler('delete'), submit: () => {}},
    ];
    return(
        <>
            <Typography variant='h3'>Settings Page</Typography>
            <Grid container justifyContent='space-around' alignItems='stretch' sx={{height: '75vh', mt: '5vh'}}>
                <Grid container item direction='column' xs={5}>
                    <Grid item md={1.75} lg={1.5} xl={1.25}>
                        <Typography variant='h4' textAlign='center'>Options</Typography>
                    </Grid>
                    {switches.map((swich, index) => (
                        <Grid container item justifyContent={'center'} md={1.5} lg={1.25} xl={1} key={index}>
                        <Grid item md={10} lg={8} xl={6}>
                        <FormControlLabel control={
                        <Switch checked={!!swich.checked} onChange={swich.onchange}/>}
                         label={swich.text}/>
                        </Grid></Grid>   
                    ))}
                    {buttons.map((button, index) => (
                        <Grid container item justifyContent={'center'} md={1.75} lg={1.5} xl={1.25} key={index}>
                        <Grid item md={10} lg={8} xl={6}>
                            <Button variant='contained' fullWidth color={button.color} onClick={button.onClick}>
                                {button.text}
                            </Button>    
                        </Grid></Grid>
                    ))}
                </Grid>
                <Grid container item direction='column' xs={5}>
                    <Grid item md={1.75} lg={1.5} xl={1.25}>
                        <Typography variant='h4' textAlign='center'>Useful Links</Typography>
                    </Grid>
                    {links.map((link, index) =>(
                        <Grid container item justifyContent={'center'} md={1.75} lg={1.5} xl={1.25} key={index}>
                        <Grid item md={8} lg={7} xl={6}>
                            <Link to={link.to}><Button variant='outlined' fullWidth>{link.text}</Button></Link>    
                        </Grid></Grid>
                    ))}
                </Grid>
            </Grid>
            {dialogs.map((dialog, index) => (
                <Dialog open={dialog.open} onClose={dialog.closeDialog} key={index}>
                <DialogTitle>{dialog.title}</DialogTitle>
                <DialogContent>
                    {dialog.form ? 
                    <Card elevation={0} sx={{maxWidth: '40vw'}}>
                    <CardContent>
                    <form onSubmit={dialog.submit}>
                        <TextField {...dialog.formProps}/>
                        <Grid container justifyContent='space-around' sx={{width: '25vw', mt: '1vh'}}>
                            <Grid item><Button variant='outlined' onClick={dialog.closeDialog}>Cancel</Button></Grid>
                            <Grid item><Button variant='contained' type='submit'>Submit</Button></Grid>
                        </Grid>
                    </form>
                    </CardContent>
                    </Card>
                    : <DialogContentText>{dialog.text}</DialogContentText>}
                </DialogContent>
                <DialogActions>
                    {dialog.form ? 
                    <></>
                    : <><Button onClick={dialog.closeDialog} variant='outlined'>Cancel</Button>
                    <Button onClick={dialog.openForm} variant='outlined' 
                    color={(dialog.color === 'error' || dialog.color === 'secondary') ? dialog.color : 'primary' }>{dialog.action}</Button></>}
                </DialogActions>
            </Dialog>
            ))}
        </>
    );
}

export default Settings;