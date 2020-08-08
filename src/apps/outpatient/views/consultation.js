import React, { Component } from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import person_icon from '../../../images/person_icon.png'
import { connect } from 'react-redux'
import Observation from './observations';
import Investigations from './investigations';
import diagnosis from './diagnosis';
import prescriptions from './prescriptions';
import discharge from './discharge';

export class Consultation extends Component {
  render() {
    const { GENDERS, MARITAL_STATUSES } = this.props.common.CONSTANTS;
    const { health_file } = this.props;
    if (!health_file) {
      return (<Redirect to="/outpatient/appointment-queue" />)
    }
    return (
      <div className="col-12 mx-auto mt-3">
        <div className="row col-12 mx-auto mt-2" style={{ minHeight: "80vh" }}>
          <div className="col-3">
            <div className="patient_profile p-0 border border-light rounded ">
              <div className="row mx-auto justify-content-center mt-4">
                <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                <p className="cu-text-primary col-12 text-center text-white mt-2">Patient Profile</p>
              </div>
              <ul className="w-100 mx-auto list-group mt-2">
                <li className="list-group-item">
                  <span className="m-0">Name:</span> <span style={{ float: "right" }}>{health_file.patient_details.fullname}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Sex:</span> <span style={{ float: "right" }}>{GENDERS[health_file.patient_details.sex]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">DoB:</span> <span style={{ float: "right" }}>{new Date(health_file.patient_details.dob).toDateString("en-UK")}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Marriage:</span> <span style={{ float: "right" }}>{MARITAL_STATUSES[health_file.patient_details.marital_status]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Mobile:</span> <span style={{ float: "right" }}>{health_file.patient_details.phone}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Address:</span> <span style={{ float: "right" }}>{`${health_file.patient_details.county}, ${health_file.patient_details.country}`}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-7">
            <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
              <Route
                path="/outpatient/appointments/file/:file_id"
                render={({ match: { url } }) => (
                  <>
                    <Route path={`${url}`} component={Observation} exact />
                    <Route path={`${url}/observations`} component={Observation} />
                    <Route path={`${url}/investigations`} component={Investigations} />
                    <Route path={`${url}/diagnosis`} component={diagnosis} />
                    <Route path={`${url}/prescriptions`} component={prescriptions} />
                    <Route path={`${url}/discharge`} component={discharge} />
                    <Route path={`${url}/summary`} component={Observation} />
                  </>
                )}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="patient_page_tabs">
              <div className="list-group">
                <Link
                  className="list-group-item"
                  to={`/outpatient/appointments/file/${health_file.id}/observations`}>Observations</Link>
                <Link
                  className="list-group-item"
                  to={`/outpatient/appointments/file/${health_file.id}/investigations`}>Investigations</Link>
                <Link
                  className="list-group-item" to={`/outpatient/appointments/file/${health_file.id}/diagnosis`}>Diagnosis</Link>
                <Link
                  className="list-group-item" to={`/outpatient/appointments/file/${health_file.id}/prescriptions`}>Prescriptions</Link>
                <Link
                  className="list-group-item" to={`/outpatient/appointments/file/${health_file.id}/discharge`}>Discharge</Link>
                <Link
                  className="list-group-item" to={`/outpatient/appointments/file/${health_file.id}/summary`}>Summary (Rx)</Link>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(state => ({
  health_file: state.outpatient.selected_health_file,
  common: state.common,
}))(Consultation)