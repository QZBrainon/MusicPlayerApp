import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state={
    userName: '',
    userNameMinLength: 3,
    isButtonDisabled: true,
    loading: false,
    redirect: false,
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyButton);
  }

  verifyButton = () => {
    const { userName, userNameMinLength } = this.state;
    if (userName.length >= userNameMinLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  clickHandler = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({
      name: userName,
    });
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const { userName, isButtonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <form>
              <label htmlFor="login">
                Nome
                <input
                  type="text"
                  name="userName"
                  data-testid="login-name-input"
                  value={ userName }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                disabled={ isButtonDisabled }
                type="button"
                data-testid="login-submit-button"
                onClick={ this.clickHandler }
              >
                Entrar

              </button>
            </form>)}
        {redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
