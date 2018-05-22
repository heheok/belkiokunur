import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Header from '../components/Header';

export default function AuthLayout({ match }) {
  return (
    <div>
      <Header />
      <Switch>
        <Route path={`${match.url}/login`} component={LoginPage} />
      </Switch>
    </div>
  );
}
