import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Sidenav extends Component {
  render() {
    return (
      <div>
        < div className="sidenav" >
          <div className="sidenav-logo">Hosipoa</div>
          <div className="sidenav_body">
            <div className="list-group">
              <Link to="/" className="list-group-item">
                <i className="fa fa-home"></i> Dashboard</Link>
            </div>
            {this.props.menus}
            <div className="list-group">
              <Link to="/issues" className="list-group-item">
                <i className="fa fa-bug"></i> Report Issues</Link>
            </div>
          </div>
          <a href="https://lysofts.co.ke"
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
