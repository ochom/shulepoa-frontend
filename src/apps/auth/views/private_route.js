import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isAuthenticated) {
        const { user } = auth;
        if (user && user.is_admin) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
        }
      } else {

        return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
      }
    }}
  />
);


export default connect(state => ({
  auth: state.auth,
}), null)(PrivateRoute);
