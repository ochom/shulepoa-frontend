import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getClinics, getServices } from '../hospital/actions'
import Consultation from './views/consultation'
import Queue from './views/consultation_queue'
import Triage from './views/triage'
import Topnav from '../common/topnav'

export class Outpatient extends Component {
  componentDidMount() {
    this.props.getServices()
    this.props.getClinics()
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/outpatient/triage"
          className="list-group-item">
          <i className="fa fa-stethoscope"></i> Triage</Link>
        {this.props.clinics.map((clinic, index) =>
          <Link key={index}
            to={`/outpatient/clinic/${clinic.name}`}
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
                  <Route path={`${url}`} component={Triage} exact />
                  <Route path={`${url}/triage`} component={Triage} />
                  <Route path={`${url}/clinic/:clinic_name`} component={Queue} />
                  <Route path={`${url}/appointment-queue`} component={Queue} />
                  <Route path={`${url}/appointments/file/:file_id`} component={Consultation} />
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
  clinics: state.hospital.clinics
})

export default connect(mapStateToProps, { getClinics, getServices })(Outpatient);

