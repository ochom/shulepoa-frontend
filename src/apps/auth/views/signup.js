import React, { Component } from 'react'
import { register } from '../actions'
import { connect } from 'react-redux';

export class Signup extends Component {

  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
    } = this.state;

    var data = {
      username,
      email,
      password,
    }
    this.props.register(data);
  }

  onHaveAccount = () => {
    this.props.history.push("/auth/login");
  }

  render() {
    return (
      <div>
        <div className="pb-3">
          <h1><i className="fa fa-user-circle"></i></h1>
          <h5>Sign Up</h5>
        </div>
        <form onSubmit={this.onSubmmit}>
          <div className="form-group col-12">
            <label>Name</label>
            <input className="form-control form-control-sm" required={true}
              name="username" onChange={this.onChange} value={this.state.username} />
          </div>
          <div className="form-group col-12">
            <label>Email</label>
            <input type="email" className="form-control form-control-sm" required={true}
              name="email" onChange={this.onChange} value={this.state.email} />
          </div>
          <div className="form-group col-12">
            <label>Password</label>
            <input type="password" className="form-control form-control-sm" required={true}
              name="password" onChange={this.onChange} value={this.state.password} />
          </div>
          <div className="form-group col-12 mt-2">
            <button className="btn btn-block cu-bg-primary"
              type="submit" onSubmit={this.onSubmmit}>
              {`Register`}
            </button>
          </div>
        </form>
        <div className="form-group col-12 mt-3">
          <h6 >Already have an account?
              <b onClick={this.onHaveAccount}>{` Login`}</b>
          </h6>
        </div>
      </div>
    )
  }
}


export default connect(state => ({ auth: state.auth }), { register })(Signup)