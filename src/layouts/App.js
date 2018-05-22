import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

export default function App() {
  return (
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/" component={MainLayout} />
    </Switch>
  );
}
