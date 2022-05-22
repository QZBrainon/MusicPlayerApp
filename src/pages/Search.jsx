import React, { Component } from 'react';
import Header from '../services/components/Header';

export default class Search extends Component {
  state={
    nameOfSearch: '',
    isBtnDisabled: true,
    minNameLength: 2,
  }

  typeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyBtn);
  }

  verifyBtn = () => {
    const { nameOfSearch, minNameLength } = this.state;
    if (nameOfSearch.length >= minNameLength) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  }

  render() {
    const { isBtnDisabled, nameOfSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          Nome
          <input
            type="text"
            value={ nameOfSearch }
            name="nameOfSearch"
            onChange={ this.typeHandler }
            placeholder=" Banda ou artista"
            data-testid="search-artist-input"
          />
          <button
            disabled={ isBtnDisabled }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar

          </button>

        </form>
      </div>
    );
  }
}
