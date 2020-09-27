import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getWards, getServices, getUsers } from '../hospital/actions'
import Consultation from './views/consultation'
import AppointmentQueue from './views/admissions'
import Topnav from '../common/topnav'
import { getPatients } from '../records/actions'
import { getDrugs } from '../pharmacy/actions'
import WardQueue from './views/wards'

export class Inpatient extends Component {
  componentDidMount() {
    this.props.getPatients()
    this.props.getServices()
    this.props.getWards()
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
          to="/inpatient"
          className="list-group-item">
          <i className="fa fa-bed"></i>All wards</Link>

        {this.props.wards.map((ward, index) =>
          <Link key={index}
            to={`/inpatient/ward/${ward.id}`}
            className="list-group-item">
            <i className="fa fa-bed"></i> {ward.name}</Link>
        )}
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Inpatient" />
          <div className="page_body">
            <Route
              path="/inpatient"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={AppointmentQueue} exact />
                  <Route path={`${url}/admissions`} component={AppointmentQueue} exact />
                  <Route path={`${url}/admissions/:admission_id`} component={Consultation} />
                  <Route path={`${url}/ward/:ward_id`} component={WardQueue} />
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
  wards: state.hospital.wards,
  user: state.auth.user
})

export default connect(mapStateToProps, { getUsers, getPatients, getWards, getServices, getDrugs })(Inpatient);

