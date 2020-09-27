import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { getAdmission } from '../actions';
import discharge from './discharge';
import intervention from './intervention';
import Investigations from './investigations';
import prescriptions from './prescriptions';
import reviews from './reviews';
import Summary from './summary';
import Vital from './vitals';

export class Consultation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      admission_id: props.match.params.admission_id
    }
  }

  componentDidMount() {
    this.props.getAdmission(this.props.match.params.admission_id)
  }

  render() {
    const {
      common: { CONSTANTS: { GENDERS, MARITAL_STATUSES } },
      match: { params: { admission_id } },
      inpatient: { admission }
    } = this.props;
    return (
      <div className="col-12 mx-auto mt-3">
        {!admission ?
          < div className="alert alert-warning">Loading...</div> :

          <div className="row col-12 mx-auto mt-2" style={{ minHeight: "80vh" }}>
            <div className="col-3">
              <div className="patient_profile p-0 border border-light rounded ">
                <div className="row mx-auto justify-content-center mt-4">
                  <div className="image"></div>
                  <p>Patient Profile</p>
                </div>
                <ul className="w-100 mx-auto list-group mt-2">
                  <li className="list-group-item">
                    <span className="m-0">Name:</span>
                    <span>{admission.patient.fullname}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Sex:</span>
                    <span>{GENDERS[admission.patient.sex]}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">DoB:</span>
                    <span>{new Date(admission.patient.dob).toDateString("en-UK")}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Marriage:</span>
                    <span>{MARITAL_STATUSES[admission.patient.marital_status]}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Mobile:</span>
                    <span>{admission.patient.phone}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Address:</span>
                    <span>{`${admission.patient.county}, ${admission.patient.country}`}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-7">
              <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
                <Route
                  path="/inpatient/admissions/:admission_id"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}`} component={intervention} exact />
                      <Route path={`${url}/interventions`} component={intervention} />
                      <Route path={`${url}/vitals`} component={Vital} />
                      <Route path={`${url}/reviews`} component={reviews} />
                      <Route path={`${url}/investigations`} component={Investigations} />
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
                    to={`/inpatient/admissions/${admission_id}/interventions`}>Nursing Intervention</Link>
                  <Link
                    className="list-group-item"
                    to={`/inpatient/admissions/${admission_id}/vitals`}>Vitals</Link>
                  <Link
                    className="list-group-item"
                    to={`/inpatient/admissions/${admission_id}/reviews`}>Doctor Reviews</Link>
                  <Link
                    className="list-group-item"
                    to={`/inpatient/admissions/${admission_id}/investigations`}>Investigations</Link>
                  <Link
                    className="list-group-item"
                    to={`/inpatient/admissions/${admission_id}/prescriptions`}>Prescriptions</Link>
                  <Link
                    className="list-group-item"
                    to={`/inpatient/admissions/${admission_id}/discharge`}>Discharge</Link>
                  <Link
                    className="list-group-item"
                    to={`/inpatient/admissions/${admission_id}/summary`}>Summary (Rx)</Link>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect(state => ({
  inpatient: state.inpatient,
  common: state.common,
  records: state.records,
}), { getAdmission })(Consultation)