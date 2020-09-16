import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPatient } from '../actions'
import person_icon from '../../../images/person_icon.png'
import HealthFiles from './appointments'
import Schemes from './schemes'
import ServiceRequests from './service_requests'

class Patient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patient_id: props.match.params.patient_id
    }
  }

  componentDidMount() {
    this.props.getPatient(this.props.match.params.patient_id)
  }

  render() {
    const { patient } = this.props
    const { GENDERS, MARITAL_STATUSES } = this.props.common.CONSTANTS;
    return (
      <div>
        {patient ?
          <>
            <div className="row col-12 mx-auto mt-2">
              <div className="col-3">
                <div className="patient_profile p-0 border border-light rounded ">
                  <div className="row mx-auto justify-content-center mt-4">
                    <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                    <p className="cu-text-primary col-12 text-center text-white mt-2">Patient Profile</p>
                  </div>
                  <ul className="w-100 mx-auto list-group mt-2">
                    <li className="list-group-item">
                      <span className="m-0">Name:</span> <span style={{ float: "right" }}>{patient.fullname}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Sex:</span> <span style={{ float: "right" }}>{GENDERS[patient.sex]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">DoB:</span> <span style={{ float: "right" }}>{new Date(patient.dob).toDateString("en-UK")}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Marriage:</span> <span style={{ float: "right" }}>{MARITAL_STATUSES[patient.marital_status]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Mobile:</span> <span style={{ float: "right" }}>{patient.phone}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Address:</span> <span style={{ float: "right" }}>{`${patient.county}, ${patient.country}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row col-9">
                <div className="col-md-6 my-2">
                  <HealthFiles patient_id={this.state.patient_id} />
                </div>
                <div className="col-md-6 my-2">
                  <Schemes patient_id={this.state.patient_id} />
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