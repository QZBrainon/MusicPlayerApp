import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { songs } = this.props;
    return (
      <div>
        {songs.filter((_song, index) => index > 0)
          .map((song) => (
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
            </p>
          ))}
      </div>
    );
  }
}
