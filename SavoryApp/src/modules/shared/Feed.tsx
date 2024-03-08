import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Grid, Tooltip, Typography, Card, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent,
    CardMedia, Avatar, IconButton, Modal, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import React from 'react';
import {
    CropFree, Bookmark, BookmarkBorder, Report, Delete,
    Favorite, Assistant, FavoriteBorder, Close, Edit
} from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Post from '../pages/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../redux/store';
import { postInteraction, updateInteraction, deleteInteraction } from '../../redux/Interactions/interactions-slice';
import { Recipe, fetchRecipes, changePage, updateSort } from '../../redux/Recipes/recipes-slice';

export default function Feed() {
    // redux
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.userReducer.user);
    const sort = useSelector((state: RootState) => state.recipesReducer.sort) || 'newest';
    const feed = useSelector((state: RootState) => state.recipesReducer.recipes);
    const page = useSelector((state: RootState) => state.recipesReducer.page);
    const userInteractions = useSelector((state: RootState) => state.interactionsReducer.interactions);
    // params
    const { username } = useParams();
    const { post } = useParams();
    const { query } = useParams();
    const { interaction } = useParams();
    const location = useLocation();
    // state
    const [currentPost, setcurrentPost] = useState(Number(post) || -1);
    const [open, setOpen] = useState(currentPost > 0);
    const [recipes, setRecipes] = useState<Record<number, Recipe>>({});
    const [status, setStatus] = useState('Loading Recipes...');
    const [localPage, setLocalPage] = useState(1);
    const [bookmarkChange, setBookmarkChange] = useState(false);
    const [hasFeedPageChanged, setHasFeedPageChanged] = useState(false);
    const [hasSortChanged, setHasSortChanged] = useState(false);
    const feedType = username ? '' : 
    (query ? 'Search Results' : 
    interaction ? 'Your Bookmarks' : 'Savory Home');
    //ensure authentication
    const isAuthenticated = useSelector((state: RootState) => state.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    // load recipes
    async function loadRecipes() {
        if(username) await loadProfile();
        else if(interaction) await  loadBookmarks();
        else if(query) await loadSearch();
        else await loadFeed();
    }
    async function loadFeed() {
        if (hasFeedPageChanged || hasSortChanged) {
            await dispatch(fetchRecipes({ pageNumber: page }));
        } else setRecipes(feed);
    }
    async function loadProfile() {
        try {
            const findProfile = await fetch(`${process.env.REACT_APP_URL_KEY}/api/person/byUsername/${username}`, fetchOptions({
                method: 'GET'
            }));
            const profile = await findProfile.json();
            const response = await fetch(`${process.env.REACT_APP_URL_KEY}/api/posts/byUserId/${profile.id}?pageNumber=${localPage}`, fetchOptions({
                method: 'GET'
            }));
            const data = await response.json();
            const recipeItems: Record<number, Recipe> = {};
            data.forEach((item: any) => {
                recipeItems[item.postId] = {
                    tags: item.tags?.split(',') || [], id: item.postId, userId: item.userId, title: item.headline,
                    img: item.img, date: item.postdate?.substring(0, 10), ingredients: item.ingredients?.split(',') || [], recipe: item.recipe, author: username || '',
                }
            });
            setRecipes(recipeItems);
        } catch (error) { console.error(error); }
    }
    async function loadBookmarks() {
        try {
            if (!user) return;
            const response = await fetch(`${process.env.REACT_APP_URL_KEY}/api/posts/bookmarked/${user.id}?pageNumber=${localPage}`, fetchOptions({
                method: 'GET',
            }));
            const data = await response.json();
            const recipeItems: Record<number, Recipe> = {};
            data.forEach((item: any) => {
                recipeItems[item.postId] = {
                    tags: item.tags?.split(',') || [], id: item.postId, userId: item.userId, title: item.headline,
                    img: item.img, date: item.postdate?.substring(0, 10), ingredients: item.ingredients?.split(',') || [], recipe: item.recipe, author: item.username,
                }
            });
            setRecipes(recipeItems);
        } catch (error) { console.error(error); }
    }
    async function loadSearch() {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_KEY}/api/posts/search?query=${query}&pageNumber=${localPage}`, fetchOptions({
                method: 'GET',
            }));
            const data = await response.json();
            const recipeItems: Record<number, Recipe> = {};
            data.forEach((item: any) => {
                recipeItems[item.postId] = {
                    tags: item.tags?.split(',') || [], id: item.postId, userId: item.userId, title: item.headline,
                    img: item.img, date: item.postdate?.substring(0, 10), ingredients: item.ingredients?.split(',') || [], recipe: item.recipe, author: item.username,
                }
            });
            setRecipes(recipeItems);
        } catch (error) { console.error(error); }
    }
    useEffect(() => {
        setLocalPage((username || interaction || query) ? 1 : page);
        setRecipes({});
        setStatus('Loading Recipes...');
        loadRecipes();
    }, [query, interaction, username]);
    useEffect(() => {
        setRecipes({});
        setStatus('Loading Recipes...');
        loadRecipes();
    }, [localPage, sort]);
    useEffect(() => {
        if(!bookmarkChange || !interaction) return;
        setRecipes({});
        setStatus('Loading Recipes...');
        loadRecipes();
        if(bookmarkChange) setBookmarkChange(false);
    }, [userInteractions]);
    useEffect(() => {
        // Check if the object is still empty after 10 seconds
        const timer = setTimeout(() => {
            if (Object.keys(recipes).length === 0) {
                if(interaction || query) navigate('/feed');
                else setStatus('Nothing Here...');
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [recipes]);
    useEffect(() => {
        setRecipes(feed);
    }, [feed]);
    useEffect(() => {
        const current = Number(post) || -1;
        setcurrentPost(current);
        setOpen(current > 0);
    }, [location]);

    // Handlers
    const openHandler = (id: number) => {
        setcurrentPost(id);
        setOpen(true);
    }
    const closeHandler = () => {
        setcurrentPost(-1);
        setOpen(false);
    }
    const handleNextPage = () => {
        setLocalPage((username || interaction || query) ? localPage + 1 : page + 1);
        if (username || interaction || query) {
            setLocalPage(localPage + 1);
        } else {
            setHasFeedPageChanged(true);
            setLocalPage(page + 1);
            dispatch(changePage(page + 1));
        }
    };
    const handlePreviousPage = () => {
        if (username || interaction || query) {
            setLocalPage(localPage - 1);
        } else {
            setHasFeedPageChanged(true);
            setLocalPage(page - 1);
            dispatch(changePage(page - 1));
        }
    };

    const handleSortUpdate = (sortBy: SelectChangeEvent) => {
        const newSort = sortBy.target.value as string;
        dispatch(updateSort({ sortBy: newSort }));
        setHasSortChanged(true);
        setLocalPage(1);
    }

    return (
        <Box>
            <Grid container justifyContent='space-between' padding='2vh 5vw'>
                <Grid item xs={6} md={4} lg={3}>
                    <Typography variant='h4'>{feedType}</Typography>
                </Grid>
                <Grid item xs={4} md={3} lg={2}>
                <Box>
                <FormControl fullWidth size='small'>
                    <InputLabel id="select-label">Sort</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={sort}
                        label="Sort"
                        onChange={handleSortUpdate}
                    >
                        <MenuItem value={"newest"}>Newest First</MenuItem>
                        <MenuItem value={"oldest"}>Oldest First</MenuItem>
                        <MenuItem value={"A"}>Title (A to Z)</MenuItem>
                        <MenuItem value={"Z"}>Title (Z to A)</MenuItem>
                    </Select>
                </FormControl>
            </Box>
                </Grid>
            </Grid>
            {(Object.keys(recipes).length > 0) ?
                <><RecipePopup {...{ open, username: user?.username || '', recipe: recipes[currentPost], closeHandler }} />
                    <Grid container rowGap={5} justifyContent={'space-around'}>
                        {Object.values(recipes)
                            .sort((a, b) => {
                                if (sort === "A") {
                                    return a.title.localeCompare(b.title);
                                } else if (sort === "Z") {
                                    return b.title.localeCompare(a.title);
                                } else if (sort === "oldest") {
                                    return a.id - b.id;
                                } else {
                                    return b.id - a.id;
                                }
                            })
                            .map((recipe) => {
                                return (recipe.id > 0 && recipes[recipe.id]) ?
                                    <RecipeItem {...{ recipe, key: recipe.id, 
                                        openHandler, updateBookmarks: () => setBookmarkChange(true) }} />
                                    : <></>;
                            })
                        }
                    </Grid>
                    <Box sx={{ marginTop: "50px" }}>
                        {(localPage > 1) ?
                            <Button sx={{ marginRight: "30px", width: "100px" }} variant='contained' color='primary' id="prevButton" onClick={handlePreviousPage}> Previous </Button>
                            : <></>
                        }
                        {(Object.keys(recipes).length < 12) ?
                            <></> :
                            <Button sx={{ width: "100px", marginLeft: "30px" }} variant='contained' color='primary' id="nextButton" onClick={handleNextPage}> Next </Button>
                        }
                    </Box></>
                :
                <Box>
                    <Typography margin='5vh 0' variant='h3'>{status}</Typography>
                    {status === 'Loading Recipes...' ? <CircularProgress /> : <></>}
                </Box>
            }
        </Box>
    );
}

const RecipeAvatar = ({ author }: { author: string }) => {
    return (
        <Tooltip title={author}>
            <Link to={`/profile/${author}`}><IconButton>
                <Avatar aria-label="recipe" src={''}>
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

const RecipeItem = ({ recipe, openHandler, updateBookmarks }: 
    { recipe: Recipe, openHandler: (id: number) => void, updateBookmarks: () => void }) => {
    // state
    const user = useSelector((state: RootState) => state.userReducer.user);
    const interaction = useSelector((state: RootState) => state.interactionsReducer.interactions[recipe.id]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // handlers
    const likeHandler = () => {
        if (!interaction) dispatch(postInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: true, bookmarked: false, shared: false }));
        else if (interaction.liked && !interaction.bookmarked && !interaction.shared) dispatch(deleteInteraction({ postId: recipe.id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: !interaction.liked, bookmarked: interaction.bookmarked, shared: interaction.shared }));
    }
    const bookmarkHandler = () => {
        if(interaction?.bookmarked) updateBookmarks();
        if (!interaction) dispatch(postInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: false, bookmarked: true, shared: false }));
        else if (!interaction.liked && interaction.bookmarked && !interaction.shared) dispatch(deleteInteraction({ postId: recipe.id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: interaction.liked, bookmarked: !interaction.bookmarked, shared: interaction.shared }));
    }
    const shareHandler = async () => {
        try {
            const location = window.location.href;
            const feed = location.search('/feed');
            const url = feed > 0 ? location.substring(0, feed) + '/profile/' + recipe.author : location;
            await navigator.clipboard.writeText(url + '/' + recipe.id);
        } catch (error) { console.error(error); }
        if (!interaction) dispatch(postInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: false, bookmarked: false, shared: true }));
        else if (!interaction.shared) dispatch(updateInteraction({ postId: recipe.id, userId: user ? user.id : -1, liked: interaction.liked, bookmarked: interaction.bookmarked, shared: true }));
    }
    const exploreHandler = () => {
        if(!recipe) return;
        navigate(`/feed/search/${(recipe.title + ' ' + recipe.tags?.join(' ')).toLowerCase()}`);
    }
    // Recipe Card
    return (
        <Grid item xs={9} sm={5.75} md={3.5} key={recipe.id}>
            <Card elevation={4}>
                <CardHeader
                    title={
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Grid item><RecipeAvatar author={recipe.author} /></Grid>
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
                            <Grid item>
                                <Tooltip title='More Like This' placement='top'><IconButton onClick={exploreHandler}>
                                <Assistant />
                                </IconButton></Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title='Copy Link' placement='top'><IconButton onClick={shareHandler}>
                                <LinkIcon />
                                </IconButton></Tooltip>
                            </Grid>
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
            {recipe ? <div style={{ position: 'relative', outline: 'none', border: 'none' }}>
                {username === recipe.author ?
                    <Link to={`/post/edit/${recipe.id}`}>
                        <Tooltip title='Edit' placement='right'>
                            <IconButton onClick={closeHandler} style={{ position: 'absolute', top: 0, left: 5 }}><Edit /></IconButton>
                        </Tooltip>
                    </Link>
                    : <></>
                }
                <IconButton onClick={closeHandler} style={{ position: 'absolute', top: 0, right: 5 }}>
                    <Close />
                </IconButton>
                <Post recipe={recipe} />
                <div style={{ position: 'absolute', bottom: 0 }}>
                    <PopupInteractions {...{ id: recipe.id, author: recipe.author }} />
                </div>
            </div> : <></>}
        </Modal>
    );
}

const PopupInteractions = ({ id, author }: { id: number, author: string }) => {
    const user = useSelector((state: RootState) => state.userReducer.user);
    const isAdmin = useSelector((state: RootState) => state.userReducer.isAdmin); 
    const interaction = useSelector((state: RootState) => state.interactionsReducer.interactions[id]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    // interaction handlers
    const likeHandler = () => {
        if (!interaction) dispatch(postInteraction({ postId: id, userId: user ? user.id : -1, liked: true, bookmarked: false, shared: false }));
        else if (interaction.liked && !interaction.bookmarked && !interaction.shared) dispatch(deleteInteraction({ postId: id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: id, userId: user ? user.id : -1, liked: !interaction.liked, bookmarked: interaction.bookmarked, shared: interaction.shared }));
    }
    const bookmarkHandler = () => {
        if (!interaction) dispatch(postInteraction({ postId: id, userId: user ? user.id : -1, liked: false, bookmarked: true, shared: false }));
        else if (!interaction.liked && interaction.bookmarked && !interaction.shared) dispatch(deleteInteraction({ postId: id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: id, userId: user ? user.id : -1, liked: interaction.liked, bookmarked: !interaction.bookmarked, shared: interaction.shared }));
    }
    const shareHandler = async () => {
        try {
            const location = window.location.href;
            const feed = location.search('/feed');
            const url = feed > 0 ? location.substring(0, feed) + '/profile/' + author : location;
            await navigator.clipboard.writeText(url + '/' + id);
        } catch (error) { console.error(error); }
        if (!interaction) dispatch(postInteraction({ postId: id, userId: user ? user.id : -1, liked: true, bookmarked: false, shared: true }));
        else if (!interaction.shared) dispatch(updateInteraction({ postId: id, userId: user ? user.id : -1, liked: interaction.liked, bookmarked: interaction.bookmarked, shared: true }));
    }
    // interaction metrics
    const [metrics, setMetrics] = useState({likes: 0, shares: 0, bookmarks: 0});
    useEffect(() => {
        loadMetrics();
    }, [interaction]);
    async function loadMetrics() {
        const getLikes = await fetch(`${process.env.REACT_APP_URL_KEY}/api/interaction/post/likes/${id}`, fetchOptions({ method: 'GET' }));
        const getShares = await fetch(`${process.env.REACT_APP_URL_KEY}/api/interaction/post/shares/${id}`, fetchOptions({ method: 'GET' }));
        const getBookmarks = await fetch(`${process.env.REACT_APP_URL_KEY}/api/interaction/post/bookmarks/${id}`, fetchOptions({ method: 'GET' }));
        const likeCount = await getLikes.json();
        const shareCount = await getShares.json();
        const bookmarkCount = await getBookmarks.json();
        setMetrics({ likes: likeCount, shares: shareCount, bookmarks: bookmarkCount });
    }
    return (
        <Grid container justifyContent={'space-between'} sx={{width: '75vw', backgroundColor: 'background.paper'}}>
            <Grid container item xs={5} md={4} lg={3} xl={2.5}>
                <Grid container item alignItems='center' xs={4}>
                    <Grid><IconButton onClick={likeHandler}>
                        {interaction && interaction.liked ? <Favorite color='error'/> : <FavoriteBorder/>}
                    </IconButton></Grid>
                    <Grid item><Typography variant='h6' noWrap align='center'>{metrics.likes}</Typography></Grid>
                </Grid>
                <Grid container item alignItems='center' xs={4}>
                    <Grid item>
                        <IconButton onClick={shareHandler}><LinkIcon/></IconButton>
                    </Grid>
                    <Grid item><Typography variant='h6' noWrap align='center'>{metrics.shares}</Typography></Grid>
                </Grid>
                <Grid container item alignItems='center' xs={4}>
                    <Grid item><IconButton onClick={bookmarkHandler}>
                        {interaction && interaction.bookmarked ? <Bookmark color='secondary' /> : <BookmarkBorder />}
                    </IconButton></Grid>
                    <Grid item><Typography variant='h6' noWrap align='center'>{metrics.bookmarks}</Typography></Grid>
                </Grid>
            </Grid>
            <Grid item>
                {isAdmin ?
                <Tooltip title='Remove' placement='left'>
                    <IconButton onClick={() => navigate(`/report/${id}`)}><Delete/></IconButton>
                </Tooltip> 
                : <Tooltip title='Report' placement='left'>
                    <IconButton onClick={() => setOpen(true)}><Report/></IconButton>
                </Tooltip>}
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{"Report this recipe?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to report this recipe to Savory administrators.
                        Are you sure you want to report this recipe?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant='outlined'>Cancel</Button>
                    <Button onClick={() => {
                        setOpen(false);
                        navigate(`/report/${id}`);
                    }} variant='outlined' color='error'>Report</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}