import React, { Component } from 'react'
import { connect } from 'react-redux'
import patient_profile from '../../images/patient_profile.jpeg'
import { logout } from '../auth/actions'
import { Link } from 'react-router-dom'

export class Sidenav extends Component {

  logoutUser = () => {
    this.props.logout();
  }

  render() {
    return (
      <div id="sidenav">
        <div className="row col-12 mx-auto justify-content-center sidenav-user">
          <img
            className="sidenav-image"
            src={patient_profile} alt="USER" />
          <b className="col-12 text-center text-success mb-0 mt-2 sidenav-username">{this.props.auth.user.username}</b>
          <i className="col-12 text-center text-light m-0 sidenav-email">{this.props.auth.user.email}</i>
        </div>
        <div>
          {this.props.menus}
          <hr className="divider" />
          <div className="list-group">
            <Link to="/user/profile" className="list-group-item">
              <i className="fa fa-cog"></i> My Profile</Link>
            <Link to="/user/change-password" className="list-group-item">
              <i className="fa fa-lock"></i> Change password</Link>
            <button className="list-group-item text-left"
              onClick={this.logoutUser}>
              <i className="fa fa-power-off"></i> Logout</button>
          </div>
        </div>
        <a href="https://ochom.github.io/lysofts/"
          className="text-center text-light copyright-text">
          <b>&copy; {new Date().getFullYear()} Lysofts Ke.</b></a>
      </div >
    )
  }
}


export default connect(
  state => ({
    auth: state.auth,
  }),
  { logout }
)(Sidenav);
