import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../favoriteSongsAPI';
import Loading from '../../pages/Loading';

export default class MusicCard extends Component {
    state = {
      loading: false,
      favoriteSongs: [],
    }

    async componentDidMount() {
      const favSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs: favSongs,
      });
    }

    favoriteSong = async ({ target }) => {
      const { songs } = this.props;
      const music = songs.find((song) => song.trackId === Number(target.id));
      this.setState({
        loading: true,
      });
      await addSong(music);
      const favSongs = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSongs: favSongs,
      });
    }

    render() {
      const { songs } = this.props;
      const { loading, favoriteSongs } = this.state;
      return (
        <div>
          {
            loading ? <Loading />
              : songs.map((song) => (
                song.trackId ? (
                  <p key={ song.trackId }>
                    {song.trackName}
                    <audio
                      data-testid="audio-component"
                      src={ song.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                      .
                    </audio>

                    <label
                      htmlFor="favorite"
                    >
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${song.trackId}` }
                        type="checkbox"
                        name="favorite"
                        id={ song.trackId }
                        onChange={ this.favoriteSong }
                        checked={ favoriteSongs
                          .some((id) => id.trackId === song.trackId) }
                      />
                    </label>

                  </p>
                ) : null
              ))
          }
        </div>
      );
    }
}

MusicCard.propTypes = {
  songs: propTypes.arrayOf(propTypes.object).isRequired,
};
