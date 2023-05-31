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
      <div
        className="
        flex
        justify-center
        items-center
        bg-tranparent
        border
        w-11/12
        mt-10
        rounded-lg
        h-40"
      >
        {/* valor da despesa */}
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
            placeholder="Valor"
            className="
            bg-transparent
            placeholder:text-white
            placeholder:italic
            border
            p-2
            rounded-lg
            m-2
            "
          />
        </label>

        {/* descrição da despesa */}
        <label htmlFor="description">
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
            placeholder="Descrição"
            className="
            bg-transparent
            placeholder:text-white
            placeholder:italic
            border
            p-2
            rounded-lg
            m-2
            "
          />
        </label>

        {/* moeda */}
        <label htmlFor="currency">
          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
            className="
            text-black
            bg-cyan-200/50
            p-3
            rounded-lg
            m-2"
          >
            { currencies.map((e, i) => (<option key={ i } value={ e }>{ e }</option>)) }
          </select>
        </label>

        {/* método de pagamento */}
        <label htmlFor="method">
          <select
            name="method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
            className="
            text-black
            bg-cyan-200/50
            p-3
            rounded-lg
            m-2"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        {/* categoria */}
        <label htmlFor="tag">
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
            className="
            text-black
            bg-cyan-200/50
            p-3
            rounded-lg
            m-2"
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
          className="
          p-2
          m-2
          bg-green-500/80
          border
          border-solid
          border-4
          border-green-500/80
          rounded-lg
          hover:bg-green-500/90
          hover:border-green-500
          "
        >
          Adicionar despesa

        </button>
      </div>
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
