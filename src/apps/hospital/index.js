import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import HospitalProfile from './views/hospital_profile'
import Insurance from './views/insurance'
import Services from './views/services'
import Users from './views/users'

export class Hospital extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/hospital" className="list-group-item"><i className="fa fa-h-square"></i> Hospital</Link>
        <Link to="/hospital/services" className="list-group-item"><i className="fa fa-ambulance"></i> Services</Link>
        <Link to="/hospital/supplier" className="list-group-item"><i className="fa fa-handshake-o"></i> Suppliers</Link>
        <Link to="/hospital/insurance" className="list-group-item"><i className="fa fa-briefcase"></i> Insurance</Link>
        <Link to="/hospital/users" className="list-group-item"><i className="fa fa-user-md"></i> System Users</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Hospital Manager" />
          <div className="page_body">
            <Route
              path="/hospital"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={HospitalProfile} exact />
                  <Route path={`${url}/insurance`} component={Insurance} />
                  <Route path={`${url}/services`} component={Services} />
                  <Route path={`${url}/users`} component={Users} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}

export default connect(null)(Hospital);

