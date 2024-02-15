import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Tooltip, Typography, TextField, Card, Button, CardContent, TextFieldProps } from '@mui/material';



const PostCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [tags, setTags] = useState('');

  // props for each textfield
  const fields: {tip: string, size: number, fieldProps: TextFieldProps}[] = [
    {tip: 'Name of your food', size: 12, 
      fieldProps: {value: title, type: 'text', onChange: (e) => setTitle(e.target.value), label: 'Title',}},
    {tip: 'Picture of your food', size: 12,
      fieldProps: {value: img, type: 'file', onChange: (e) => setImg(e.target.value), label: 'Photo', InputLabelProps: {shrink: true},}},
    {tip: 'Ingredients in this food (list each ingredient seperated by new line or spaces)', size: 5.9,
      fieldProps: {value: ingredients, type: 'text', onChange: (e) => setIngredients(e.target.value), label: 'Ingredients', multiline: true, minRows: 4, maxRows: 4,}},
    {tip: 'Instructions to make this food', size: 5.9,
      fieldProps: {value: recipe, type: 'text', onChange: (e) => setRecipe(e.target.value), label: 'Recipe', multiline: true, minRows: 4, maxRows: 4,}},
    {tip: 'Hashtags (each tag starts with "#" and seperated by spaces)', size: 12,
      fieldProps: {value: tags, type: 'text', onChange: (e) => setTags(e.target.value), label: 'Tags',}},
  ]
  fields.forEach((field => {
    field.fieldProps['variant']='outlined';
    field.fieldProps['margin']='dense';
    field.fieldProps['fullWidth']=true;
  }));


    //Handle Form Submit
    const handlePostCreate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newRecipe = [title, img, ingredients, recipe, tags];
      console.log(`Recipe has been created! ${newRecipe}`);
      navigate('/feed');
    }

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

/*<React.Fragment>
<Box sx = {{height: '100vd', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
<Box component="section" sx={{ p: 8, border: '2px solid black', bgcolor: '#606c38', margin: 10, marginLeft: 15, marginRight: 15, justifyContent: 'center', alignItems: 'center'}}>
<Grid container spacing={8} direction = "column" justifyContent = "space-between">
<Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              textAlign: "center"
            }}
          >
            Make A Post!
</Typography>
  <Grid item xs={8} sm={6}>
    <TextField
      id = "headline"
      name = "headline"
  
      sx = {{bgcolor: 'white', border: '2px solid black'}}
      
    />
  </Grid>
  <Grid item xs={8} sm={6}>
    <TextField
      id = "ingredients"
      name =  "ingredients"
  
      multiline
      rows = {4}
      sx = {{bgcolor: 'white', border: '2px solid black'}}
      
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      id = "recipe"
      name =  "recipe"
  
      multiline
      rows = {4}
      sx = {{bgcolor: 'white', border: '2px solid black', width: 500}}
      margin='dense'
    />
  </Grid>
  <Input type='file' inputfieldProps={{ accept: 'image/*'}} onChange={handleFileChange} style={{margin: '30px'}} />
</Grid>
<Link to='/feed'><Button variant="contained" color="success" size = "small">
        Post
</Button></Link>
</Box>
</Box>
</React.Fragment>*/