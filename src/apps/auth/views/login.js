import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../actions';

export class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    var data = { username, password }
    this.props.login(data);
  }

  onNoAccount = () => {
    this.props.history.push("/auth/signup");
  }

  render() {
    return (
      <div>
        <div className="pb-3">
          <h1><i className="fa fa-user-circle"></i></h1>
          <h5>Sign In</h5>
        </div>
        <form onSubmit={this.onSubmmit}>
          <div className="form-group col-12">
            <label>Email</label>
            <input type="email" className="form-control" required={true}
              name="username" onChange={this.onChange} value={this.state.username} />
          </div>
          <div className="form-group col-12">
            <label>Password</label>
            <input type="password" className="form-control" required={true}
              name="password" onChange={this.onChange} value={this.state.password} />
          </div>
          <div className="form-group col-12 mt-4">
            <button className="btn btn-block cu-bg-primary"
              type="submit" onSubmit={this.onSubmmit}>
              {`Login`}
            </button>
          </div>
        </form>
        <div className="form-group col-12 mt-4">
          <h6>Don't have account?
            <b onClick={this.onNoAccount}>{` Sign Up`}</b>
          </h6>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ auth: state.auth }), { login })(Login)
