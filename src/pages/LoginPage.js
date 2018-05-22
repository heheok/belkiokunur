import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { apiPost } from '../utils/api';
import { setAuthorContext } from '../utils/auth';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    redirectToReferrer: false
  };

  handleUserNameChange = e => {
    this.setState({
      username: e.target.value
    });
  };
  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  handleSubmit = async () => {
    const { username, password } = this.state;
    const { hasError, data } = await apiPost({
      endpoint: 'login',
      params: {
        username: username,
        password: password
      }
    });
    if (!hasError) {
      setAuthorContext(data);
      this.setState({
        redirectToReferrer: true
      });
    }
  };

  render() {
    const { username, password, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <input
          type="text"
          value={username}
          onChange={this.handleUserNameChange}
          placeholder={'Kullanıcı Adı'}
        />
        <input
          type="password"
          value={password}
          onChange={this.handlePasswordChange}
          placeholder={'Şifre'}
        />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}
//
export default LoginPage;
