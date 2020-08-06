import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isAuthenticated) {
        const { user } = auth;
        if (user) {
          if (user.is_admin) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/public/page" />;
          }
        }
      } else {
        return <Redirect to={{ pathname: '/user/authentication', state: { from: props.location } }} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
