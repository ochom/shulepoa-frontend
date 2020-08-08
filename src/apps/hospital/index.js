import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import HospitalProfile from './views/hospital_profile'
import Insurance from './views/insurance'
import Users from './views/users'
import Services from './views/services'
import supplier from './views/supplier'
import Topnav from '../common/topnav'

export class Hospital extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/hospital" className="list-group-item"><i className="fa fa-h-square"></i> Hospital</Link>
        <Link to="/hospital/supplier" className="list-group-item"><i className="fa fa-briefcase"></i> Suppliers</Link>
        <Link to="/hospital/insurance" className="list-group-item"><i className="fa fa-briefcase"></i> Insurance</Link>
        <Link to="/hospital/services" className="list-group-item"><i className="fa fa-ambulance"></i> Services</Link>
        <Link to="/hospital/users" className="list-group-item"><i className="fa fa-user-md"></i> System Users</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Profiles Manager" />
          <div className="page_body">
            <Route
              path="/hospital"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={HospitalProfile} exact />
                  <Route path={`${url}/supplier`} component={supplier} />
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

