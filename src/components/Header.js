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
      <div className="flex w-11/12 flex-col justify-center items-center">
        <h1 className="text-7xl mb-10 font-bold">SafeWallet🔒</h1>
        <div className="flex w-11/12 flex justify-between text-xl">
          <div
            data-testid="email-field"
            className="flex bg-transparent border p-2 rounded-xl"
          >
            <p className="mr-2">Email:</p>
            <h3 className="font-bold">{ email.toUpperCase() }</h3>
          </div>
          <div
            data-testid="total-field"
            className="flex bg-transparent border p-2 rounded-xl"
          >
            <p className="mr-2">Despesa Total:</p>
            <h3 className="font-bold">
              R$
              { exchangeRatesValue }
            </h3>
          </div>
          <div
            data-testid="header-currency-field"
            className="flex bg-transparent border p-2 rounded-xl"
          >
            <p className="mr-2">Câmbio:</p>
            <h3 className="font-bold">BRL</h3>
          </div>
        </div>
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
