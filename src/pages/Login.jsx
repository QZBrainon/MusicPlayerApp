import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state={
    userName: '',
    userNameMinLength: 3,
    isButtonDisabled: true,
    // loading: false,
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

  clickHandler = () => {
    const { userName } = this.state;
    createUser({
      name: userName,
    });
    // this.setState
  }

  render() {
    const { userName, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-login">
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
        </form>
      </div>
    );
  }
}
