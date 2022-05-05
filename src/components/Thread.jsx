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


export default function Thread() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { uid, displayName, photoURL, text } = auth.currentUser;

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
                <input
                    type='text'
                    value={newMessage}
                    onChange={handleChange}
                    placeholder='Type your message here...'
                />

                <Button color="secondary" type='submit' disabled={!newMessage}>Send</Button>
            </form>
        </div >
    );
}
