import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidenav from '../../common/sidenav'

export class Profile extends Component {

  state = {
    email: "",
    username: "",

  }
  componentDidMount() {
    this.setState({
      email: this.props.user.email,
      username: this.props.user.username
    })
  }
  render() {
    return (
      <div>
        <Sidenav />
        <div className="page_container">
          <form>
            {!this.props.change_password ?
              <>
                <div className="row col-12 mx-auto">
                  <div className="col-md-12 col-lg-5">
                    <b className="text-success">Profile</b><br />
                    <p className="pr-5">
                      Your email address is your identity on Heroku and is used to log in</p>
                  </div>
                  <div className="col-md-12 col-lg-5">
                    <div className="form-group">
                      <label><b>Email</b></label>
                      <input type="email" className="form-control form-control-sm" name="email"
                        value={this.state.email} />
                    </div>
                    <div className="form-group">
                      <label><b>Name (Optional)</b></label>
                      <input className="form-control form-control-sm" name="email"
                        value={this.state.username} />
                    </div>
                  </div>
                </div>
                <div className="col-10 mx-auto my-5" style={{ height: "1px", backgroundColor: "rgba(0,255,0,0.5)" }} ></div>
              </> : null}
            <div className="row col-12 mx-auto">
              <div className="col-md-12 col-lg-5">
                <b className="text-success">Password</b><br />
                <p className="pr-5">
                  Changing your password will also reset your session.</p>
              </div>
              <div className="col-md-12 col-lg-5">
                <div className="form-group">
                  <label><b>Current Password</b></label>
                  <input type="password" className="form-control form-control-sm" name="old_password"
                    value={this.state.old_password} placeholder="enter your current password" />
                </div>
                <div className="col-10 mx-auto my-4" style={{ height: "1px", backgroundColor: "rgba(0,255,0,0.5)" }} ></div>
                <div className="form-group">
                  <label><b>New Password</b></label>
                  <input type="password" className="form-control form-control-sm" name="new_password"
                    value={this.state.new_password} placeholder="enter a new password" />
                  <p>Password must be 8 or more characters.</p>
                </div>
                <div className="form-group">
                  <label><b>Confirm New Password</b></label>
                  <input type="password" className="form-control form-control-sm" name="new_password"
                    value={this.state.new_password} placeholder="enter the new password again" />
                </div>
                <div className="form-group mt-4">
                  <button className="btn btn-primary-ctm">Update password</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.auth.user
}), null)(Profile)
