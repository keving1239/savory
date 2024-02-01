import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ModalClose from '@mui/joy/ModalClose';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';


export default function oneModal({ data, onClose }: {data:any, onClose:boolean}) {

    const [open, setOpen] = useState(false);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
            className="modal"
            open={open}
        >
            <Box>
                <Typography>
                    <h2>{data.title}</h2>
                </Typography>
                <Typography id="modal-modal-title">
                    <ul>
                        {data.ingredients?.map(({ingredient, index}: {ingredient:any, index:any}) => {
                            return <li key={index}>{ingredient}</li>
                        })}
                    </ul>
                </Typography>

            </Box>

        </Modal>
    )
}