import React, { Component } from 'react'
import Login from './views/login'
import { connect } from 'react-redux'
import Register from './views/register'
import { Redirect } from 'react-router-dom'

export class SignIn extends Component {
  state = {
    login: true,
  }

  toggleLogin = () => this.setState({ login: !this.state.login });

  render() {
    const { location } = this.props;
    const { state } = location;
    if (this.props.isAuthenticated) {
      if (state && state.from) {
        return (<Redirect to={`${state.from.pathname}`} />)
      }
    }
    if (this.props.auth.isLoading) {
      return (
        <div>
          {/*
          <h1 className="text-center text-success mt-5">
            <i className="fa fa-spinner fa-spin"></i>
          </h1> */}
        </div>
      )
    }

    return (
      <div style={{ position: "fixed", left: "0", top: "0", width: "100vw", backgroundImage: "linear-gradient(200deg, rgb(112, 37, 250), rgb(248, 20, 248))" }}>
        <div id="topnav2" className="topnav border border-bottom py-3 pr-3 bg-white">
          <div className="topnav-title"><b>Professional Hospital Management System</b></div>
          <div className="topnav-title right" >
            <button className="btn btn-outline-danger border border-none mt-1"
              style={{ fontSize: "1.2vw" }}
              onClick={this.toggleLogin}>
              {this.state.login ? 'Sign up' : 'Login'}
            </button>
          </div>
        </div>
        <div className="col-sm-8 col-md-6 col-lg-4 my-auto mx-auto pb-5" style={{ height: "100vh", paddingTop: "80px" }}>
          {this.state.login ? <Login props={this.toggleLogin} /> : <Register props={this.toggleLogin} />}
        </div>
      </div >
    )
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToProps, null)(SignIn);