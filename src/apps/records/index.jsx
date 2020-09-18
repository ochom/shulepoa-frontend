import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import { getClinics, getServices, getInsurances, getWards } from '../hospital/actions'
import Patient from './views/patient'
import Patients from './views/patients'

export class Records extends Component {

  componentDidMount() {
    this.props.getClinics();
    this.props.getInsurances();
    this.props.getServices();
    this.props.getWards()
  }

  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/records" className="list-group-item"><i className="fa fa-angle-right"></i> Patient Listing</Link>
        <Link to="/outpatient" className="list-group-item"><i className="fa fa-angle-right"></i> Clinic Patients</Link>
        <Link to="/inpatient" className="list-group-item"><i className="fa fa-angle-right"></i> Admitted Patients</Link>
        <Link to="/records/reports" className="list-group-item"><i className="fa fa-angle-right"></i> Reports</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Records" />
          <div className="page_body">
            <Route
              path="/records"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Patients} exact />
                  <Route path={`${url}/patients/:patient_id`} component={Patient} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}

export default connect(null, { getClinics, getServices, getInsurances, getWards })(Records);

