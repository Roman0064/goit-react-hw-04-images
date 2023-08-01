import React, { Component } from "react";
import PropTypes from "prop-types";
import css from './Modal.module.css'

class Modal extends Component {

    static propTypes = {
        item: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    componentDidMount(){
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount(){
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if(e.code === 'Escape'){
            this.props.onClose();
        };
    };

    onClickBackdrop = e => {
        if(e.target === e.currentTarget){
            this.props.onClose();
        };
    };

    render() {
        return <div class={css.overlay} onClick={this.onClickBackdrop}>
                <div class={css.modal}>
                    <img src={this.props.item} alt='pictures'/>
                </div>
            </div>
    };
};

export default Modal;
