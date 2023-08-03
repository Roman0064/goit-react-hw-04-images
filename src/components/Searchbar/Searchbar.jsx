import { useState} from "react";
import PropTypes from "prop-types";
import css from './Searchbar.module.css'

const Searchbar = ({ onSubmit }) => {

  const [ searchBarText, setSearchBarText ] = useState('');

  const handleNameChange = (event) => {
    setSearchBarText(event.currentTarget.value.toLowerCase());
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if(searchBarText.trim() === ''){
      return alert('Please enter something in the search bar');
    };

    onSubmit(searchBarText);
    setSearchBarText('');
  };

    return(
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" class={css.button}>
          <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images"
            value={ searchBarText }
            onChange={ handleNameChange }
          />
        </form>
      </header>
    )
  };

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
