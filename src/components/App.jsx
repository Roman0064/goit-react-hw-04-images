import { useState } from "react";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery'

const App = () => {
  const [page, setPage] = useState(1);
  const [textSearch, setTextSearch ] = useState('');


  const handleFormSubmit = textSearch => {
    setTextSearch(textSearch);
    setPage(1);
  };

  return(
    <div>
      <Searchbar onSubmit={handleFormSubmit}/>
      <ImageGallery page={page} setPage={setPage} setTextSearch={setTextSearch} textSearch={textSearch}/>
    </div>
  )
};

App.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default App;
