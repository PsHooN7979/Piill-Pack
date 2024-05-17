import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { removeSnackBar } from '../feature/slices/snackBar.slice';

const Snackbar = ({ id, message, duration = 3000 }) => {
    const dispatch = useDispatch();
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setClosing(true), duration - 500);
        const closeTimer = setTimeout(() => dispatch(removeSnackBar(id)), duration);

        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [dispatch, duration, id]);

    useEffect(() => {
        if (closing) {
        const animationTimer = setTimeout(() => {
                setClosing(false);
                dispatch(removeSnackBar(id));
            }, 500); // 애니메이션 지속 시간
            return () => clearTimeout(animationTimer);
        }
    }, [closing, dispatch, id]);

    // createPortal을 사용하여 document.body에 직접 렌더링
    return createPortal(
        <div className='fixed top-5 flex justify-center items-center z-50 w-full'>
            <div
                className={`w-auto bg-mint04 px-4 py-2 rounded shadow-custom01 flex items-center space-x-2 ${
                    closing ? 'animate-shrinkOut' : 'animate-slideIn'
                }`}
            >
                <span className="text-xs text-white">{message}</span>
                <button onClick={() => setClosing(true)} className="text-xl font-bold">
                    &times;
                </button>
            </div>
        </div>
        ,
        document.body
    );
};

export default Snackbar;
