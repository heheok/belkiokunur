import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import hasAccess from '../hoc/hasAccess';
import { apiGet } from '../utils/api';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const WrappedComponent = hasAccess()(Component);
  return <Route {...rest} render={props => <WrappedComponent {...props} />} />;
};
export default PrivateRoute;
