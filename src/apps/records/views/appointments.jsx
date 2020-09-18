import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAppointment, getAppointments } from '../../outpatient/actions';
import { getPatient } from '../actions';


export class Appointments extends Component {

  componentDidMount() {
    this.props.getAppointments()
  }

  render() {
    const { outpatient: { appointments }, clinics, patient_id } = this.props

    return (
      <>
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Appointments</div>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <td>#</td>
                  <td>Created</td>
                  <td>Clinic</td>
                  <td>Fee</td>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(app => app.patient_id === parseInt(patient_id)).map((app, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(app.created).toLocaleDateString("en-UK")}</td>
                    <td>{clinics.length > 0 ? clinics.find(cln => cln.id === app.clinic_id).name : ""}</td>
                    <td>{clinics.length > 0 ? clinics.find(cln => cln.id === app.clinic_id).appointment_fee : ""}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  outpatient: state.outpatient,
  clinics: state.hospital.clinics
});

export default connect(mapStateToProps,
  { getPatient, addAppointment, getAppointments }
)(Appointments);
