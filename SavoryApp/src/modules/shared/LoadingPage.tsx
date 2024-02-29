import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { AppDispatch, RootState } from '../../redux/store';

const LoadingPage = () => {
    const {nextPage, userId} = useParams();
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

    async function loadFilteredFeed() {
        setStatus('Loading Recipes...');
        await loadFilters();
        setStatus('Loading Complete...');
    }


        // loading functions
    async function loadBooks() {
        const userId = savoryUser?.user?.id || -1;
        // try {
        //     await dispatch(fetchBookmarks({userId}));
        // } catch(error){console.error("Error Fetching Bookmarks: ", error)}
    }

    async function loadUserPosts() {
        // try {
        //     await dispatch(fetchUserPosts({userId: Number(userId), username: nextPage}));
        // } catch(error){console.error("Error Fetching Bookmarks: ", error)}
    }
    async function loadRecipes() {
        const userId = savoryUser?.user?.id || -1;
        // dispatch(loadPage({loaded: true}))
        // try {
        //     await dispatch(fetchRecipes({userId, pageNumber}));
        // } catch(error){console.error("Error Fetching Recipes: ", error)}
    }


    async function loadFilters() {
        const tag = nextPage
        // dispatch(loadPage({loaded: true}))
        // try {
        //     await dispatch(fetchTaggedPosts({tag, pageNumber}));
        // } catch(error){console.error("Error Fetching Tagged Recipes: ", error)}
    }

    // effect
    useEffect(() => {
        if(!savoryUser || !savoryUser.user) return;
        if (nextPage === "bookmarks"){
            loadBookmarks();
        } else if (nextPage === "feed") {
            loadFeed();
        } else if (userId) {
            loadProfile();
        } else {
            loadFilteredFeed();
        }
    }, [savoryUser]);
    useEffect(() => {
        if(status != 'Loading Complete...') return;
        var page = "";
        if (nextPage === "bookmarks") {
            page = savoryUser.user?.username ? `/feed/bookmarks` : '/profile/edit'
        } else if (nextPage === "feed") {
            page = savoryUser.user?.username ? `/feed` : '/profile/edit'
        } else if (userId) {
            page = savoryUser.user?.username ? `/profile/${nextPage}` : '/profile/edit'
        } else {
            page = savoryUser.user?.username ? `/feed/${nextPage}` : '/load/feed'
        }
        // navigate(`${page}`);
    },[status]);
    // display
    return(
      <Box>
        <Typography variant='h3' mt='5vh'>Loading...</Typography>
        <Typography mb='5vh'>{status}</Typography>
        <CircularProgress />
      </Box>
    );
};
  
export default LoadingPage;