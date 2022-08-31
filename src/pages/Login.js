import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailValue } from '../redux/actions';

const CINCO = 5;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(emailValue(email));
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.buttonValidation();
    });
  };

  // VALIDAÇÃO FEITA COM AJUDA DE RAFAEL MIRANDA
  buttonValidation = () => {
    const { email, password } = this.state;
    const validatePassword = password.length > CINCO;
    const regex = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    const validateEmail = regex.test(email);

    if (validateEmail === true && validatePassword === true) {
      this.setState({ buttonDisabled: false });
    } else this.setState({ buttonDisabled: true });
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <fieldset>
        <h1>TrybeWallet💰</h1>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="email-input"
              id="email"
              onChange={ this.handleChange }
              value={ email }
              name="email"
              required
            />
          </label>
          {' '}
          <label htmlFor="password">
            Password:
            <input
              type="password"
              data-testid="password-input"
              id="password"
              onChange={ this.handleChange }
              value={ password }
              name="password"
              required
            />
          </label>
          <button
            type="submit"
            onChange={ this.handleChange }
            disabled={ buttonDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </fieldset>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
