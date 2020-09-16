import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Auth from './apps/auth';
import { loadUser } from './apps/auth/actions';
import PrivateRoute from './apps/auth/views/private_route';
import Profile from './apps/auth/views/profile';
import public_page from './apps/auth/views/public_page';
import Bugs from './apps/bugs/index';
import { loadICD10 } from './apps/common/actions';
import Dashboard from './apps/common/index';
import Hospital from './apps/hospital';
import inpatient from './apps/inpatient';
import Inventory from './apps/inventory';
import laboratory from './apps/laboratory';
import outpatient from './apps/outpatient';
import pharmacy from './apps/pharmacy';
import radiology from './apps/radiology';
import Records from './apps/records/index';
import Revenue from './apps/revenue';

export class App extends Component {

  state = { isLoading: true }

  componentDidMount() {
    this.props.loadUser();
    this.props.loadICD10()
    setTimeout(() => this.setState({ isLoading: false }), 6000);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.common.message !== this.props.common.message && nextProps.common.message) {
      if (nextProps.common.status === "success") {
        toast(nextProps.common.message, {
          type: "success",
          position: 'bottom-right'
        })
        //NotificationManager.success(nextProps.message, "Success")
      } else {
        toast(nextProps.common.message, {
          type: "error",
        })
        //NotificationManager.error(nextProps.message, "Error")
      }
    }
  }


  render() {
    const { isLoading } = this.props.auth;
    const { isProcessing } = this.props.common;
    if (this.state.isLoading) {
      return (
        <div className="loader">
          <div className="loader-icon"></div>
        </div>
      )
    } else {
      return (
        <Router>
          <Fragment>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/hospital" component={Hospital} />
              <PrivateRoute path="/records" component={Records} />
              <PrivateRoute path="/revenue" component={Revenue} />
              <PrivateRoute path="/outpatient" component={outpatient} />
              <PrivateRoute path="/pharmacy" component={pharmacy} />
              <PrivateRoute path="/laboratory" component={laboratory} />
              <PrivateRoute path="/radiology" component={radiology} />
              <PrivateRoute path="/inpatient" component={inpatient} />
              {/* <AdminRoute path="/revenue" component={Revenue} /> */}
              <PrivateRoute path="/inventory" component={Inventory} />
              <Route exact path="/public/page" component={public_page} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/change-password" component={() => <Profile change_password={true} />} />
              <Route path="/auth" component={Auth} />
              <PrivateRoute path="/issues" component={Bugs} />
            </Switch>
            <div id="processing" style={{ display: isProcessing || isLoading ? "block" : "none" }}>
              <h1 className="text-light text-center m-0" style={{ fontSize: "8vw", paddingTop: "30vh" }}>
                <i className="fa fa-spinner fa-spin"></i>
              </h1>
            </div>

            <ToastContainer />
          </Fragment >
        </Router >
      );
    }
  }
}

export default connect(state => ({
  auth: state.auth,
  common: state.common
}), { loadUser, loadICD10 })(App);
