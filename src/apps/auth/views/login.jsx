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

  onForgotPasswprd = () => {
    this.props.history.push("/auth/reset-password");
  }

  render() {
    const { common: { silent_processing } } = this.props;
    return (
      <div className="py-5">
        <div className="pb-3 text-center">
          <img src="/static/hosipoa_logo.png" alt="HP" />
          <h5><b>Sign In</b></h5>
        </div>
        <form onSubmit={this.onSubmmit}>
          <div className="row col-12 mx-auto">
            <div className="form-group col-12">
              <input type="email" className="form-control" required={true}
                name="username" onChange={this.onChange} value={this.state.username} />
              <label>Email</label>
            </div>
            <div className="form-group col-12">
              <input type="password" className="form-control" required={true}
                name="password" onChange={this.onChange} value={this.state.password} />
              <label>Password</label>
            </div>
            <div className="form-group col-12 mt-4">
              {
                silent_processing ?
                  <button className="btn btn-block cu-bg-primary disabled" disabled={true}
                    type="button" onSubmit={this.onSubmmit}>
                    <i className="fa fa-spinner fa-spin mr-5"></i>
                  Processing</button> :
                  <button className="btn btn-block cu-bg-primary"
                    type="submit" onSubmit={this.onSubmmit}>
                    Login</button>
              }
            </div>
          </div>
        </form>
        <div className="form-group col-12 mt-4">
          <h6>
            Forgot password? <b onClick={this.onForgotPasswprd}>Reset</b>
          </h6>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ common: state.common }), { login })(Login)
