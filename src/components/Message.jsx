import React from 'react';
import { formatRelative } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

const Message = ({
    text = '',
    displayName = '',
    photoURL = '',
    createdAt = null,
}) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
            {
                photoURL ? (
                    <Avatar src={photoURL} alt='avatar' width={50} height={50} sx={{ alignItems: "flex-start" }} />
                ) : null}
            {displayName ? <ListItemText primary={displayName}></ListItemText> : null}
            {
                createdAt?.seconds ? (
                    <ListItemText secondary={formatRelative(new Date(createdAt.seconds * 1000), new Date())}>
                    </ListItemText>
                ) : null
            }
            <React.Fragment>
                <Typography sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary">{text}</Typography>
            </React.Fragment>
        </List >
    );
};

export default Message;
