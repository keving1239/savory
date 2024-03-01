import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Tooltip, Typography, TextField, Card,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CardContent, TextFieldProps, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../../redux/store';
import { updateRecipe, Recipe, deleteRecipe } from '../../../redux/Recipes/recipes-slice'
import PostCreate from './Post.create';

const PostEdit = ({recipeItem}: {recipeItem?: Recipe}) => {
    const { id } = useParams();
    const [post, setPost] = useState<Recipe | null>(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.persistedReducer.userReducer.user?.id);
    const user = useSelector((state: RootState) => state.persistedReducer.userReducer.user);
    const isAuthenticated = useSelector((state: RootState) => state.persistedReducer.userReducer.isAuthenticated);
    useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
    // const testValue = useSelector((state: RootState) => state.persistedReducer.recipesReducer.recipes);
    // // form states
    // console.log(testValue)
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
    // const validateFields = () => {
    //   const titleRegex = /^[\w /\(\)\-\.]{3,100}$/.test(title);
    //   setTitleError((!titleRegex) ? 
    //     {error: true, helperText: 'Must be 3-100 characters & only contain letters, numbers, space, _-./()'}
    //     : {error: false, helperText: ''}
    //   );
    //   const ingredientsRegex = /^(([\w /\(\)\-\.]){1,63}(\n|,|$)){1,63}$/.test(ingredients);
    //   setIngredientsError((!ingredientsRegex) ? 
    //     {error: true, helperText: 'Must follow the format in ingredients tool tip only contain letters, numbers, space, _-./()'}
    //     : {error: false, helperText: ''}
    //   );
    //   const tagsRegex = /^((#([a-zA-Z0-9\-]){1,31}),{0,1}){1,63}$/.test(tags);
    //   setTagsError((tags && !tagsRegex) ?  
    //     {error: true, helperText: 'Must follow the format in tags tool tip & contain only letters, numbers, -'}
    //     : {error: false, helperText: ''}
    //   );
    //   return (tags && tagsRegex) && ingredientsRegex && titleRegex && recipe;
    // }

    async function loadRecipe() {
        try {
            const findRecipe = await fetch(`http://localhost:8080/api/posts/byPostID/${id}`, fetchOptions({
                method: 'GET'
            }));
            const postData = await findRecipe.json()
            console.log(postData)
            const newPostData = { ...postData, title: postData.headline };
            delete newPostData.headline;
            setPost(newPostData)
            setTitle(newPostData.title)
            setImg(newPostData.img)
            setIngredients(newPostData.ingredients)
            setTags(newPostData.tags)
            setRecipe(newPostData.recipe)
            console.log(post)
        } catch(error) {
            console.error(error);
        }
    }
    useEffect(() => {
        loadRecipe();
    }, [id]); // Called any time id changes
    
    // form submission
    const handlePostEdit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    //   const isValid = validateFields();
      if(!userId) return;
      await dispatch(updateRecipe(
        {
            userId: userId, headline: title, ingredients: ingredients, recipe: recipe, img: img, tags: tags,
            postId: +(id || "-1")
        }
      ));
      navigate('/feed');
    }

    const handleDelete = async () => {
        console.log("hello")
        await dispatch(deleteRecipe(
            {
                postId: +(id || "-1")
            }
        ));
        setOpen(false);
        navigate('/feed');
    }
  
    // props for each textfield
    // const fields: {tip: string, size: number, fieldProps: TextFieldProps}[] = [
    //   {tip: 'Name of your food', size: 12, 
    //     fieldProps: {value: title, type: 'text', onChange: (e) => setTitle(e.target.value), error: titleError.error, helperText: titleError.helperText,
    //     label: 'Title', placeholder: 'Southwest Salad', required: true, variant: 'outlined', margin: 'dense', fullWidth: true}},
    //   {tip: 'URL for a picture of your food', size: 12,
    //     fieldProps: {value: img, type: 'text', onChange: (e) => setImg(e.target.value),
    //     label: 'Image', placeholder: 'https://images.unsplash.com/...', required: true,}},
    //   {tip: 'Ingredients in this food (list each ingredient seperated by new line or commas)', size: 5.9,
    //     fieldProps: {value: ingredients, type: 'text', onChange: (e) => setIngredients(e.target.value), error: ingredientsError.error, helperText: ingredientsError.helperText,
    //     label: 'Ingredients', placeholder: '1 Head Romaine Lettuce\n12 Cherry Tomatoes\n1 Can Black Beans\n...', 
    //     required: true, multiline: true, minRows: 4, maxRows: 4, variant: 'outlined', margin: 'dense', fullWidth: true}},
    //   {tip: 'Instructions to make this food', size: 5.9,
    //     fieldProps: {value: recipe, type: 'text', onChange: (e) => setRecipe(e.target.value),
    //     label: 'Recipe', placeholder: 'First, prepare your vegetables. Next, Drain and rinse the black beans.', 
    //     required: true, multiline: true, minRows: 4, maxRows: 4, variant: 'outlined', margin: 'dense', fullWidth: true}},
    //   {tip: 'One word hashtags seperated by commas', size: 12,
    //     fieldProps: {value: tags, type: 'text', onChange: (e) => setTags(e.target.value), error: tagsError.error, helperText: tagsError.helperText,
    //     label: 'Tags', placeholder: '#TexMex, #Refreshing, #Healthy', variant: 'outlined', margin: 'dense', fullWidth: true}},
    // ];
    return ( 
        post ? (    
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='70vh'>
            <Card elevation={10} sx={{ maxWidth: '85vw' }}>
                <Button color='error' variant='contained' sx={{mb: '1.5vh', mt: '1vh'}} onClick={() => setOpen(true)}>
                    <Typography>Delete this Post</Typography>
                </Button>
              <Grid container>
                {/* Image on the left */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Paper
                    component='img'
                    alt={user?.email}
                    src={post.img}
                    sx={{
                      minHeight: '37vh',
                      minWidth: '34vw',
                      maxHeight: '37vh',
                      maxWidth: '34vw',
                      objectFit: 'cover'
                    }}
                  />
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
                      value={title}
                      margin='normal'
                      onChange={(e) => {setTitle(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Ingredients'
                      variant="outlined"
                      fullWidth
                      value={ingredients}
                      margin='normal'
                      multiline
                      minRows={3}
                      maxRows={3}
                      onChange={(e) => {setIngredients(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Recipe'
                      variant="outlined"
                      fullWidth
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
                      value={tags}
                      margin='normal'
                      onChange={(e) => {setTags(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Image Link'
                      variant="outlined"
                      fullWidth
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