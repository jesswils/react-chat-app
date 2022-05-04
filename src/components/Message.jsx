import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    text = '',
    displayName = '',
    photoURL = '',
    createdAt = null,
}) => {
    return (
        <div>
            {photoURL ? (
                <img src={photoURL} alt='avatar' width={50} height={50} />
            ) : null}
            {displayName ? <p>{displayName}</p> : null}
            {console.log(createdAt)}
            {createdAt?.seconds ? (
                <span>
                    {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                </span>
            ) : null}
            <p>{text}</p>
        </div>
    );
};

export default Message;
