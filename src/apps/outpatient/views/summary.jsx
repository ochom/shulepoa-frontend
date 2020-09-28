import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PrintPDF } from '../../common/actions';
import { PrintHeader } from '../../common/layouts';
import { getHospital, getUsers } from '../../hospital/actions';
import { getServiceRequests } from '../../revenue/actions';

export class Summary extends Component {
  componentDidMount() {
    this.props.getHospital();
    this.props.getUsers();
  }

  calculateBMI = (vital) => {
    return (vital.mass * 1.0 / (vital.height * vital.height)).toFixed(2)
  }

  printReceipt = () => {
    const html = document.getElementById('print_area');
    PrintPDF(html, `${this.props.outpatient.appointment.id} - Appointment Summary`)
  }

  render() {
    const {
      hospital: { hospital_profile, users },
      outpatient: { appointment },
      common: { CONSTANTS: { GENDERS } },
    } = this.props;
    return (
      <div className="card">
        <div className="card-header py-1 px-3">
          <div className="py-1 px-2"><b>Summary (Rx)</b></div>
          <button
            className="btn btn-sm "
            onClick={this.printReceipt}><i className="fa fa-print mr-2"></i> Print
            </button>
        </div>
        <div className="card-body p-0 mt-0">
          <div id="print_area" className="row col-12 mx-auto">
            <PrintHeader
              hospital={hospital_profile}
              tittle="Appointment Summary" />

            <div className="col-12 mt-3">
              <p className="p-0 m-0">Client: <b>{appointment.patient.fullname}</b></p>
              <p className="p-0 m-0">Sex: <b>{GENDERS[appointment.patient.sex]}</b></p>
              <p className="p-0 m-0">Visit Date: <b>{new Date(appointment.created).toLocaleString('en-uk')}</b></p>
            </div>

            <div className="col-12 mx-auto mt-3">
              <b>Vitals</b>
              <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                  <tr>
                    <th>BP</th>
                    <th>Pulse</th>
                    <th>Temp.</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>MBI</th>
                    <th>D/N</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.vitals.map((vital, index) =>
                    <tr key={index}>
                      <td>{vital.bp_systolic}/{vital.bp_diastolic}</td>
                      <td>{vital.pulse}</td>
                      <td>{vital.temperature} <sup>0</sup>C</td>
                      <td>{vital.height}m</td>
                      <td>{vital.mass}Kg</td>
                      <td>{this.calculateBMI(vital)}</td>
                      <td>
                        {(users.length > 0 && users.find(user => user.id === vital.created_by)) ? users.find(user => user.id === vital.created_by).username : ""}
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>

            <div className="col-12 mx-auto mt-3">
              <b>Observations</b>
              <table className="table table-sm table-bordered table-responsive-sm">
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
                  {appointment.observations.map((observation, index) =>
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

            <div className="col-12 mx-auto mt-3">
              <b>Tests</b>
              <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Investigation/Test</th>
                    <th>Lab</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.service_requests.filter(request => (request.department === 3 || request.department === 4)).map((request, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{request.service_name}</td>
                      <td>{request.department === 3 ? "Laboratory" : "Imaging (Radiology)"}
                      </td>
                      <td>
                        {(users.length > 0 && users.find(user => user.id === request.created_by)) ? users.find(user => user.id === request.created_by).username : ""}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="col-12 mx-auto mt-3">
              <b>Prescriptions</b>
              <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.service_requests.filter(request => request.department === 5).map((request, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{request.service_name}</td>
                      <td>{request.description}
                      </td>
                      <td>
                        {(users.length > 0 && users.find(user => user.id === request.created_by)) ? users.find(user => user.id === request.created_by).username : ""}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="col-12 mx-auto mt-3">
              <b>Discharge Notes:</b>
              <p><i>{appointment.discharge_note}</i></p>
            </div>



            <div className="col-12 mx-auto mt-5">
              <b>...........................</b>
              <p><i>{(users.length > 0 && users.find(user => user.id === appointment.discharged_by)) ? users.find(user => user.id === appointment.discharged_by).username : ""}</i></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  outpatient: state.outpatient,
  hospital: state.hospital,
  common: state.common,
}), {
  getServiceRequests,
  getHospital, getUsers
})(Summary)
