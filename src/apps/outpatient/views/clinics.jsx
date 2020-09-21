import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppointments, updateAppointment } from '../actions';
import { Link } from 'react-router-dom';

export class ClinicQueue extends Component {
  state = {}

  componentDidMount() {
    this.props.getAppointments();
    this.interval = setInterval(() => this.props.getAppointments(), 30000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { outpatient: { appointments },
      common: { CONSTANTS: { GENDERS } },
      hospital: { clinics } } = this.props;

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
                  <th>Queued Date</th>
                  <th>Patient</th>
                  <th>Sex</th>
                  <th>Clinic</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(appointment => !appointment.is_discharged && appointment.clinic_id === parseInt(clinic_id)).map((appointment, index) =>
                  <tr key={index}>
                    <td>{new Date(appointment.created).toLocaleString('en-UK')}</td>
                    <td>{appointment.patient.fullname}</td>
                    <td>{GENDERS[appointment.patient.sex]}</td>
                    <td>{appointment.clinic.name}</td>
                    <td>{appointment.patient.phone}</td>
                    <td>{appointment.is_checked_in ? <span className="text-success">IN</span> : <span className="text-primary">Waiting</span>}</td>
                    <td>
                      <Link to={`/outpatient/appointments/${appointment.id}`} className="btn btn-sm btn-success">Open file</Link>
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
