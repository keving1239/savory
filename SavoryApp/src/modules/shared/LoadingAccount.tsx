import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUser } from '../../redux/User/user-slice';
import { fetchRecipes } from '../../redux/Recipes/recipes-slice';
import { fetchInteractions } from '../../redux/Interactions/interactions-slice';

const LoadingAccount = () => {
    // redux state
    const savoryUser = useSelector((state: RootState) => state.user);
    // auth0 state
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // loading resources
    const [status, setStatus] = useState('Loading...');
    async function loadUserResources() {
        setStatus('Loading Profile...');
        await loadUser();
        setStatus('Loading Recipes...');
        await loadRecipes();
        setStatus('Loading Interactions...');
        await loadInteractions();
        setStatus('Loading Complete...');
    } 
    // loading functions
    async function loadUser() {
        const email = (user ? user?.email : '') as string;
        try {
            const token = await getAccessTokenSilently();
            await dispatch(fetchUser({ email, isAuthenticated, token }));
        } catch(error){console.error("Error Fetching User: ", error)}
    }
    async function loadRecipes() {
        const userId = savoryUser.user ? savoryUser.user?.id : -1;
        try {
            await dispatch(fetchRecipes({userId}));
        } catch(error){console.error("Error Fetching Recipes: ", error)}
    }
    async function loadInteractions() {
        const userId = savoryUser.user ? savoryUser.user?.id : -1;
        try {
            await dispatch(fetchInteractions({userId}));
        } catch(error){console.error("Error Fetching Interactions: ", error)}
    }
    // effect
    useEffect(() => {
        if(!isAuthenticated || !user) return;
        loadUserResources();
    }, [isAuthenticated, user]);
    useEffect(() => {
        if(status != 'Loading Complete...') return;
        const page = savoryUser.user?.username ? '/feed' : '/profile/edit'
        navigate(`${page}`);
    },[status]);
    // display
    return(
      <Box>
        <Typography variant='h2' mt='10vh'>Welcome</Typography>
        <Typography mb='10vh'>{status}</Typography>
        <CircularProgress />
      </Box>
    );
};
  
export default LoadingAccount;