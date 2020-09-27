import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getClinics, getServices, getUsers } from '../hospital/actions'
import Consultation from './views/consultation'
import AppointmentQueue from './views/appointments'
import Topnav from '../common/topnav'
import { getPatients } from '../records/actions'
import { getDrugs } from '../pharmacy/actions'
import ClinicQueue from './views/clinics'

export class Outpatient extends Component {
  componentDidMount() {
    this.props.getPatients()
    this.props.getServices()
    this.props.getClinics()
    this.props.getUsers()
    this.props.getDrugs()

  }
  render() {
    const { user } = this.props
    if (!user.rights.can_view_ipd_opd) {
      return <Redirect to="/" />
    }
    const menu_list =
      <div className="list-group">
        <Link
          to="/outpatient"
          className="list-group-item">
          <i className="fa fa-user-md"></i>All clinics</Link>

        {this.props.clinics.map((clinic, index) =>
          <Link key={index}
            to={`/outpatient/clinic/${clinic.id}`}
            className="list-group-item">
            <i className="fa fa-user-md"></i> {clinic.name}</Link>
        )}
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Consultation" />
          <div className="page_body">
            <Route
              path="/outpatient"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={AppointmentQueue} exact />
                  <Route path={`${url}/appointments`} component={AppointmentQueue} exact />
                  <Route path={`${url}/appointments/:appointment_id`} component={Consultation} />
                  <Route path={`${url}/clinic/:clinic_id`} component={ClinicQueue} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = state => ({
  clinics: state.hospital.clinics,
  user: state.auth.user
})

export default connect(mapStateToProps, { getUsers, getPatients, getClinics, getServices, getDrugs })(Outpatient);

