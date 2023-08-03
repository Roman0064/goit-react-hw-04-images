import { useState } from "react";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery'

const App = () => {
  const [textSearch, setTextSearch ] = useState('');


  const handleFormSubmit = textSearch => {
    setTextSearch(textSearch);
  };

  return(
    <div>
      <Searchbar onSubmit={handleFormSubmit}/>
      <ImageGallery textSearch={textSearch}/>
    </div>
  )
};

App.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default App;