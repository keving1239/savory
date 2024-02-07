import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Typography, Grid, Button, Stack, Card, CardContent, Box } from '@mui/material';
import { useParams } from 'react-router';

const Post = () => {
    const {id} = useParams();
    const currentItem = {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: `Coffee ${id}`,
        author: '@nolanissac',
        ingredients: ['sugar', 'flour', 'eggs'],
        isBookmarked: false,
        tags: [],
        date: new Date()
    }
    const key = 1;
    const setBookmark = (value: boolean) => {
        currentItem.isBookmarked = value;
    }
       return (
        <Box>
        <div id="titleIcon" key={key}>
            <h1>{currentItem.title}</h1>
            <IconButton
                sx={{ color: 'black' }}
                aria-label={`info about ${currentItem.title}`}
                // onClick={setBookmark}>
            >
                {currentItem.isBookmarked ? (
                    <BookmarkIcon />
                ) : (
                    <BookmarkBorderIcon />
                )}
            </IconButton>
        </div>
        <div id="author">
            <a href="" >{currentItem.author}</a>
            <ul id="tags">
                {currentItem?.tags?.map((tag, index) => {
                    return <li key={index}><strong>#{tag}</strong></li>
                })}
            </ul>
        </div>
        <div id='modal1'>
            <div id='ingredients'>
                <h4>Ingredients:</h4>
                <ul>
                    {currentItem?.ingredients?.map((ingredient, index) => {
                        return <li key={index}>{ingredient}</li>
                    })}
                </ul>
            </div>
            <img
                srcSet={`${currentItem.img}?w=350&fit=crop&auto=format&dpr=2 2x`}
                src={`${currentItem.img}?w=350&fit=crop&auto=format`}
                alt={currentItem.title}

                loading="lazy"
            />
        </div>
        <div id="steps">
            <h4>Steps:</h4>
            <ol>
                {currentItem?.ingredients?.map((ingredient, index) => {
                    return <li key={index}>{ingredient}</li>
                })}
            </ol>
        </div>
    </Box>
       );
};

export default Post;