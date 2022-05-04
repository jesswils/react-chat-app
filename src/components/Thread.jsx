import { useEffect, useState } from 'react';
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
            <ul>
                {messages &&
                    messages.map((message) => (
                        <li key={message.id}>
                            <Message {...message} />
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newMessage}
                    onChange={handleChange}
                    placeholder='Type your message here...'
                />
                <button type='submit' disabled={!newMessage}>
                    Send
                </button>
            </form>
        </div>
    );
}
