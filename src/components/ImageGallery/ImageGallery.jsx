import React, { Component } from "react";
import PropTypes from "prop-types";
import { getImages } from "services/getImages";
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'
import {Button} from '../Button/Button'
import { Loader } from "components/Loader/Loader";
import Modal from "components/Modal/Modal";
import css from './ImageGallery.module.css'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component{

  static propTypes = {
    textSearch: PropTypes.string.isRequired,
  };


  state = {
    images: [],
    page: 1,
    totalPages: 0,
    status: Status.IDLE,
    textSearch: '',
    modal: {},
    modalShow: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState){
    const {textSearch} = this.props;

    if (prevProps.textSearch !== textSearch) {
      this.setState({ page: 1, images: [], status: Status.PENDING, textSearch }, () => {
        this.loadImages();
      });
    };


  }

  loadImages(){
    const { textSearch, page } = this.state;
    
      this.setState({isLoading: true});
      getImages(textSearch, page)
      .then((res) => res.json())
      .then((data) => {
        if (data.hits.length === 0) {
          this.setState({ status: Status.RESOLVED });
          alert("No images found!");
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            totalPages: Math.ceil(data.totalHits / 12),
            status: Status.RESOLVED,
          }));
        }
      })
      .catch(() => {
        this.setState({status: Status.REJECTED});
      })
      .finally(() => {
        this.setState({isLoading: false});
      })
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
      this.loadImages();
    });
  };

  handleImageClick = (image) => {
    this.toggleModal();
    this.setState({modal : image.largeImageURL});
  };

  toggleModal= () =>{
    this.setState(({ modalShow }) => ({
        modalShow: !modalShow,
    }));
  };
  
  render() {
    const { images, status, page, totalPages, modalShow, modal, isLoading } = this.state;

      if(status === 'pending') {
        return <Loader />  ;
      };

      if(status === 'rejected') {
        return <h2>Sorry, something went wrong. Please try again later.</h2>;
      }

      if(status === 'resolved') {
        return <div className={css.wrapper}>
            <ul className={css.ul_item}>
              {images.map((image) => (
              <ImageGalleryItem key={image.id} item={image} onClick={this.handleImageClick}/>
              ))}
            </ul>
            {isLoading ? ( <Loader/>) : (page < totalPages && <Button onClick={this.handleLoadMore}/> )}
            {modalShow && <Modal item={modal} onClose={this.toggleModal}/>}
          </div>;
      };
  };
};