import React, { Component } from 'react';
import Loading from '../../pages/Loading';
import { getUser } from '../userAPI';

export default class Header extends Component {
  state = {
    requestedName: '',
    loading: false,
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();
    this.setState({
      requestedName: response.name,
      loading: false,
    });
  };

  render() {
    const { requestedName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : (
            <h1 data-testid="header-user-name">
              {requestedName}
            </h1>
          )}
      </header>
    );
  }
}
