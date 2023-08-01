import { Component} from "react";
import PropTypes from "prop-types";
import css from './Searchbar.module.css'

class Searchbar extends Component {
  state = {
    textSearch: '',
  };

  handleNameChange = (event) => {
    this.setState({ textSearch: event.currentTarget.value.toLowerCase() });
  };
  
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.textSearch.trim() === ''){
      return alert('Please enter something in the search bar');
    };

    this.props.onSubmit(this.state.textSearch);
    this.setState({ textSearch: '' });
  };

  render() {
    return(
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" class={css.button}>
          <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images"
            value={ this.state.textSearch }
            onChange={ this.handleNameChange }
          />
        </form>
      </header>
    )
  };
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
