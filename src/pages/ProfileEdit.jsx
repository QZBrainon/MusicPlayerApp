import React, { Component } from 'react';
import Header from '../services/components/Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <h1>Profile Edit</h1>
        <Header />
      </div>
    );
  }
}
