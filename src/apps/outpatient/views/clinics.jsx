import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppointments, updateAppointment } from '../actions';

export class ClinicQueue extends Component {
  state = {}

  componentDidMount() {
    this.props.getAppointments();
    this.interval = setInterval(() => this.props.getAppointments(), 30000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  checkIn = (id) => {
    this.props.updateAppointment(id, { session_with: this.props.auth.user.id, is_checked_in: true })
    this.props.history.push(`/outpatient/appointments/${id}`)
  }

  checkOut = (id) => {
    this.props.updateAppointment(id, { is_checked_in: false })
  }

  render() {
    const { outpatient: { appointments }, records: { patients }, hospital: { clinics, users } } = this.props;
    const { match: { params: { clinic_id } } } = this.props
    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-1 px-3">
            {(clinics && clinics.find(clinic => clinic.id === parseInt(clinic_id))) ?
              clinics.find(clinic => clinic.id === parseInt(clinic_id)).name : ""
            } Queue</div>
          <div className="card-body p-0 pb-2">
            {this.props.common.silent_processing ?
              <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
            }
            <table className="table table-sm table-hover table-responsive-sm">
              <thead className="cu-text-primary">
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>With</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(appointment => !appointment.is_discharged && appointment.clinic_id === parseInt(clinic_id)).map((appointment, index) =>
                  <tr key={index}>
                    <td>{new Date(appointment.created).toLocaleString('en-UK')}</td>
                    <td>{(patients && patients.find(patient => patient.id === appointment.patient_id)) ? patients.find(patient => patient.id === appointment.patient_id).fullname : ""}</td>
                    <td>{(patients && patients.find(patient => patient.id === appointment.patient_id)) ? patients.find(patient => patient.id === appointment.patient_id).phone : ""}</td>
                    <td>{(users && users.find(user => user.id === appointment.session_with)) ? users.find(user => user.id === appointment.session_with).username : "In Line"}</td>
                    <td>{appointment.is_checked_in ? <span className="text-success">IN</span> : <span className="text-primary">Waiting</span>}</td>
                    <td>
                      {!appointment.is_checked_in ?
                        <button onClick={() => this.checkIn(appointment.id)}
                          className="btn btn-sm border-none btn-success"><i className="fa fa-sign-in"></i> Check In</button> :
                        <button onClick={() => this.checkOut(appointment.id)}
                          className="btn btn-sm border-none btn-primary"><i className="fa fa-sign-out"></i> Check Out</button>
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  outpatient: state.outpatient,
  hospital: state.hospital,
  records: state.records,
  common: state.common,
}), { getAppointments, updateAppointment })(ClinicQueue)
