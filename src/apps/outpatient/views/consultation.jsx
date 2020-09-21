import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import person_icon from '../../../images/person_icon.png';
import { getAppointment } from '../actions';
import diagnosis from './diagnosis';
import discharge from './discharge';
import Investigations from './investigations';
import Observation from './observations';
import prescriptions from './prescriptions';
import Summary from './summary';
import Vital from './vitals';

export class Consultation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointment_id: props.match.params.appointment_id
    }
  }

  componentDidMount() {
    this.props.getAppointment(this.props.match.params.appointment_id)
  }

  render() {
    const {
      common: { CONSTANTS: { GENDERS, MARITAL_STATUSES } },
      match: { params: { appointment_id } },
      outpatient: { appointment }
    } = this.props;
    return (
      <div className="col-12 mx-auto mt-3">
        {!appointment ?
          < div className="alert alert-warning">Loading...</div> :

          <div className="row col-12 mx-auto mt-2" style={{ minHeight: "80vh" }}>
            <div className="col-3">
              <div className="patient_profile p-0 border border-light rounded ">
                <div className="row mx-auto justify-content-center mt-4">
                  <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                  <p className="cu-text-primary col-12 text-center text-white mt-2">Patient Profile</p>
                </div>
                <ul className="w-100 mx-auto list-group mt-2">
                  <li className="list-group-item">
                    <span className="m-0">Name:</span>
                    <span style={{ float: "right" }}>{appointment.patient.fullname}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Sex:</span>
                    <span style={{ float: "right" }}>{GENDERS[appointment.patient.sex]}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">DoB:</span>
                    <span style={{ float: "right" }}>{new Date(appointment.patient.dob).toDateString("en-UK")}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Marriage:</span>
                    <span style={{ float: "right" }}>{MARITAL_STATUSES[appointment.patient.marital_status]}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Mobile:</span>
                    <span style={{ float: "right" }}>{appointment.patient.phone}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Address:</span>
                    <span style={{ float: "right" }}>{`${appointment.patient.county}, ${appointment.patient.country}`}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-7">
              <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
                <Route
                  path="/outpatient/appointments/:appointment_id"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}`} component={Vital} exact />
                      <Route path={`${url}/vitals`} component={Vital} exact />
                      <Route path={`${url}/observations`} component={Observation} />
                      <Route path={`${url}/investigations`} component={Investigations} />
                      <Route path={`${url}/diagnosis`} component={diagnosis} />
                      <Route path={`${url}/prescriptions`} component={prescriptions} />
                      <Route path={`${url}/discharge`} component={discharge} />
                      <Route path={`${url}/summary`} component={Summary} />
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
                    to={`/outpatient/appointments/${appointment_id}/vitals`}>Vitals</Link>
                  <Link
                    className="list-group-item"
                    to={`/outpatient/appointments/${appointment_id}/observations`}>Observations</Link>
                  <Link
                    className="list-group-item"
                    to={`/outpatient/appointments/${appointment_id}/investigations`}>Investigations</Link>
                  <Link
                    className="list-group-item"
                    to={`/outpatient/appointments/${appointment_id}/diagnosis`}>Diagnosis</Link>
                  <Link
                    className="list-group-item"
                    to={`/outpatient/appointments/${appointment_id}/prescriptions`}>Prescriptions</Link>
                  <Link
                    className="list-group-item"
                    to={`/outpatient/appointments/${appointment_id}/discharge`}>Discharge</Link>
                  <Link
                    className="list-group-item"
                    to={`/outpatient/appointments/${appointment_id}/summary`}>Summary (Rx)</Link>
                </div>
              </div>
            </div>
          </div>
        }
      </div >
    )
  }
}

export default connect(state => ({
  outpatient: state.outpatient,
  common: state.common,
  records: state.records,
}), { getAppointment })(Consultation)