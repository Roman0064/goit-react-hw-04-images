import { Component } from "react";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery'

class App extends Component {
  state = {
    textSearch: '',
  };

  handleFormSubmit = textSearch => {
    this.setState({ textSearch });
  };

  render() {
    return(
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery textSearch={this.state.textSearch}/>
      </div>
    )
  };
};

App.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default App;
