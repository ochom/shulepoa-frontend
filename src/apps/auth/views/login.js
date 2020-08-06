import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const data = { username, password };
    this.props.login(data);
  }

  render() {
    return (
      <div className="card card-body">
        <h6 className="card-title text-center custom-text-primary mb-3">
          <i className=" fa fa-user-circle mb-2"
            style={{ fontSize: "3vw" }}></i><br />
          Sign In</h6>
        <form onSubmit={this.onSubmit}>
          <div className="form-group col-12">
            <label>Email</label>
            <input type="email" className="form-control" name="username"
              value={this.state.username} onChange={this.onChange}
              placeholder="Email address" />
          </div>
          <div className="form-group col-12">
            <label>Password</label>
            <input type="password"
              className="form-control" name="password"
              value={this.state.password} onChange={this.onChange}
              placeholder="Password" />
          </div>
          <div className="form-group col-12">
            <button type="submit" className="btn custom-bg-primary"
              disabled={(this.state.username === "" || this.state.password === "")}>Enter</button>
          </div>
        </form>
        <h6 className="text-center">Forgot password? <a href="/password/reset">Reset</a></h6>
      </div>
    )
  }
}

export default connect(null, { login })(Login)
