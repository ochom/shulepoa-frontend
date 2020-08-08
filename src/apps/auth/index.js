import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import login from './views/login'
import signup from './views/signup'
import { logout } from './actions'

export class Auth extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { location } = this.props;
    const { state } = location;
    if (isAuthenticated) {
      if (user.is_admin) {
        if (state && state.from) {
          return (<Redirect to={`${state.from.pathname}`} />)
        } else {
          return (<Redirect to="/" />)
        }
      } else {
        return (
          <>
            <p className="alert alert-danger">Your account is not activated
                <button className="btn btn-sm btn-outline-primary border-none ml-5"
                onClick={() => this.props.logout()}>Logout</button>
            </p>
          </>
        );
      }
    }
    return (
      <div className="auth-temp">
        <div className="login col-sm-8 col-md-5 col-lg-4 mx-auto">
          <Route path="/auth/"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} component={login} exact />
                <Route path={`${url}/login`} component={login} />
                <Route path={`${url}/signup`} component={signup} />
              </>
            )}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({ auth: state.auth }), { logout })(Auth)
