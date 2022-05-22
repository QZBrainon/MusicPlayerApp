import React, { Component } from 'react';
import Header from '../services/components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h1>Favoritos</h1>
        <Header />
      </div>
    );
  }
}
