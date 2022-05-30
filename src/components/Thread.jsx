import React, { useEffect, useState } from 'react';
import { db, auth } from '../App';
import {
    onSnapshot,
    collection,
    query,
    orderBy,
    setDoc,
    doc,
} from 'firebase/firestore';
import Message from './Message';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';


export default function Thread() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { uid, displayName, photoURL } = auth.currentUser;

    useEffect(() => {
        const collRef = collection(db, 'messages');
        const q = query(collRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
            }
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMessages(data);
        });

        return unsubscribe;
    }, []);

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };

    const messageRef = doc(collection(db, 'messages'));
    const data = {
        text: newMessage,
        createdAt: Date.now(),
        uid,
        displayName,
        photoURL,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setDoc(messageRef, data);
        setNewMessage('');
    };

    return (
        <div>
            {messages &&
                messages.map((message) => (
                    <ListItem alignItems="flex-start">
                        <Message key={message.id} {...message} />
                    </ListItem>
                ))}
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Type your message here..." variant="outlined" value={newMessage}
                    onChange={handleChange}
                />
                <Button type='submit' variant="outlined" endIcon={<SendIcon />} disabled={!newMessage} sx={{
                    height: 56,
                }}>Send</Button>
            </form>
        </div>
    );
}
