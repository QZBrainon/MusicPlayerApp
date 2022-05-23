import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../services/components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../services/components/MusicCard';

export default class Album extends Component {
  state = {
    requestedSongs: [],
    artistName: '',
    collectionName: '',
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchMusics(id);
  }

   fetchMusics = async (id) => {
     const request = await getMusics(id);
     const { artistName, collectionName } = request[1];
     this.setState({
       requestedSongs: request,
       artistName,
       collectionName,
     });
   };

   render() {
     const { requestedSongs, artistName, collectionName } = this.state;
     return (
       <div data-testid="page-album">
         <Header />
         <h1>Album</h1>
         <h2 data-testid="artist-name">{`Artist Name: ${artistName}`}</h2>
         <h3 data-testid="album-name">
           {`Collection Name: ${collectionName}`}
           {' '}
           by
           {' '}
           {artistName}
         </h3>
         <MusicCard songs={ requestedSongs } />
       </div>
     );
   }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};
