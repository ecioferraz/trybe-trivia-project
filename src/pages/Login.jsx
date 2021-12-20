import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getTokenThunk, login as loginAction } from '../actions';
import { writeLocalStorage } from '../services/util';
import '../style/login.css';
import logo from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      click: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, name } = this.state;
    const { sendToken, login } = this.props;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    writeLocalStorage('state', state);
    login(email, name);

    sendToken();
    this.setState({ click: true });
  }

  render() {
    const { email, name, click } = this.state;
    const { token } = this.props;
    return (
      <form onSubmit={ this.handleSubmit } className="login">
        <fieldset className="formContainer">
          <img src={ logo } alt="Trivia" className="formContainer__logo" />
          <label htmlFor="email" className="formEmail">
            {'Email: '}
            <input
              className="emailInput"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
              type="email"
              value={ email }
            />
          </label>
          <label htmlFor="name" className="formName">
            {'Nome: '}
            <input
              className="nameInput"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            className="playBtn"
            type="submit"
            data-testid="btn-play"
            disabled={ !(email && name) }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
              className="configBtn"
              hidden
            >
              Configurações
            </button>
          </Link>
          { click && token && <Redirect to="/jogo" /> }
        </fieldset>
        <footer className="image-credit">Background image credit: <a href="https://www.reddit.com/user/higgsas">higgsas</a></footer>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, name) => dispatch(loginAction(email, name)),
  sendToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = ({ token: { token } }) => ({ token });

Login.propTypes = {
  token: PropTypes.string.isRequired,
  sendToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
