import React, { Component } from 'react';
import { func, arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses, getCurrenciesData } from '../redux/actions/index';
import fetchAPI from '../redux/services';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesData());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { id } = this.state;
    const response = await fetchAPI();
    this.setState({ exchangeRates: response });
    dispatch(addExpenses(this.state));

    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    return (
      <>
        {/* valor da despesa */}
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        {/* descrição da despesa */}
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>

        {/* moeda */}
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((e, i) => (<option key={ i } value={ e }>{ e }</option>)) }
          </select>
        </label>

        {/* método de pagamento */}
        <label htmlFor="method">
          Método:
          <select
            name="method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        {/* categoria */}
        <label htmlFor="tag">
          categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa

        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
