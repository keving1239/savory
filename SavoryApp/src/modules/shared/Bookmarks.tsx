import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Grid, Tooltip, Typography, Card,
    CardMedia, Avatar, IconButton, Modal
} from '@mui/material';
import {
    CropFree, Share, Bookmark, BookmarkBorder,
    Favorite, Assistant, FavoriteBorder, Close
} from '@mui/icons-material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import Post from '../pages/Post/Post';
//import { Recipes } from '../../Recipes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { postInteraction, updateInteraction, deleteInteraction } from '../../redux/Interactions/interactions-slice';

export default function Bookmarks({ id }: { id?: number }) {
    var recipes = useSelector((state: RootState) => state.persistedReducer.recipesReducer.recipes);
    // State
    const { post } = useParams();
    const { filters } = useParams();
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [open, setOpen] = useState(Boolean(id) && Boolean(post));
    const [currentPost, setcurrentPost] = useState(id || -1);
    const interactions = useSelector((state: RootState) => state.persistedReducer.interactionsReducer.interactions);
    console.log("INTERACTIONS:" + JSON.stringify(interactions))

    const bookmarkedPostIds: string[] = [];
    for (const postId in interactions) {
        const inter = interactions[postId];
        if (inter.bookmarked) {
            bookmarkedPostIds.push(postId);
        }
    };

    console.log("BOOKMARKED IDS: " + bookmarkedPostIds);

    const newPosts: Record<number, {
        tags: string[],
        id: number,
        ownerId: number,
        title: string,
        img: string,
        date: Date,
        ingredients: string[],
        recipe: string,
        author: string
    }> = {};
    for (const postId of Object.keys(recipes)) {
        if (bookmarkedPostIds.includes(postId)) {
            newPosts[Number(postId)] = recipes[Number(postId)];
        }
    }

    console.log("filtered posts: " + newPosts);

    recipes = newPosts

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
        if (!filters) return recipes;
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
        const validRecipes = Object.values(recipes).filter(recipe => {
            return applyFilters({
                title: recipe.title, tags: recipe.tags, ingredients: recipe.ingredients,
                isBookmarked: false, isLiked: false
            });
        });
        const result: typeof filteredRecipes = {};
        validRecipes.forEach((item: typeof validRecipes[0]) => {
            result[item.id] = item;
        });
        return result;
    }
    useEffect(() => {
        setFilteredRecipes(parseFilters());
    }, [filters]);

    return (
        <Box>
            <RecipePopup {...{ open, id: currentPost, closeHandler }} />
            <Grid container rowGap={5} justifyContent={'space-around'}>
                {Object.values(filteredRecipes).map((recipe) => {
                    if (recipe.id > 0 && recipes[recipe.id]) {
                        return <RecipeItem {...{ id: recipe.id, key: recipe.title, openHandler }} />
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

const RecipeItem = ({ id, openHandler }: { id: number, openHandler: (id: number) => void }) => {
    // state
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const recipe = useSelector((state: RootState) => state.persistedReducer.recipesReducer.recipes[id]);
    const interaction = useSelector((state: RootState) => state.persistedReducer.interactionsReducer.interactions[id]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // copy
    const [copySuccess, setCopySuccess] = useState('');
    useEffect(() => {
        copySuccess && console.log(copySuccess);
    }, [copySuccess]);
    // handlers
    const likeHandler = () => {
        if (!interaction) return dispatch(postInteraction({ postId: id, userId: user ? user.id : -1, liked: true, bookmarked: false }))
        else if (interaction.liked && !interaction.bookmarked) dispatch(deleteInteraction({ postId: id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: id, userId: user ? user.id : -1, liked: !interaction.liked, bookmarked: interaction.bookmarked }));
    }
    const bookmarkHandler = () => {
        if (!interaction) return dispatch(postInteraction({ postId: id, userId: user ? user.id : -1, liked: false, bookmarked: true }))
        else if (!interaction.liked && interaction.bookmarked) dispatch(deleteInteraction({ postId: id, userId: user ? user.id : -1 }));
        else dispatch(updateInteraction({ postId: id, userId: user ? user.id : -1, liked: interaction.liked, bookmarked: !interaction.bookmarked }));
    }
    const exploreHandler = () => {
        navigate(`/feed/${recipe?.title + recipe?.tags?.join(' ') + recipe?.ingredients?.join(' ')}`);
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