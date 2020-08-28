import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import Clinics from './views/clinics'
import Insurance from './views/insurance'
import HospitalProfile from './views/profile'
import Services from './views/services'
import Users from './views/users'

export class Hospital extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/hospital" className="list-group-item"><i className="fa fa-angle-right"></i> Hospital</Link>
        <Link to="/hospital/clinics" className="list-group-item"><i className="fa fa-angle-right"></i> Clinics</Link>
        <Link to="/hospital/services" className="list-group-item"><i className="fa fa-angle-right"></i> Services</Link>
        <Link to="/hospital/insurance" className="list-group-item"><i className="fa fa-angle-right"></i> Insurance</Link>
        <Link to="/hospital/users" className="list-group-item"><i className="fa fa-angle-right"></i> Users</Link>
        <Link to="/hospital/users" className="list-group-item"><i className="fa fa-angle-right"></i> User roles</Link>
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
                  <Route path={`${url}/clinics`} component={Clinics} />
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

