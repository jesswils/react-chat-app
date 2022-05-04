import { useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

export default function Loading() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#FFC0CB");

    return (
        <div>
            <SyncLoader loading={loading} color={color} />
        </div>
    );
}
