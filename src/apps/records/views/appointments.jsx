import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAppointment, getAppointments } from '../../outpatient/actions';
import { Link } from 'react-router-dom';


export class Appointments extends Component {

  componentDidMount() {
    this.props.getAppointments()
  }

  render() {
    const { outpatient: { appointments }, patient_id } = this.props

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
                  <td>Clinic</td>
                  <td>Date</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(app => app.patient_id === parseInt(patient_id)).map((app, index) =>
                  <tr key={index}>
                    <td>{app.clinic.name}</td>
                    <td>{new Date(app.created).toLocaleDateString("en-UK")}</td>
                    <td><Link to={`/outpatient/appointments/${app.id}`}
                      className="btn btn-sm btn-primary">View</Link></td>
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
  { addAppointment, getAppointments }
)(Appointments);
