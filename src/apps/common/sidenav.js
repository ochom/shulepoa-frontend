import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Sidenav extends Component {
  render() {
    return (
      <div>
        < div className="sidenav" >
          <div className="sidenav-logo"></div>
          <div className="sidenav_body">
            <div className="list-group">
              <Link to="/" className="list-group-item">
                <i className="fa fa-home"></i> Dashboard</Link>
            </div>
            {this.props.menus}
            <div className="list-group">
              <Link to="/issues" className="list-group-item">
                <i className="fa fa-bug"></i> Bugs &amp; Issues</Link>
            </div>
            {/* <div className="list-group">
              <Link to="/profile" className="list-group-item">
                <i className="fa fa-cog"></i> My Profile</Link>
              <Link to="/change-password" className="list-group-item">
                <i className="fa fa-lock"></i> Change password</Link>
              <button className="list-group-item text-left"
                onClick={this.logoutUser}>
                <i className="fa fa-power-off"></i> Logout</button>
            </div> */}
          </div>
          <a href="https://lysofts.herokuapp.com/"
            className="copyright-text">
            <b>&copy; {new Date().getFullYear()} Lysofts Ke.</b></a>
        </div >
      </div>
    )
  }
}


export default connect(
  state => ({
    auth: state.auth,
  }))(Sidenav);
