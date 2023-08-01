import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from './Modal.module.css'

const Modal = ({item, onClose}) => {

    useEffect(() => {
        const handleKeyDown = e => {
            if(e.code === 'Escape'){
                onClose();
            };
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

    const onClickBackdrop = e => {
        if(e.target === e.currentTarget){
            onClose();
        };
    };

    return <div class={css.overlay} onClick={onClickBackdrop}>
            <div class={css.modal}>
                <img src={item} alt='pictures'/>
            </div>
        </div>
};

Modal.propTypes = {
    item: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
