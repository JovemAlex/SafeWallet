import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const exchangeRatesValue = expenses.reduce((acc, curr) => {
      const currency = curr.exchangeRates[curr.currency];
      const rate = currency.ask * curr.value;
      const rates = Number((rate).toFixed(2));
      return Number(acc) + rates;
    }, '0.00');

    return (
      <div className="bg-red-600 flex w-11/12 flex-col">
        <div
          data-testid="email-field"
          className="bg-green-600 flex "
        >
          <p className="mr-2">Email:</p>
          <h3 className="font-bold">{ email.toUpperCase() }</h3>
        </div>
        <h3
          data-testid="total-field"
          className="bg-blue-600"
        >
          Despesa Total: R$
          { exchangeRatesValue }
        </h3>
        <h3
          data-testid="header-currency-field"
          className="bg-yellow-600"
        >
          Câmbio: BRL
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
