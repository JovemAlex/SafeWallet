import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func } from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleClick = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const expense = expenses.filter(({ id }) => id !== Number(target.id));
    dispatch(removeExpense(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="container mx-auto mt-8">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Descrição</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Tag</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Método de pagamento</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Valor</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Moeda</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Câmbio utilizado</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Valor convertido</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Moeda de conversão</th>
              <th className="px-4 py-2 bg-cyan-400/60 border-b">Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses
              .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
                <tr key={ id }>
                  <td className="px-4 py-2 border-b">{description}</td>
                  <td className="px-4 py-2 border-b">{tag}</td>
                  <td className="px-4 py-2 border-b">{method}</td>
                  <td className="px-4 py-2 border-b">{Number(value).toFixed(2)}</td>
                  <td className="px-4 py-2 border-b">{exchangeRates[currency].name}</td>
                  <td className="px-4 py-2 border-b">
                    {Number(exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {(value * exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b">Real</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      id={ id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.handleClick }
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: arrayOf(shape()).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Table);
