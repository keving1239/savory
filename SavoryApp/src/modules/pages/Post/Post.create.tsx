import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Tooltip, Typography, TextField, Card, Button, CardContent, TextFieldProps } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { createRecipe } from '../../../redux/Recipes/recipes-slice'

const PostCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.userReducer.user?.id);
  const isAuthenticated = useSelector((state: RootState) => state.userReducer.isAuthenticated);
  useEffect(() => {if(!isAuthenticated) navigate('/');}, [isAuthenticated]);
  // form states
  const [title, setTitle] = useState('');
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
  // form submission
  const handlePostCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateFields();
    if(!isValid || !userId) return;
    await dispatch(createRecipe(
      {userId: userId, headline: title, ingredients: ingredients, recipe: recipe, img: img, tags: tags}
    ));
    navigate('/feed');
  }

  // props for each textfield
  const fields: {tip: string, size: number, fieldProps: TextFieldProps}[] = [
    {tip: 'Name of your food', size: 12, 
      fieldProps: {value: title, type: 'text', onChange: (e) => setTitle(e.target.value), error: titleError.error, helperText: titleError.helperText,
      label: 'Title', placeholder: 'Southwest Salad', required: true, variant: 'outlined', margin: 'dense', fullWidth: true}},
    {tip: 'URL for a picture of your food', size: 12,
      fieldProps: {value: img, type: 'text', onChange: (e) => setImg(e.target.value),
      label: 'Image', placeholder: 'https://images.unsplash.com/...', required: true, fullWidth: true}},
    {tip: 'Ingredients in this food (list each ingredient seperated by new line or commas)', size: 5.9,
      fieldProps: {value: ingredients, type: 'text', onChange: (e) => setIngredients(e.target.value), error: ingredientsError.error, helperText: ingredientsError.helperText,
      label: 'Ingredients', placeholder: '1 Head Romaine Lettuce\n12 Cherry Tomatoes\n1 Can Black Beans\n...', 
      required: true, multiline: true, minRows: 4, maxRows: 4, variant: 'outlined', margin: 'dense', fullWidth: true}},
    {tip: 'Instructions to make this food', size: 5.9,
      fieldProps: {value: recipe, type: 'text', onChange: (e) => setRecipe(e.target.value),
      label: 'Recipe', placeholder: 'First, prepare your vegetables. Next, Drain and rinse the black beans.', 
      required: true, multiline: true, minRows: 4, maxRows: 4, variant: 'outlined', margin: 'dense', fullWidth: true}},
    {tip: 'One word hashtags seperated by commas', size: 12,
      fieldProps: {value: tags, type: 'text', onChange: (e) => setTags(e.target.value), error: tagsError.error, helperText: tagsError.helperText,
      label: 'Tags', placeholder: '#TexMex, #Refreshing, #Healthy', variant: 'outlined', margin: 'dense', fullWidth: true}},
  ];
  return (      
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='70vh'>
    <Card elevation={10} sx={{maxWidth: '60vw'}}>
      <CardContent>
        <Typography variant='h4'>Share Your Recipe!</Typography>
        <form onSubmit={(e) => handlePostCreate(e)}>
          <Grid container justifyContent='space-between' alignItems='center'>
            {fields.map((field, index) => (
              <Grid item xs={field.size} key={index}><Tooltip title={field.tip} placement='top-start'>
                <TextField {...field.fieldProps}/>
              </Tooltip></Grid>
            ))}
          </Grid>
          <Button variant='contained' sx={{mt: '1vh'}} type='submit' size='large'>
              <Typography>Submit</Typography>
          </Button>
        </form>
      </CardContent>
    </Card>
    </Box>
  );
}

export default PostCreate;