import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
    Box, Grid, Tooltip, Typography, Card,
    CardMedia, Avatar, IconButton, Modal
} from '@mui/material';
import {
    CropFree, Share, Bookmark, BookmarkBorder,
    Favorite, ChatBubbleOutline, FavoriteBorder, Close
} from '@mui/icons-material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import Post from '../pages/Post/Post';
//import { Recipes } from '../../Recipes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addInteraction, toggleBookmark } from '../../redux/Interactions/interactions-slice';
import { postBookmark, deleteBookmark } from '../../redux/Interactions/interactions-slice';


export default function Feed({ id }: { id?: number }) {
    const user = useSelector((state: RootState) => state.user.user);
    console.log('This is the feed for ' + user?.username);
    const r = useSelector((state: RootState) => state.recipes);
    const Recipes = r.recipes
   // console.log("RECIPES: " + JSON.stringify(Recipes))
    // State
    const { filters } = useParams();
    const { state } = useLocation();
    const [filteredRecipes, setFilteredRecipes] = useState(Recipes);
    const [open, setOpen] = useState(Boolean(id) && Boolean(state?.fromTag));
    const [currentPost, setcurrentPost] = useState(id || -1);
    useEffect(() => {
        setOpen(Boolean(state?.fromTag))
    }, [state]);
    // Handlers
    const openHandler = (id: number) => {
        setcurrentPost(id);
        setOpen(true);
    }
    const closeHandler = () => {
        setcurrentPost(0);
        setOpen(false);
    }
    
    
    // filter
    function parseFilters() {
        if (!filters) return Recipes;
        let filterBookmarks = false;
        let filterLikes = false;
        let filterTagGroup = ''
        const spaceRemoved = filters?.split(' ');
        const lowerCased = spaceRemoved?.map(f => f.toLowerCase());
        lowerCased?.forEach(filter => {
            if (filter === 'bookmarks' || filter === 'bookmark' || filter === 'bookmarked') {
                filterBookmarks = true;
            } else if (filter === 'likes' || filter === 'like' || filter === 'liked') {
                filterLikes = true;
            } else {
                filterTagGroup += filter + ','
            }
        });
        const filterWords = filterTagGroup.split(',').slice(0, -1);
        const applyFilters = ({ title, tags, ingredients, isBookmarked, isLiked }:
            { title: string, tags: string[], ingredients: string[], isBookmarked: boolean, isLiked: boolean }) => {
            if ((filterBookmarks && isBookmarked) || (filterLikes && isLiked)) return true;
            for (const tag of tags) {
                if (filterWords.includes(tag.toLowerCase())) return true;
            }
            const titleWords = title.split(' ');
            for (const word of titleWords) {
                if (filterWords.includes(word.toLowerCase())) return true;
            }
            for (const ingredient of ingredients) {
                const ingredientWords = ingredient.toLowerCase().replace(/[^a-z ]/g, '').split(' ')
                for (const word of ingredientWords) {
                    if (filterWords.includes(word)) return true;
                }
            }
            return false;
        }
        return Recipes.filter(recipe => {
            return applyFilters({
                title: recipe.title, tags: recipe.tags, ingredients: recipe.ingredients,
                isBookmarked: recipe.isBookmarked, isLiked: recipe.isLiked
            });
        });
    }
    useEffect(() => {
        setFilteredRecipes(parseFilters());
    }, [filters]);

    return (
        <Box>
            <RecipePopup {...{ open, id: currentPost, closeHandler }} />
            <Grid container rowGap={5} justifyContent={'space-around'}>
                {filteredRecipes.map((recipe) => {
                    var index = 0
                    if (recipe.id > 0) {
                        index = index + 1
                        return <RecipeItem {...{ id: recipe.id, key: recipe.title, openHandler, index }} />
                    } else {
                        return null;
                    }
                })}
            </Grid>
            <CircularProgress sx={{ mt: '2vh' }} />
        </Box>
    );
}

const RecipeAvatar = ({ author }: { author: string }) => {
    return (
        <Tooltip title={author}>
            <Link to={`/profile/${author}`}><IconButton>
                <Avatar aria-label="recipe" src=''>
                    {author.charAt(1).toUpperCase()}
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

const RecipeItem = ({ id, openHandler, index }: { id: number, openHandler: (id: number) => void, index: number }) => {
    // Get from REST API
    const r = useSelector((state: RootState) => state.recipes);
    const Recipes = r.recipes
    const recipe = Recipes[index];
    //console.log("THIS ONE: " + JSON.stringify(recipe))
    const i = useSelector((state: RootState) => state.interactions);
    const [interactions, setInteractions] = useState(i.interactions);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);

    const addInteractionLocal = () => {
        // add post to interactions state if not already there
        setInteractions(interactions => ({
          ...interactions,
          [id]: {
            postId: id,
            liked: false,
            bookmarked: false
          }
        }));
      };

    if (!interactions[id]) {
        dispatch(addInteraction(id))
        addInteractionLocal()
    }
    // Recipe State 

    //const [bookmark, setBookmark] = useState(interactions[id].bookmarked);
    const [like, setLike] = useState(interactions[id].liked);
    const [intLocal, setIntLocal] = useState(interactions[id])
    //console.log("THIS INTERACTION: " + JSON.stringify(intLocal));
    const [copySuccess, setCopySuccess] = useState('');
    useEffect(() => {
        copySuccess && console.log(copySuccess);
    }, [copySuccess]);
    // Handlers
    const likeHandler = () => {
        setLike(!like);
        console.log(like ? `Unliked: ${id}` : `Liked: ${id}`);
        // Notification Alert
    }
    const commentHandler = (comment: string) => {
        // NOTE: NOT TO BE IMPLEMENTED
        // REST API comment
        console.log(`Commented: ${comment} on ${id}`);
    }
    const shareHandler = async () => {
        try {
            const location = window.location.href;
            const profile = location.search('/profile');
            const feed = profile > 0 ? profile : location.search('/feed');
            const url = profile > 0 ? location : location.substring(0, feed) + '/profile/' + recipe.author;
            await navigator.clipboard.writeText(url + '/' + id);
            setCopySuccess('Copy Link Successful: ' + id);
        } catch (err) { setCopySuccess('Copy Link Failed: ' + id); }
    }
    const bookmarkHandler = () => {
        const bookmarkStatus = intLocal.bookmarked;
        dispatch(toggleBookmark({recipeId: intLocal.postId, bookmarked: !bookmarkStatus}))
        setIntLocal({
            postId: intLocal.postId,
            liked: intLocal.liked,
            bookmarked: !bookmarkStatus
        })
        if (!bookmarkStatus && user?.id) {
            dispatch(postBookmark({postId: id, userId: user?.id}))
        } else {
            dispatch(deleteBookmark({postId: id, userId: user?.id}))
        }
        

        console.log(intLocal.bookmarked ? `Unbookmarked: ${id}` : `Bookmarked: ${id}`);
        // Notification Alert
    }
    // Recipe Card
    return (
        <Grid item xs={9} sm={5.75} md={3.5} key={id}>
            <Card elevation={4}>
                <CardHeader
                    title={
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Grid item><RecipeAvatar author={recipe.author} /></Grid>
                            <Grid item xs={8}><Typography variant='h5' noWrap>{recipe.title}</Typography></Grid>
                            <Grid item><RecipeExpandButton {...{ id, openHandler }} /></Grid>
                        </Grid>
                    }
                    style={{ height: '6.5vh', padding: '.5vh', display: 'block' }}
                />
                <CardMedia
                    component="img"
                    loading="lazy"
                    image={recipe.img}
                    alt={recipe.title}
                    style={{ height: '30vh' }}
                    sx={{ objectFit: "cover" }} />
                <CardActions disableSpacing style={{ height: '5vh' }}>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item><Grid container>
                            <Grid item><IconButton onClick={likeHandler}>
                                {like ? <Favorite color='error' /> : <FavoriteBorder />}
                            </IconButton></Grid>
                            <Grid item><IconButton onClick={() => commentHandler('')}>
                                <ChatBubbleOutline />
                            </IconButton></Grid>
                            <Grid item><IconButton onClick={shareHandler}>
                                <Share />
                            </IconButton></Grid>
                        </Grid></Grid>
                        <Grid item><IconButton onClick={bookmarkHandler}>
                            {intLocal.bookmarked ? <Bookmark color='secondary' /> : <BookmarkBorder />}
                        </IconButton></Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}

const RecipePopup = ({ open, id, closeHandler }: { open: boolean, id: number, closeHandler: () => void }) => {
    return (
        <Modal
            open={open}
            onClose={closeHandler}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', outline: 'none', border: 'none' }}>
                <IconButton onClick={closeHandler} style={{ position: 'absolute', top: 0, right: 5 }}>
                    <Close />
                </IconButton>
                <Post id={id} />
            </div>
        </Modal>
    );
}