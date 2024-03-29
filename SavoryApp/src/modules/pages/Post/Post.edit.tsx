import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Card,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CardContent, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, fetchOptions } from '../../../redux/store';
import { updateRecipe, Recipe, deleteRecipe } from '../../../redux/Recipes/recipes-slice'

const PostEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();  
    const user = useSelector((state: RootState) => state.userReducer.user);
    const { id } = useParams();
    const [post, setPost] = useState<Recipe | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
    //ensure authentication
    const isAuthenticated = useSelector((state: RootState) => state.userReducer.isAuthenticated);
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
            const findRecipe = await fetch(`${process.env.REACT_APP_URL_KEY}/api/posts/byPostID/${id}`, fetchOptions({
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
      navigate(`/profile/${user?.username}`);
    }

    const handleDelete = async () => {
        await dispatch(deleteRecipe({postId: +(id || "-1")}));
        setDeleteDialogOpen(false);
        navigate(`/profile/${user?.username}`);
    }
    const handleArchive = async () => {
      // await dispatch();
      setArchiveDialogOpen(false);
      navigate(`/profile/${user?.username}`);
    }

    return ( 
        post ? (    
          <><Typography variant='h4' sx={{mb: '1vh'}}>Edit your Recipe</Typography>
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='70vh'>
            <Card elevation={10} sx={{ maxWidth: '85vw' }}>
              <Grid container>
                {/* Image on the left */}
                <Grid container item xs={12} md={6} direction='column' alignItems='center' justifyContent='space-between'>
                  <Grid item>
                    <Typography variant='h4' sx={{mt: '16px'}} noWrap maxWidth='34vw'>{title}</Typography>
                  </Grid>
                  <Paper data-testid='recipe-image'
                    component='img'
                    alt={post.title}
                    src={post.img}
                    sx={{
                      margin: 'auto',
                      minHeight: '40vh',
                      minWidth: '34vw',
                      maxHeight: '40vh',
                      maxWidth: '34vw',
                      objectFit: 'cover'
                    }}
                  />
                  <Grid item>
                    <Typography noWrap maxWidth='34vw'>{tags}</Typography>
                  </Grid>
                  <Grid item>
                  <Button color='error' variant='contained' onClick={() => setDeleteDialogOpen(true)} sx={{margin: '34px 40px 34px 0'}}>
                    <Typography>Delete</Typography>
                  </Button>
                  <Button color='secondary' variant='contained' onClick={() => setArchiveDialogOpen(true)} sx={{margin: '34px 0 34px 40px'}}>
                    <Typography>Archive</Typography>
                  </Button>
                  </Grid>
                </Grid>
                {/* Text on the right */}
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography>{user?.username}</Typography>
                    <form onSubmit={(e) => handlePostEdit(e)} data-testid='recipe-form'>
                    <TextField
                      type='text'
                      label='Title'
                      variant="outlined"
                      fullWidth
                      required
                      {...titleError}
                      value={title}
                      margin='dense'
                      onChange={(e) => {setTitle(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Ingredients'
                      variant="outlined"
                      fullWidth
                      required
                      value={ingredients}
                      margin='dense'
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
                      margin='dense'
                      multiline
                      minRows={4}
                      maxRows={4}
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
                      margin='dense'
                      onChange={(e) => {setTags(e.target.value)}}
                    />
                    <TextField
                      type='text'
                      label='Image Link'
                      variant="outlined"
                      fullWidth
                      required
                      value={img}
                      margin='dense'
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
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Delete this Recipe?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Are you sure you want to delete this recipe? This cannot be undone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setDeleteDialogOpen(false)} color='primary'>
                    Cancel
                </Button>
                <Button color='error' autoFocus onClick={() => handleDelete()}>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={archiveDialogOpen}
                onClose={() => setArchiveDialogOpen(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Archive this Recipe?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Are you sure you want to archive this recipe? It will no longer be seen on by the public.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setArchiveDialogOpen(false)} color='primary'>
                    Cancel
                </Button>
                <Button color='secondary' autoFocus onClick={() => handleArchive()}>
                    Archive
                </Button>
                </DialogActions>
            </Dialog>
          </Box></>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default PostEdit;