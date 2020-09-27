import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidenav from '../../common/sidenav'
import TopNav from '../../common/topnav'

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
          <TopNav page="Profile" />
          <div className="page_body">
            <div className="col-sm-12 col-md-10 col-lg-8 mx-auto">
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
                          <input type="email" className="form-control form-control-sm" name="email"
                            value={this.state.email} />
                          <label><b>Email</b></label>
                        </div>
                        <div className="form-group">
                          <input className="form-control form-control-sm" name="email"
                            value={this.state.username} />
                          <label><b>Name (Optional)</b></label>
                        </div>
                      </div>
                    </div>
                    <hr className="col-10 mx-auto my-5 bg-success" />
                  </> : null}
                <div className="row col-12 mx-auto">
                  <div className="col-md-12 col-lg-5">
                    <b className="text-success">Password</b><br />
                    <p className="pr-5">
                      Changing your password will also reset your session.</p>
                  </div>
                  <div className="col-md-12 col-lg-5">
                    <div className="form-group">
                      <input type="password" className="form-control form-control-sm" name="old_password"
                        value={this.state.old_password} />
                      <label><b>Current Password</b></label>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-sm" name="new_password"
                        value={this.state.new_password} />
                      <label><b>New Password</b></label>
                      <p>Password must be 8 or more characters.</p>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-sm" name="new_password"
                        value={this.state.new_password} />
                      <label><b>Confirm New Password</b></label>
                    </div>
                    <div className="form-group mt-4">
                      <button className="btn cu-bg-primary">Update password</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.auth.user
}), null)(Profile)
