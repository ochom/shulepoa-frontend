import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatient } from '../actions'

import Appointments from './appointments'
import Schemes from './schemes'
import ServiceRequests from './service_requests'
import Admissions from './admissions'

class Patient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient_id: props.match.params.patient_id
    }
  }

  componentDidMount() {
    const { match: { params: { patient_id } } } = this.props
    this.props.getPatient(patient_id)
  }

  render() {
    const { patient,
      common: { CONSTANTS: { GENDERS, MARITAL_STATUSES } } } = this.props
    return (
      <div>
        {patient ?
          <>
            <div className="row col-12 mx-auto mt-2">
              <div className="col-3">
                <div className="patient_profile p-0 border border-light rounded ">
                  <div className="row mx-auto justify-content-center mt-4">
                    <div className="image"></div>
                    <p>Patient Profile</p>
                  </div>
                  <ul className="w-100 mx-auto list-group mt-2">
                    <li className="list-group-item">
                      <span className="m-0">Name:</span>
                      <span>{patient.fullname}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Sex:</span>
                      <span>{GENDERS[patient.sex]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">DoB:</span>
                      <span>{new Date(patient.dob).toDateString("en-UK")}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Marriage:</span>
                      <span>{MARITAL_STATUSES[patient.marital_status]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Mobile:</span>
                      <span>{patient.phone}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Address:</span>
                      <span>{`${patient.county}, ${patient.country}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row col-9">
                <div className="col-md-6 my-2">
                  <Appointments patient_id={this.state.patient_id} />
                </div>
                <div className="col-md-6 my-2">
                  <Admissions patient_id={this.state.patient_id} />
                </div>
                <div className="col-md-12 my-2">
                  <Schemes patient={patient} />
                </div>
                <div className="col-12 my-2">
                  <ServiceRequests patient_id={this.state.patient_id} />
                </div>
              </div>
            </div>
          </ >
          : null}
      </div>
    )
  }
}

export default connect(state => ({
  common: state.common,
  patient: state.records.patient,
}), { getPatient })(Patient)