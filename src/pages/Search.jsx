import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../services/components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state={
    nameOfSearch: '',
    savedName: '',
    isBtnDisabled: true,
    minNameLength: 2,
    loading: false,
    requestResults: [],
    showResults: false,
  }

  typeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyBtn);
    this.setState({
      savedName: value,
    });
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

  onSearchBtnClick = async () => {
    const { nameOfSearch } = this.state;
    this.setState({
      nameOfSearch: '',
      loading: true,
    });
    const request = await searchAlbumsAPI(nameOfSearch);
    console.log(request);
    this.setState({
      loading: false,
      requestResults: request,
      showResults: true,
    });
  }

  // verifyResults = () => {
  //   const {requestResults} = this.state;
  //   if (requestResults !== undefined){

  //   }
  // }

  render() {
    const { isBtnDisabled,
      nameOfSearch,
      loading,
      requestResults,
      savedName,
      showResults } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {loading ? <Loading />
          : (
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
                onClick={ this.onSearchBtnClick }
              >
                Pesquisar

              </button>

            </form>
          )}
        {
          showResults ? <h2>{`Resultado de álbuns de: ${savedName}`}</h2>
            : null

        }
        <div>

          {
            !requestResults.length ? <h2>Nenhum álbum foi encontrado</h2>
              : requestResults.map((result) => (
                <Link
                  key={ result.artistId }
                  data-testid={ `link-to-album-${result.collectionId}` }
                  to={ `/album/${result.collectionId}` }
                >
                  {result.collectionName}

                </Link>))
          }

        </div>
      </div>
    );
  }
}
