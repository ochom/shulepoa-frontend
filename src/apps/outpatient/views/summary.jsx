import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getObservations, getVitals, getDiagnosis } from '../actions'
import { getServiceRequests } from '../../revenue/actions'
import { getHospital, getUsers } from '../../hospital/actions'

export class Summary extends Component {
  componentDidMount() {
    this.props.getHospital();
    this.props.getUsers();
    this.props.getObservations();
    this.props.getVitals();
    this.props.getDiagnosis();
    this.props.getServiceRequests();
  }
  render() {
    const {
      hospital: { hospital_profile, users },
      outpatient: { appointment, observations },
      common: { CONSTANTS: { GENDERS } },
      records: { patients },
    } = this.props;
    return (
      <div className="card">
        <div className="card-header py-1 px-3">
          <div className="py-1 px-2"><b>Summary (Rx)</b></div>
          <button
            className="btn btn-sm "
            onClick={this.onNewDiagnosis}><i className="fa fa-print mr-2"></i> Print
            </button>
        </div>
        <div className="card-body p-0 mt-0">
          <div id="payment_statement" className="row col-12 mx-auto">
            <div className="col-12">
              <h3 className="col-12 p-0 m-0 text-center">{hospital_profile ? `${hospital_profile.hospital_name}` : ""}</h3>
              <h6 className="col-12 p-0 m-0 text-center">{hospital_profile ? `MFL ${hospital_profile.mfl_code}` : ""}</h6>
              <h6 className="col-12 p-0 m-0 text-center">{hospital_profile ? `${hospital_profile.postal_address}, ${hospital_profile.physical_address}` : ""}</h6>
              {/* <h6 className="col-12 p-0 m-0 text-center">{hospital_profile ? `${hospital_profile.email}. ${hospital_profile.phone}` : ""}</h6> */}
              <h5 className="col-12 p-0 m-0 text-center mt-3"><u>Appointment Summary</u></h5>
            </div>
            <div className="col-12 mt-3">
              <p className="p-0 m-0">Client: <b>{(patients.length > 0 && patients.find(patient => patient.id === appointment.patient_id)) ? patients.find(patient => patient.id === appointment.patient_id).fullname : ""}</b></p>
              <p className="p-0 m-0">Sex: <b>{GENDERS[(patients.length > 0 && patients.find(patient => patient.id === appointment.patient_id)) ? patients.find(patient => patient.id === appointment.patient_id).sex : 0]}</b></p>
              <p className="p-0 m-0">Visit Date: <b>{new Date(appointment.created).toLocaleString('en-uk')}</b></p>
            </div>
            <div className="col-12 mx-auto mt-3">
              <b>Observation</b>
              <table className="table table-sm table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Complaint</th>
                    <th>Period</th>
                    <th>Pre-med</th>
                    <th>Examination</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.filter(observation => observation.appointment_id === appointment.id).map((observation, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{observation.complaint}</td>
                      <td>{observation.period} {observation.period_units}</td>
                      <td>{observation.pre_med_note}</td>
                      <td>{observation.physical_examination_note}</td>
                      <td>
                        {(users.length > 0 && users.find(user => user.id === observation.created_by)) ? users.find(user => user.id === observation.created_by).username : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(state => ({
  outpatient: state.outpatient,
  hospital: state.hospital,
  records: state.records,
  common: state.common,
}), {
  getServiceRequests,
  getHospital, getUsers,
  getVitals, getObservations, getDiagnosis
})(Summary)
