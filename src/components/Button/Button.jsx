import React from "react";
import PropTypes from "prop-types";
import css from './Button.module.css'

export const Button = ({ onClick}) => {
    return (
      <button onClick={onClick} className={css.button}>Load More</button>
    );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
