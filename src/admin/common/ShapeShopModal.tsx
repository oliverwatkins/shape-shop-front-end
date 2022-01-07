import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {SvgIconComponent} from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    title: string
    description: string
    buttonText: string
    buttonIcon?: any //React.FunctionComponent // SvgIconComponent
    children: any
    actions?: { onClick: Function, text: string, icon: any }[]
}

export default function ShapeShopModal(props: Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let ButtonIcon = props.buttonIcon;

    return (
        <div>
            {/*<Button color="inherit" startIcon={props.children[0]} onClick={handleOpen}>*/}
            {/*    {props.buttonText}</Button>*/}
            <Button color="inherit" startIcon={<ButtonIcon/>} onClick={handleOpen}>
                {props.buttonText}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            ><>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {props.description}
                    </Typography>
                    {
                        props.children
                    }
                </Box>
            </>
            </Modal>
        </div>
    );
}
