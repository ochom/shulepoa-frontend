import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { loadService } from '../hospital/actions'
import { loadWards, getAdmiedtPatient } from './actions'
import wards from './views/wards'
import patients from './views/patients'
import admission from './views/admission'
import admit_patient from './views/admit_patient'
import patient_file from './views/patient_file'
import Topnav from '../common/topnav'

export class Inpatient extends Component {
  componentDidMount() {
    this.props.loadService();
    this.props.loadWards();
    this.props.getAdmiedtPatient();
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/inpatient/admission" className="list-group-item"><i className="fa fa-edit"></i> Admission</Link>
        <Link to="/inpatient/patients" className="list-group-item"><i className="fa fa-users"></i> Patients</Link>
        <Link to="/inpatient/wards" className="list-group-item"><i className="fa fa-bed"></i> Wards</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Inpatient Management" />
          <div className="page_body">
            <Route
              path="/inpatient"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={patients} exact />
                  <Route path={`${url}/wards`} component={wards} />
                  <Route path={`${url}/admission`} component={admission} exact />
                  <Route path={`${url}/admission/patient/:pk/admit`} component={admit_patient} />
                  <Route path={`${url}/patients`} component={patients} exact />
                  <Route path={`${url}/patients/file/:pk`} component={patient_file} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}
export default connect(null, { loadService, loadWards, getAdmiedtPatient })(Inpatient);

