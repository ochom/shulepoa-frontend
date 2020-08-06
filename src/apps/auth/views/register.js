import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions'

export class Register extends Component {
  state = {
    username: "",
    password: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!(username === "" || password === "")) {
      const data = { username, password };
      this.props.register(data);
    }
  }

  render() {
    return (
      <div className="card card-body"><h6 className="card-title text-center custom-text-primary mb-3">
        <i className=" fa fa-user-circle mb-2"
          style={{ fontSize: "3vw" }}></i><br />
      Sign Up</h6>
        <form onSubmit={this.onSubmit}>
          <div className="form-group col-12">
            <label>Email</label>
            <input type="email" className="form-control" name="email"
              value={this.state.email} onChange={this.onChange}
              placeholder="Email address" />
          </div>
          <div className="form-group col-12">
            <label>Username</label>
            <input type="text" className="form-control" name="username"
              value={this.state.username} onChange={this.onChange}
              placeholder="Username" />
          </div>
          <div className="form-group col-12">
            <label>Password</label>
            <input type="password"
              className="form-control" name="password"
              value={this.state.password} onChange={this.onChange}
              placeholder="Password" />
          </div>
          <div className="form-group col-12">
            <label>Confirm password</label>
            <input type="password"
              className="form-control" name="password"
              value={this.state.password2} onChange={this.onChange}
              placeholder="Confirm password" />
          </div>
          <div className="form-group col-12">
            <button type="submit" className="btn custom-bg-primary"
              disabled={(this.state.username === "" || this.state.password === "")}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, [register,])(Register)
