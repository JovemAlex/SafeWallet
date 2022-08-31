import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const exchangeRatesValue = expenses.reduce((acc, curr) => {
      // console.log(exchangeRatesValue);
      const currency = curr.exchangeRates[curr.currency];
      // console.log(currency);
      const rate = currency.ask * curr.value;
      // console.log(rate);
      const rates = Number((rate).toFixed(2));
      // console.log(rates);
      return acc + rates;
    }, 0);
    return (
      <div>
        Email:
        <h3 data-testid="email-field">{ email }</h3>
        Despesa Total:
        <h3
          data-testid="total-field"
        >
          { exchangeRatesValue }
        </h3>
        Câmbio:
        <h3 data-testid="header-currency-field">BRL</h3>
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
