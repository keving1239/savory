import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUser } from '../../redux/User/user-slice';
import { fetchRecipes, loadPage, fetchBookmarks, fetchUserPosts } from '../../redux/Recipes/recipes-slice';
import { fetchInteractions } from '../../redux/Interactions/interactions-slice';

const LoadingPage = () => {
    const {nextPage, userId} = useParams();
    console.log("NEXT PAGE: " + nextPage)
    // redux state
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const pageNumber = useSelector((state: RootState) => state.persistedReducer.recipesReducer.page);
    const savoryUser = useSelector((state: RootState) => state.persistedReducer.userReducer);
    // loading resources
    const [status, setStatus] = useState('Loading...');
    async function loadFeed() {
        setStatus('Loading Recipes...');
        await loadRecipes();
        setStatus('Loading Interactions...');
        await loadInteractions();
        setStatus('Loading Complete...');
    }

    async function loadBookmarks() {
        setStatus('Loading Bookmarks...');
        await loadBooks();
        setStatus('Loading Complete...');
    }

    async function loadProfile() {
        setStatus('Loading Profile...');
        await loadUserPosts();
        setStatus('Loading Complete...');
    }

        // loading functions
    async function loadBooks() {
        const userId = savoryUser?.user?.id || -1;
        try {
            await dispatch(fetchBookmarks({userId}));
        } catch(error){console.error("Error Fetching Bookmarks: ", error)}
    }

    async function loadUserPosts() {
        try {
            await dispatch(fetchUserPosts({userId: Number(userId), username: nextPage}));
        } catch(error){console.error("Error Fetching Bookmarks: ", error)}
    }
    async function loadRecipes() {
        const userId = savoryUser?.user?.id || -1;
        dispatch(loadPage({loaded: true}))
        try {
            await dispatch(fetchRecipes({userId, pageNumber}));
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
        if(!savoryUser || !savoryUser.user) return;
        if (nextPage === "bookmarks"){
            loadBookmarks();
        } else if (nextPage === "feed") {
            loadFeed();
        } else {
            loadProfile();
        }
    }, [savoryUser]);
    useEffect(() => {
        if(status != 'Loading Complete...') return;
        var page = "";
        if (nextPage === "bookmarks") {
            page = savoryUser.user?.username ? `/feed/bookmarks` : '/profile/edit'
        } else if (nextPage === "feed") {
            page = savoryUser.user?.username ? `/feed` : '/profile/edit'
        } else {
            page = savoryUser.user?.username ? `/profile/${nextPage}` : '/profile/edit'
        }
        navigate(`${page}`);
    },[status]);
    // display
    return(
      <Box>
        <Typography variant='h2' mt='10vh'>Loading</Typography>
        <Typography mb='10vh'>{status}</Typography>
        <CircularProgress />
      </Box>
    );
};
  
export default LoadingPage;