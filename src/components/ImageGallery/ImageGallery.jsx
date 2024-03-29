import React, { useEffect, useState } from 'react';
import getImages from 'services/getImages';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ textSearch, page, setPage }) => {
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [modal, setModal] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadImages = () => {
      setIsLoading(true);
      getImages(textSearch, page)
        .then(res => res.json())
        .then(data => {
          if (data.hits.length === 0) {
            setStatus(Status.RESOLVED);
            alert('No images found!');
          } else {
            setImages(prevState =>
              page === 1 ? data.hits : [...prevState, ...data.hits]
            );
            setTotalPages(Math.ceil(data.totalHits / 12));
            setStatus(Status.RESOLVED);
          }
        })
        .catch(() => {
          setStatus(Status.REJECTED);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (textSearch) {
      
      if (page === 1) {
        setImages([]);
        setStatus(Status.PENDING);
      };
      loadImages();
      return;
    }

  }, [textSearch, page]);

  const handleLoadMore = () => {
    setPage( prevState => prevState + 1 );
  };

  const handleImageClick = image => {
    toggleModal();
    setModal(image.largeImageURL);
  };

  const toggleModal = () => {
    setModalShow(modalShow => !modalShow);
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h2>Sorry, something went wrong. Please try again later.</h2>;
  }

  if (status === 'resolved') {
    return (
      <div className={css.wrapper}>
        <ul className={css.ul_item}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              item={image}
              onClick={handleImageClick}
            />
          ))}
        </ul>
        {isLoading ? (
          <Loader />
        ) : (
          page < totalPages && <Button onClick={handleLoadMore} />
        )}
        {modalShow && <Modal item={modal} onClose={toggleModal} />}
      </div>
    );
  }
};
export default ImageGallery;