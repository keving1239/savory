import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import React from 'react';
import { AppDispatch, RootState, fetchOptions } from '../../redux/store';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUser } from '../../redux/User/user-slice';
import { fetchRecipes } from '../../redux/Recipes/recipes-slice';
import { fetchInteractions } from '../../redux/Interactions/interactions-slice';

const LoadingAccount = () => {
    // redux state
    const savoryUser = useSelector((state: RootState) => state.userReducer);
    // auth0 state
    const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // loading resources
    const [status, setStatus] = useState('Waiting for Login...');
    async function login() {
        const token = await getAccessTokenWithPopup({
            authorizationParams: {
                audience: 'https://dev-t6vspuc8qrssaarc.us.auth0.com/api/v2/',
                prompt: 'login',
            },
            cacheMode: 'off',
        }) || '';
        Cookies.set('jwtToken', token, {
            htppOnly: true,
            expires: 1,
            path: '/',
            secure: true,
            sameSite: 'strict',
        });
        setStatus('Loading...');
    }
    async function loadProfile() {
        setStatus('Loading Profile...');
        await loadUser();
        setStatus('Loading Recipes...');
    }
    async function loadFeed() {
        await loadRecipes();
        setStatus('Loading Interactions...');
        await loadInteractions();
        setStatus('Loading Complete...');
    }
    // loading functions
    async function loadUser() {
        const email = (user ? user?.email : '') as string;
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_KEY}/api/auth/isAdmin`, fetchOptions({
                method: 'GET',
            }));
            const isAdmin = await response.json();
            await dispatch(fetchUser({ email, isAuthenticated, isAdmin }));
        } catch(error){console.error("Error Fetching User: ", error)}
    }
    async function loadRecipes() {
        const userId = savoryUser?.user?.id || -1;
        try {
            await dispatch(fetchRecipes({pageNumber: 1}));
        } catch(error){console.error("Error Fetching Recipes: ", error)}
    }
    async function loadInteractions() {
        const userId = savoryUser?.user?.id || -1;
        try {
            await dispatch(fetchInteractions({userId}));
        } catch(error){console.error("Error Fetching Interactions: ", error)}
    }
    // effect
    useEffect(() => {
        login();
    }, []);
    useEffect(() => {
        if(!isAuthenticated || !user || status != 'Loading...') return;
        loadProfile();
    }, [isAuthenticated, user, status]);
    useEffect(() => {
        if(!savoryUser || !savoryUser.user || status != 'Loading Recipes...') return;
        loadFeed();
    }, [savoryUser, status]);
    useEffect(() => {
        if(status != 'Loading Complete...') return;
        const page = savoryUser.user?.username ? '/feed' : '/profile/edit'
        navigate(`${page}`);
    },[status]);
    // display
    return(
      <Box>
        <Typography variant='h2' mt='5vh'>Welcome</Typography>
        <Typography mb='5vh'>{status}</Typography>
        <CircularProgress />
      </Box>
    );
    return <></>
};
  
export default LoadingAccount;