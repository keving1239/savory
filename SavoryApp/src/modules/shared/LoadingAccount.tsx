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
    const savoryRecipes = useSelector((state: RootState) => state.recipes);
    const savoryInteractions = useSelector((state: RootState) => state.interactions);
    // auth0 state
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // loading status
    const [status, setStatus] = useState('Loading...');
    useEffect(() => {
        setStatus('Loading Profile...');
        const timeout = setTimeout(() => {
            loadUser();
        }, 3000);
        return () => clearTimeout(timeout);
    },[isAuthenticated, user]);
    useEffect(() => {
        setStatus('Loading Recipes...');
        const timeout = setTimeout(() => {
            loadRecipes();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [savoryUser]);
    useEffect(() => {
        setStatus('Loading Interactions...');
        const timeout = setTimeout(() => {
            loadInteractions();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [savoryRecipes]);
    useEffect(() => {
        setStatus('Loading Complete...');
        const timeout = setTimeout(() => {
            loadLandingPage();
        }, 10000);
        return () => clearTimeout(timeout);
    }, [savoryInteractions]);
    // loading functions
    async function loadUser() {
        if(!isAuthenticated || !user) return;
        try {
            const email = (user ? user?.email : '') as string;
            const token = await getAccessTokenSilently();
            dispatch(fetchUser({ email, isAuthenticated, token }));
        } catch(error){console.error("Error Fetching User: ", error)}
    }
    function loadRecipes() {
        const userId = savoryUser.user ? savoryUser.user?.id : -1;
        if (userId < 0) return;
        try {
            dispatch(fetchRecipes({userId}));
        } catch(error){console.error("Error Fetching Recipes: ", error)}
    }
    function loadInteractions() {
        const userId = savoryUser.user ? savoryUser.user?.id : -1;
        if (userId < 0) return;
        try {
            dispatch(fetchInteractions({userId}));
        } catch(error){console.error("Error Fetching Interactions: ", error)}
    }
    function loadLandingPage() { 
        if(savoryUser.error || savoryRecipes.error || savoryInteractions.error) return;
        navigate('/feed');
    }
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