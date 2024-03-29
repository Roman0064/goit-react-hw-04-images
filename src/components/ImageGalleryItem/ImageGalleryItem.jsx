import React from "react";
import PropTypes from "prop-types";
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ item, onClick }) => {
    const { webformatURL, tags, } = item;

    return (
        <li className={css.li_item}>
            <img src={webformatURL} alt={tags} className={css.ImageGalleryItem_image } onClick={() => onClick(item)}/>
        </li>
    );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
};