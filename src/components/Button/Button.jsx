import React from "react";
import PropTypes from "prop-types";
import css from './Button.module.css'

const Button = ({ onClick}) => {
    return (
      <button onClick={onClick} className={css.button} type="button">Load More</button>
    );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
