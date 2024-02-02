import ImageList from '@mui/material/ImageList';
import { useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useMediaQuery } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ModalClose from '@mui/joy/ModalClose';


export default function Posts() {
  const can_fit = useMediaQuery('(min-width: 850px)');

  const [open, setOpen] = useState(false);

  const [currentItem, setItem] = useState<postInfo | null>(null);

  interface postInfo {
    img: string;
    title: string;
    author: string;
    ingredients: string[];
  }

  function handler() {

    if (open) {
      setOpen(false) }
      else {
        setOpen(true)
      }
  }


  return (
    <ImageList cols={can_fit ? 3 : 2}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ marginTop: 5, marginLeft: 4, marginRight: 4 }}>
          <img
            srcSet={`${item.img}?w=350&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=350&fit=crop&auto=format`}
            alt={item.title}
            
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              onClick={() => {
                  handler(); 
                  setItem(item)}}
              >
                <InfoIcon />
              </IconButton>


            }
          />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
            className="modal"
            open={open}

          >
            <Box>
                <h2>{currentItem?.title}</h2>
                <ul>
                  {currentItem?.ingredients?.map((ingredient, index) => {
                    return <li key={index}>{ingredient}</li>
                  })}
                </ul>
              <ModalClose onClick={() => {
                handler();
                setItem(null)
              }} variant="outlined"/>

            </Box>

          </Modal>
        </ImageListItem>
      ))}
    </ImageList>
  );
}







const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
    ingredients: ['salt', 'tomatoes'],
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
    ingredients: ['water', 'milk', 'okra']
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
    ingredients: ['sugar', 'flour', 'eggs']
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    ingredients: ['sugar', 'flour', 'eggs']
  },
];