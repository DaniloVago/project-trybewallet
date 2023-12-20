import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { personalInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(personalInfo(email));
    history.push('/carteira');
  };

  enableButton = () => {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const validateEmail = re.test(email);
    const minPassword = 6;
    const validatePass = password.length >= minPassword;
    const allValidate = validateEmail && validatePass; // booleano
    return allValidate;
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div className="login">
          <label htmlFor="email">
            <input
              data-testid="email-input"
              placeholder="Digite o e-mail"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              placeholder="Digite a senha"
              type="text"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSubmit }
            disabled={ !this.enableButton() }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
