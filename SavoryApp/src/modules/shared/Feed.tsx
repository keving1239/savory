import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Grid, Tooltip, Typography, Card,
    CardMedia, Avatar, IconButton, Modal, Button, CircularProgress
} from '@mui/material';
import React from 'react';
import {
    CropFree, Share, Bookmark, BookmarkBorder,
    Favorite, Assistant, FavoriteBorder, Close, Edit
} from '@mui/icons-material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Post from '../pages/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../redux/store';
import { postInteraction, updateInteraction, deleteInteraction } from '../../redux/Interactions/interactions-slice';
import { Recipe, changePage } from '../../redux/Recipes/recipes-slice';

export default function Feed({id}: {id?: number}) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    // redux
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const feed = useSelector((state: RootState) => state.persistedReducer.recipesReducer.recipes);
    var pageNumber = useSelector((state: RootState) => state.persistedReducer.recipesReducer.page);
    // params
    const { username } = useParams();
    const { post } = useParams();
    const { query } = useParams();
    const { interaction } = useParams();
    // state
    const [open, setOpen] = useState(Boolean(id) && Boolean(post));
    const [currentPost, setcurrentPost] = useState(id || -1);
    const [recipes, setRecipes] = useState<Record<number, Recipe>>({});
    const [page, setPage] = useState(0);

    const length = Object.keys(recipes).length;
    // load recipes
    function loadRecipes() {
        if(username) loadProfile()
        else if(interaction) loadBookmarks();
        else if(query) loadSearch();
        else setRecipes(feed);
    }
    async function loadProfile() {
        try {
            const findProfile = await fetch(`http://localhost:8080/api/person/byUsername/${username}`, fetchOptions({
                method: 'GET'
            }));
            const profile = await findProfile.json();
            const response = await fetch(`http://localhost:8080/api/posts/byUserId/${profile.id}`, fetchOptions({
                method: 'GET'
            }));
            const data = await response.json();
            const recipeItems:Record<number, Recipe> = {};
            data.forEach((item: any) => {
                recipeItems[item.postId] = {
                    tags: item.tags?.split(',') || [], id: item.postId, userId: item.userId, title: item.headline,
                    img: item.img, date: item.postdate, ingredients: item.ingredients?.split(',') || [], recipe: item.recipe, author: username || '',
                }
             });
            setRecipes(recipeItems);
        } catch(error) {console.error(error);}
    }
    async function loadBookmarks() {
        try {
            if(!user) return;
            const response = await fetch(`http://localhost:8080/api/posts/bookmarked/${user.id}`, fetchOptions({
                method: 'GET',
            }));
            const data = await response.json();
            const recipeItems:Record<number, Recipe> = {};
            data.forEach((item: any) => {
                recipeItems[item.postId] = {
                    tags: item.tags?.split(',') || [], id: item.postId, userId: item.userId, title: item.headline,
                    img: item.img, date: item.postdate, ingredients: item.ingredients?.split(',') || [], recipe: item.recipe, author: item.username,
                }
             });
            setRecipes(recipeItems);
        } catch(error){console.error(error);}
    }
    async function loadSearch() {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/search/${query}`, fetchOptions({
                method: 'GET',
            }));
            const data = await response.json();
            const recipeItems:Record<number, Recipe> = {};
            data.forEach((item: any) => {
                recipeItems[item.postId] = {
                    tags: item.tags?.split(',') || [], id: item.postId, userId: item.userId, title: item.headline,
                    img: item.img, date: item.postdate, ingredients: item.ingredients?.split(',') || [], recipe: item.recipe, author: item.username,
                }
             });
             console.log(recipeItems)
            setRecipes(recipeItems);
        } catch(error) {console.error(error);}
    }
    useEffect(() => {
        loadRecipes();
    }, [query, interaction, username]);
    useEffect(() => {
        // Check if the object is still empty after 10 seconds
        const timer = setTimeout(() => {
            if (Object.keys(recipes).length === 0) navigate('/');
        }, 10000);
        return () => clearTimeout(timer);
    }, [recipes]);

    // Handlers
    const openHandler = (id: number) => {
        setcurrentPost(id);
        setOpen(true);
    }
    const closeHandler = () => {
        setcurrentPost(0);
        setOpen(false);
    }

    const handleNextPage = () => {
        pageNumber = pageNumber + 1
        // dispatch(changePage({ pageNumber: pageNumber }));
        // var page = '';
        // if (filters) {
        //     page = `/load/${filters}`;
        // } else {
        //     page = `/load/feed`
        // }
        // navigate(`${page}`);
    };
    const handlePreviousPage = () => {
        pageNumber = pageNumber - 1;
        // dispatch(changePage({ pageNumber: pageNumber }));
        // var page = '';
        // if (filters) {
        //     page = `/load/${filters}`;
        // } else {
        //     page = `/load/feed`
        // }
        // navigate(`${page}`);
    };

    return (
        <Box>
            { (Object.keys(recipes).length > 0) ? 
            <><RecipePopup {...{ open, username: user?.username || '', recipe: recipes[currentPost], closeHandler }} />
            <Grid container rowGap={5} justifyContent={'space-around'}>
                {Object.values(recipes).map((recipe) => {
                    return (recipe.id > 0 && recipes[recipe.id]) ?
                        <RecipeItem {...{ recipe, key: recipe.id, openHandler }} />
                        : null;
                })}
            </Grid>
            <Box sx={{ marginTop: "50px" }}>
                {pageNumber === 1 ?
                    null : (
                        <Button sx={{ marginRight: "30px", width: "100px" }} variant='contained' color='primary' id="prevButton" onClick={handlePreviousPage}> Previous </Button>
                    )}
                {length === 12 ?
                    <Button sx={{ width: "100px", marginLeft: "30px" }} variant='contained' color='primary' id="nextButton" onClick={handleNextPage}> Next </Button>
                    : null }
            </Box></>
            :
            <Box>
              <Typography variant='h3' mt='5vh'>Loading...</Typography>
              <Typography mb='5vh'>Fetching Recipes...</Typography>
              <CircularProgress />
            </Box>
            }
        </Box>
    );
}

const RecipeAvatar = ({ author }: { author: string }) => {
    return (
        <Tooltip title={author}>
            <Link to={`/feed/${author}`}><IconButton>
                <Avatar aria-label="recipe" src=''>
                    {author.charAt(0).toUpperCase()}
                </Avatar></IconButton></Link>
        </Tooltip>
    );
}

const RecipeExpandButton = ({ id, openHandler }: { id: number, openHandler: (id: number) => void }) => {
    return (
        <Tooltip title='Expand Post'>
            <IconButton onClick={() => { openHandler(id) }}>
                <CropFree />
            </IconButton>
        </Tooltip>
    );
}

const RecipeItem = ({ recipe, openHandler }: { recipe: Recipe, openHandler: (id: number) => void }) => {
    // state
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const interaction = useSelector((state: RootState) => state.persistedReducer.interactionsReducer.interactions[recipe.id]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    // handlers
    const likeHandler = () => {
        if (!interaction) return dispatch(postInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: true, bookmarked: false }))
        else if (interaction.liked && !interaction.bookmarked) dispatch(deleteInteraction({ postId: recipe.id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: !interaction.liked, bookmarked: interaction.bookmarked }));
    }
    const bookmarkHandler = () => {
        if (!interaction) return dispatch(postInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: false, bookmarked: true }))
        else if (!interaction.liked && interaction.bookmarked) dispatch(deleteInteraction({ postId: recipe.id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: interaction.liked, bookmarked: !interaction.bookmarked }));
    }
    const exploreHandler = () => {
        if(!recipe) return;
        navigate(`/feed/search/${recipe.title + ' ' + recipe.tags?.join(' ')}`);
    }
    const shareHandler = async () => {
        try {
            const location = window.location.href;
            const feed = location.search('/feed');
            const url = feed > 0 ? location.substring(0, feed) + '/profile/' + recipe.author : location;
            await navigator.clipboard.writeText(url + '/' + recipe.id);
        } catch (error) {console.error(error);}
    }
    // Recipe Card
    return (
        <Grid item xs={9} sm={5.75} md={3.5} key={recipe.id}>
            <Card elevation={4}>
                <CardHeader
                    title={
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Grid item><RecipeAvatar author={recipe.author}/></Grid>
                            <Grid item xs={8}><Typography variant='h5' noWrap>{recipe.title}</Typography></Grid>
                            <Grid item><RecipeExpandButton {...{ id: recipe.id, openHandler }} /></Grid>
                        </Grid>
                    }
                    style={{ height: '6.5vh', padding: '.5vh', display: 'block' }}
                />
                <CardMedia
                    component="img"
                    image={recipe.img}
                    alt={recipe.title}
                    style={{ height: '30vh' }}
                    sx={{ objectFit: "cover" }} />
                <CardActions disableSpacing style={{ height: '5vh' }}>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item><Grid container>
                            <Grid item><IconButton onClick={likeHandler}>
                                {interaction && interaction.liked ? <Favorite color='error' /> : <FavoriteBorder />}
                            </IconButton></Grid>
                            <Grid item><IconButton onClick={exploreHandler}>
                                <Assistant />
                            </IconButton></Grid>
                            <Grid item><IconButton onClick={shareHandler}>
                                <Share />
                            </IconButton></Grid>
                        </Grid></Grid>
                        <Grid item><IconButton onClick={bookmarkHandler}>
                            {interaction && interaction.bookmarked ? <Bookmark color='secondary' /> : <BookmarkBorder />}
                        </IconButton></Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}

const RecipePopup = ({ open, username, recipe, closeHandler }: { open: boolean, username: string, recipe: Recipe, closeHandler: () => void }) => {
    return (
        <Modal
            open={open}
            onClose={closeHandler}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', outline: 'none', border: 'none' }}>
                {recipe && username === recipe.author ? 
                <Link to = {`/post/edit/${recipe.id}`}><IconButton onClick={closeHandler} style={{ position: 'absolute', top: 0, left: 5 }}>
                    <Edit />
                </IconButton></Link>
                : <></>
                }
                <IconButton onClick={closeHandler} style={{ position: 'absolute', top: 0, right: 5 }}>
                    <Close />
                </IconButton>
                <Post recipe={recipe} />
            </div>
        </Modal>
    );
}