import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Academics from './apps/academics';
import Auth from './apps/auth';
import { loadUser } from './apps/auth/actions';
import PrivateRoute from './apps/auth/views/private_route';
import Profile from './apps/auth/views/profile';
import public_page from './apps/auth/views/public_page';
import Bugs from './apps/bugs/index';
import Clinic from './apps/clinic/index';
import Dashboard from './apps/common/index';
import { Loader } from './apps/common/layouts';
import Inventory from './apps/inventory';
import Organization from './apps/organization';
import Records from './apps/records/index';

export class App extends Component {

  state = { isLoading: true }

  componentDidMount() {
    this.props.loadUser()
  }

  componentDidUpdate(nextProps) {
    if (nextProps.common.message !== this.props.common.message && nextProps.common.message) {
      if (nextProps.common.status === "success") {
        toast(nextProps.common.message, {
          type: "success",
          position: 'bottom-right'
        })
      } else {
        toast(nextProps.common.message, {
          type: "error",
        })
      }
    }
  }


  render() {
    const { auth: { isLoading }, common: { isProcessing, silent_processing } } = this.props;
    if (isLoading) {
      return (
        <Loader />
      )
    } else {
      return (
        <Router>
          <Fragment>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/administrator" component={Organization} />
              <PrivateRoute path="/records" component={Records} />
              <PrivateRoute path="/academics" component={Academics} />
              <PrivateRoute path="/clinic" component={Clinic} />
              <PrivateRoute path="/pharmacy" component={Records} />
              <PrivateRoute path="/laboratory" component={Records} />
              <PrivateRoute path="/radiology" component={Records} />
              <PrivateRoute path="/inpatient" component={Records} />
              <PrivateRoute path="/inventory" component={Inventory} />
              <Route exact path="/public/page" component={public_page} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/change-password" component={() => <Profile change_password={true} />} />
              <Route path="/auth" component={Auth} />
              <PrivateRoute path="/issues" component={Bugs} />
            </Switch>
            {(isProcessing || isLoading || silent_processing) ?
              <div className="myprogres-bar">
                <div className="myprogres"></div>
              </div> : null
            }
            <ToastContainer />
          </Fragment>
        </Router>
      );
    }
  }
}

export default connect(state => ({
  auth: state.auth,
  common: state.common
}), { loadUser })(App);
