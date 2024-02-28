import React from 'react';
import { Typography, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.persistedReducer.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    const buttons:{text: string, color: 'primary' | 'error'}[] = [
        {text: 'Request Username Change', color: 'primary'},
        {text: 'Request Email Change', color: 'primary'},
        {text: 'Delete Account', color: 'error'},
    ];
    const switches = [
        {text: 'Dark Mode (Beta)', defaultChecked: false},
        {text: 'Email Notifications', defaultChecked: true},
        {text: 'Infinite Scroll', defaultChecked: false},
    ];
    const links= [
        {text: 'Learn About Savory', to: '/info'},
        {text: 'FAQ Page', to: '/faq'},
        {text: 'Contact Support', to: '/support'},
        {text: 'Report an Issue', to: '/report'},
        {text: 'Privacy Policy', to: '/policy'},
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
                        <FormControlLabel control={<Switch defaultChecked={swich.defaultChecked} />} label={swich.text}/>
                        </Grid></Grid>   
                    ))}
                    {buttons.map((button, index) => (
                        <Grid container item justifyContent={'center'} md={1.75} lg={1.5} xl={1.25} key={index}>
                        <Grid item md={10} lg={8} xl={6}>
                            <Button variant='contained' fullWidth color={button.color}>{button.text}</Button>    
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
        </>
    );
}

export default Settings;