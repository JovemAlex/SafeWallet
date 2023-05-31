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
      <div
        className="
        bg-gradient-to-r
        from-cyan-500
        to-blue-500
        h-screen
        flex
        justify-center
        items-center
        flex-col
        "
      >
        <h1 className="text-9xl font-bold text-white">SelfWallet🔒</h1>
        <form className="flex flex-col">
          <label htmlFor="email">
            <input
              type="email"
              data-testid="email-input"
              id="email"
              onChange={ this.handleChange }
              value={ email }
              name="email"
              required
              placeholder="Email"
              className="
              p-3
              border
              rounded-lg
              font-medium
              mt-3
              mb-5
              "
            />
          </label>
          {' '}
          <label htmlFor="password">
            <input
              type="password"
              data-testid="password-input"
              id="password"
              onChange={ this.handleChange }
              value={ password }
              name="password"
              required
              placeholder="Password"
              className="
              p-3
              border
              rounded-lg
              font-medium
              mb-5
              "
            />
          </label>
          <button
            type="submit"
            onChange={ this.handleChange }
            disabled={ buttonDisabled }
            onClick={ this.handleSubmit }
            className="
            p-3
            bg-transparent
            border
            rounded-lg
            text-emerald-100
            mb-5
            transition duration-700 ease-in-out
            disabled:bg-slate-50/50
            disabled:text-white-500/50
            disabled:border-slate-200/50
            disabled:shadow-none
            enabled:bg-green-500
            enabled:text-white-500
            enabled:border-green-400
            "
          >
            Entrar
          </button>
        </form>
      </div>
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
