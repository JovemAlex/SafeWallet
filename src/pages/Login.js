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
    // console.log(email);
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
    // const SIX = 6;
    // const validateEmail = /^[^ ]+@[^ ]+.[a-z]{2,3}$/.test(email);
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            required
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            name="password"
            required
          />
          <button
            type="submit"
            onChange={ this.handleChange }
            disabled={ buttonDisabled }
            onClick={ this.handleSubmit }
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
