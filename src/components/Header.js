import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpense = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, cur) => {
      const currencyExchange = cur.exchangeRates[cur.currency].ask;
      const { value } = cur;
      acc += value * currencyExchange;
      return acc;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <div>Header</div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.totalExpense() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
