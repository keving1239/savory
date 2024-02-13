import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Tooltip, Typography, Paper, Button, Menu, MenuItem } from '@mui/material';
import { Recipes } from '../../../Recipes';

const Post = ({id}:{id: string}) => {
    const recipe = Recipes[+id] || {id: '', img:'', title: '', author: '', ingredients: [''], recipe: '', tags: [''], isBookmarked: false, date: new Date()};
    const chunkedIngredients = recipe.ingredients.reduce<string[][]>((chunkResult, ingredient, index) => {
        const chunkIndex = Math.floor(index / 2);
        if (!chunkResult[chunkIndex]) chunkResult[chunkIndex] = [];
        chunkResult[chunkIndex].push(ingredient);
        return chunkResult;
    }, []);  
    return(
        <Paper sx={{height: '80vh', width: '75vw', overflowY: 'auto'}}>
                 <Grid container direction='column'>
                    <Grid container item direction='column' alignItems='center'>
                        <Grid container item justifyContent='center' alignItems='center'>
                            <Grid item xs={11}><Typography variant='h4' noWrap align='center'>{recipe.title}</Typography></Grid>
                        </Grid>
                        <Grid container item justifyContent='center' alignItems='center'>
                            <Grid item><Typography>Posted by</Typography></Grid>
                            <Grid item><Link to={`/profile/${recipe.author}/${recipe.id}`}>
                                <Button variant='text' fullWidth>
                                    <Typography noWrap textTransform='none' maxWidth='50vw'>{recipe.author}</Typography>
                                </Button>
                            </Link></Grid>
                            <Grid item>
                                <Typography>
                                    {`on ${`${recipe.date.getMonth()+1}/${recipe.date.getDate()}/${recipe.date.getFullYear()}`}`}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item><RecipeTags tags={recipe.tags}/></Grid>
                    </Grid>
                    <Grid container item justifyContent='space-around' 
                            bgcolor='primary.main' height='40vh' p='1.5vh 0'>
                        <Grid item>
                            <Paper 
                            component='img'
                            alt={recipe?.title}
                            src={recipe?.img}
                            sx={{height: '37vh', width: '34vw', objectFit: 'cover'}}/>
                        </Grid>
                        <Grid item>
                            <Paper sx={{height: '37vh', maxWidth: '34vw', overflowY: 'auto'}}>
                                <Typography variant='h5' align='center'>Ingredients:</Typography>
                                <Grid container>
                                    {chunkedIngredients?.map((chunk) => (
                                    <Grid container item spacing={'1vh'} justifyContent='flex-start' key={chunk[0]}>
                                        {chunk.map((ingredient) => (
                                        <Grid item key={ingredient}>
                                            <Tooltip arrow title={ingredient} placement='right'>
                                                <Button variant='text' sx={{width: '16vw', justifyContent: "flex-start"}}>
                                                    <Typography noWrap textTransform='none'>{ingredient}</Typography>
                                                </Button>
                                            </Tooltip>
                                        </Grid>))}
                                    </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Paper sx={{p: '1.5vh 2vw'}} elevation={0}>
                            <Typography variant='h5' align='center'>Recipe:</Typography>
                            <Typography>{recipe?.recipe}</Typography>
                        </Paper>    
                    </Grid>
                </Grid>
            </Paper>
    );
};

const RecipeTags= ({tags}: {tags: string[]}) => {
    const maxTags = 5;
    const visibleTags = tags.slice(0, maxTags);
    const hiddenTags = tags.slice(maxTags);
    
    const [tagsAnchorEl, setTagsAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(tagsAnchorEl);
    const showHiddenTags = (event: React.MouseEvent<HTMLElement>) => {setTagsAnchorEl(event.currentTarget);};
    const hideHiddenTags = () => {setTagsAnchorEl(null);};
    

    return(
        <Grid container justifyContent='center' alignItems='center'>
            {visibleTags.map((tag, index) => (
                <Grid item key={index}>
                    <Link to={`/feed/${tag}`} state={{fromTag: false}}><Button variant='text'>
                        <Typography textTransform='none'>{`#${tag}`}</Typography>
                    </Button></Link>
                </Grid>
            ))}
            {hiddenTags.length > 0 && <Grid item>
                <Tooltip title={`+${hiddenTags.length}`} arrow placement='right'>
                    <Button sx={{minWidth: '1vw'}} onClick={showHiddenTags}>...</Button>
                </Tooltip>
            </Grid>}
            <Menu
            anchorEl={tagsAnchorEl}
            open={open}
            onClose={hideHiddenTags}
            slotProps={{paper: {style: {maxHeight: '20vh'}}}}
            >
            {hiddenTags.map((tag, index) => (
              <MenuItem key={index} onClick={hideHiddenTags}  sx={{p: 0, m: '.25vw'}}>
                <Link to={`/feed/${tag}`}><Button variant='text' sx={{p: 0}}>
                        <Typography textTransform='none'>{`#${tag}`}</Typography>
                    </Button></Link>
              </MenuItem>
            ))}
            </Menu>
        </Grid>
    );
}

export default Post;