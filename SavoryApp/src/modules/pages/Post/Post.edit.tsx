import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Tooltip, Typography, TextField, Card,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CardContent, TextFieldProps, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../../redux/store';
import { updateRecipe, Recipe, deleteRecipe } from '../../../redux/Recipes/recipes-slice'

const PostEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();  
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const { id } = useParams();
    const [post, setPost] = useState<Recipe | null>(null);
    const [open, setOpen] = useState(false);
    //ensure authentication
    const isAuthenticated = useSelector((state: RootState) => state.persistedReducer.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    // form states
    const [title, setTitle] = useState(post?.title || '');
    const [img, setImg] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [tags, setTags] = useState('');
    // error states
    const [titleError, setTitleError] = useState({error: false, helperText: ''});
    const [ingredientsError, setIngredientsError] = useState({error: false, helperText: ''});
    const [tagsError, setTagsError] = useState({error: false, helperText: ''});
  
    // form validation
    const validateFields = () => {
      const titleRegex = /^[\w /\(\)\-\.]{3,100}$/.test(title);
      setTitleError((!titleRegex) ? 
        {error: true, helperText: 'Must be 3-100 characters & only contain letters, numbers, space, _-./()'}
        : {error: false, helperText: ''}
      );
      const ingredientsRegex = /^(([\w /\(\)\-\.]){1,63}(\n|,|$)){1,63}$/.test(ingredients);
      setIngredientsError((!ingredientsRegex) ? 
        {error: true, helperText: 'Must follow the format in ingredients tool tip only contain letters, numbers, space, _-./()'}
        : {error: false, helperText: ''}
      );
      const tagsRegex = /^((#([a-zA-Z0-9\-]){1,31}),{0,1}){1,63}$/.test(tags);
      setTagsError((tags && !tagsRegex) ?  
        {error: true, helperText: 'Must follow the format in tags tool tip & contain only letters, numbers, -'}
        : {error: false, helperText: ''}
      );
      return (tags && tagsRegex) && ingredientsRegex && titleRegex && recipe;
    }

    async function loadRecipe() {
        try {
            const findRecipe = await fetch(`http://localhost:8080/api/posts/byPostID/${id}`, fetchOptions({
                method: 'GET'
            }));
            const postData = await findRecipe.json();
            const newPostData = { ...postData, title: postData.headline, tags:  '#'+postData.tags.replace(/,/g, ',#')};
            delete newPostData.headline;
            setTitle(newPostData.title);
            setImg(newPostData.img);
            setTags(newPostData.tags);
            setIngredients(newPostData.ingredients);
            setRecipe(newPostData.recipe);
            console.log(newPostData);
            setPost(newPostData);
        } catch(error) {console.error(error);}
    }
    useEffect(() => {
      loadRecipe();
    }, [id]);

    // form submission
    const handlePostEdit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validateFields();
      if(!user?.id || !isValid) return;
      await dispatch(updateRecipe({
        userId: user?.id, headline: title, ingredients: ingredients, recipe: recipe, img: img, tags: tags,
        postId: +(id || "-1")
      }
      ));
      navigate('/feed');
    }

    const handleDelete = async () => {
        await dispatch(deleteRecipe({postId: +(id || "-1")}));
        setOpen(false);
        navigate('/feed');
    }

    return ( 
        post ? (    
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='70vh'>
            <Card elevation={10} sx={{ maxWidth: '85vw' }}>
              <Grid container>
                {/* Image on the left */}
                <Grid container item xs={12} md={6} direction='column' alignItems='center' justifyContent='space-between'>
                  <Paper
                    component='img'
                    alt={post.title}
                    src={post.img}
                    sx={{
                      margin: 'auto',
                      minHeight: '37vh',
                      minWidth: '34vw',
                      maxHeight: '37vh',
                      maxWidth: '34vw',
                      objectFit: 'cover'
                    }}
                  />
                  <Grid item>
                  <Button color='error' variant='contained' onClick={() => setOpen(true)} sx={{margin: '0 35px 35px 0'}}>
                    <Typography>Delete this Post</Typography>
                  </Button>
                  <Button color='secondary' variant='contained' onClick={() => navigate('/feed')} sx={{margin: '0 0 35px 35px'}}>
                    <Typography>Archive this Post</Typography>
                  </Button>
                  </Grid>
                </Grid>
                {/* Text on the right */}
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography>{user?.username}</Typography>
                    <form onSubmit={(e) => handlePostEdit(e)}>
                    <TextField
                      type='text'
                      label='Title'
                      variant="outlined"
                      fullWidth
                      required
                      {...titleError}
                      value={title}
                      margin='normal'
                      onChange={(e) => {setTitle(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Ingredients'
                      variant="outlined"
                      fullWidth
                      required
                      value={ingredients}
                      margin='normal'
                      multiline
                      {...ingredientsError}
                      minRows={3}
                      maxRows={3}
                      onChange={(e) => {setIngredients(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Recipe'
                      variant="outlined"
                      fullWidth
                      required
                      value={recipe}
                      margin='normal'
                      multiline
                      minRows={7}
                      maxRows={7}
                      onChange={(e) => {setRecipe(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Tags'
                      variant="outlined"
                      fullWidth
                      required
                      {...tagsError}
                      value={tags}
                      margin='normal'
                      onChange={(e) => {setTags(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Image Link'
                      variant="outlined"
                      fullWidth
                      required
                      value={img}
                      margin='normal'
                      multiline
                      minRows={3}
                      maxRows={3}
                      onChange={(e) => {setImg(e.target.value)}}
                    />
                    <Button variant='contained' sx={{mb: '1.5vh', mt: '1vh'}} type='submit' size='large'>
                        <Typography>Submit</Typography>
                    </Button>
                    </form>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Are you sure you want to delete this post?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpen(false)} color='primary'>
                    Cancel
                </Button>
                <Button color='error' autoFocus onClick={() => handleDelete()}>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
          </Box>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default PostEdit;