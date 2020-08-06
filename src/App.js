import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import lysofts_logo from './images/lysofts_logo.png'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './apps/auth/index';
import AdminRoute from './apps/auth/views/admin_route';
import PrivateRoute from './apps/auth/views/private_route';
import { loadUser } from './apps/auth/actions';
import Dashboard from './apps/common/index';
import Records from './apps/records/index';
import Topnav from './apps/common/topnav';
import Hospital from './apps/hospital';
import Revenue from './apps/revenue';
import outpatient from './apps/outpatient';
import pharmacy from './apps/pharmacy';
import laboratory from './apps/laboratory';
import radiology from './apps/radiology';
import inpatient from './apps/inpatient';
import Procurement from './apps/procurement';
import public_page from './apps/auth/views/public_page';

export class App extends Component {

  componentDidMount() {
    this.props.loadUser();
    var link = document.getElementById("favicon");
    if (link) {
      link.href = lysofts_logo;
    }
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.auth;
    const { isProcessing } = this.props.common;
    return (
      <Router>
        <Fragment>
          <div style={{ position: "relative", paddingLeft: "16vw", width: "100vw", overflowX: "hidden", }}>
            {isAuthenticated ? <Topnav /> : null}
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/hospital" component={Hospital} />
              <PrivateRoute path="/records" component={Records} />
              <PrivateRoute path="/outpatient" component={outpatient} />
              <PrivateRoute path="/pharmacy" component={pharmacy} />
              <PrivateRoute path="/laboratory" component={laboratory} />
              <PrivateRoute path="/radiology" component={radiology} />
              <PrivateRoute path="/inpatient" component={inpatient} />
              <AdminRoute path="/revenue" component={Revenue} />
              <AdminRoute path="/procurement" component={Procurement}/>
              <Route exact path="/public/page" component={public_page} />
              <Route exact path="/user/authentication" component={SignIn} />
            </Switch>
          </div>
          <div id="processing" style={{ display: isProcessing || isLoading ? "block" : "none" }}>
            <h1 className="text-light text-center m-0" style={{ fontSize: "8vw", paddingTop: "30vh" }}>
              <i className="fa fa-spinner fa-spin"></i>
            </h1>
          </div>
        </Fragment >
      </Router >
    );
  }
}

export default connect(state => ({ auth: state.auth, common: state.common }), { loadUser, })(App);
