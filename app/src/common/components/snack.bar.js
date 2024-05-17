import React, { useEffect, useState } from 'react';

const Snackbar = ({ id, message, duration = 3000, onClose }) => {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setClosing(true), duration - 500);
        const closeTimer = setTimeout(() => onClose(id), duration);
    
        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose, id]);
    
    useEffect(() => {
        if (closing) {
        const animationTimer = setTimeout(() => {
            setClosing(false);
            onClose(id);
        }, 500); // 애니메이션 지속 시간
        return () => clearTimeout(animationTimer);
        }
    }, [closing, onClose, id]);

    return (
        <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-warn01 px-4 py-2 rounded shadow-md flex items-center space-x-2 ${
                closing ? 'animate-shrinkOut' : 'animate-slideIn'
            }`}
        >
            <span className='text-sm text-white'>{message}</span>
            <button onClick={() => setClosing(true)} className="text-xl font-bold pb-1">
                &times;
            </button>
        </div>
    );
};

export default Snackbar;
