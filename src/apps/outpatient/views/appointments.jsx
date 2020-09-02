import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppointments } from '../actions';

export class AppointmentQueue extends Component {

  componentDidMount() {
    this.props.getAppointments();
  }

  selectHealthFile = (data) => {
    this.props.history.push(`/outpatient/appointments/${data.id}`)
  }

  render() {
    const { outpatient: { appointments }, records: { patients }, hospital: { clinics, users } } = this.props;

    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-1 px-3">Consultation Queue</div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Clinic</th>
                  <th>Mobile</th>
                  <th>With</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) =>
                  <tr key={index}>
                    <td>{new Date(appointment.created).toLocaleString('en-UK')}</td>
                    <td>{(patients && patients.find(patient => patient.id === appointment.patient_id)) ? patients.find(patient => patient.id === appointment.patient_id).fullname : ""}</td>
                    <td>{(clinics && clinics.find(clinic => clinic.id === appointment.clinic_id)) ? clinics.find(clinic => clinic.id === appointment.clinic_id).name : ""}</td>
                    <td>{(patients && patients.find(patient => patient.id === appointment.patient_id)) ? patients.find(patient => patient.id === appointment.patient_id).phone : ""}</td>
                    <td>{(users && users.find(user => user.id === appointment.session_with)) ? users.find(user => user.id === appointment.session_with) : "In Line"}</td>
                    <td>{appointment.is_checked_in ? "Checked In" : appointment.is_checked_out ? "Discharged" : "Waiting"}</td>
                    <td className="text-center">
                      {!appointment.is_checked_in ?
                        <button onClick={() => this.selectHealthFile(appointment)}
                          className="btn btn-sm border-none btn-success"><i className="fa fa-sign-in"></i> Check In</button> :
                        appointment.is_checked_in && !appointment.is_checked_out ?
                          <button onClick={() => this.selectHealthFile(appointment)}
                            className="btn btn-sm border-none btn-primary"><i className="fa fa-sign-out"></i> Check Out</button> :
                          <button
                            className="btn btn-sm border-none btn-secondary disabled">No Action</button>
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
  outpatient: state.outpatient,
  hospital: state.hospital,
  records: state.records
}), { getAppointments, })(AppointmentQueue)
