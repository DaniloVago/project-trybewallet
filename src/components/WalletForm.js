import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesInfo, expensesInfo } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currencies: [],
    resultsAPI: [],
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.searchAPI();
  }

  searchAPI = async () => {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    const data = Object.keys(results).filter((e) => e !== 'USDT');
    this.setState({ currencies: data, resultsAPI: results });
    dispatch(currenciesInfo(data));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch, expenses } = this.props;
    const { resultsAPI, value, description, currency, method, tag } = this.state;
    this.searchAPI();
    const arrayLength = expenses.length;
    const expensesAdd = {
      id: arrayLength,
      exchangeRates: resultsAPI,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(expensesInfo(expensesAdd));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, value, description, currency, method, tag } = this.state;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              type="number"
              placeholder="Valor da despesa"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              type="text"
              placeholder="Descrição da despesa"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((currencie) => (
                <option key={ currencie }>
                  { currencie }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
});

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
