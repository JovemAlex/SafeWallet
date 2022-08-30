import React, { Component } from 'react';
import { func, arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesData } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesData());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form>
        {/* valor da despesa */}
        <label htmlFor="despesa">
          Valor:
          <input
            type="number"
            name="despesa"
            id="despesa"
            data-testid="value-input"
          />
        </label>

        {/* descrição da despesa */}
        <label htmlFor="describe">
          Descrição:
          <input
            type="text"
            name="describe"
            id="describe"
            data-testid="description-input"
          />
        </label>

        {/* moeda */}
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
          >
            { currencies.map((e, i) => (<option key={ i } value={ e }>{ e }</option>)) }
          </select>
        </label>

        {/* método de pagamento */}
        <label htmlFor="methods">
          Método:
          <select name="methods" id="methods" data-testid="method-input">
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>

        {/* categoria */}
        <label htmlFor="category">
          <select name="categories" id="category" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
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
