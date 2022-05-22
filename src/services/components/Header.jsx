import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Search
              </Link>

            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites

              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile
              </Link>

            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
