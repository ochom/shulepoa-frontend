import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInterventions, getVitals, getReviews } from '../actions'
import { getServiceRequests } from '../../revenue/actions'
import { getHospital, getUsers } from '../../hospital/actions'
import { PrintPDF } from '../../common/actions'
import { PrintHeader } from '../../common/layouts';

export class Summary extends Component {
  componentDidMount() {
    this.props.getHospital();
    this.props.getUsers();
    this.props.getInterventions();
    this.props.getVitals();
    this.props.getReviews();
    this.props.getServiceRequests();
  }

  calculateBMI = (vital) => {
    return (vital.mass * 1.0 / (vital.height * vital.height)).toFixed(2)
  }

  printReceipt = () => {
    const html = document.getElementById('print_area');
    PrintPDF(html, `${this.props.inpatient.admission.id} - Admission Summary`)
  }

  render() {
    const {
      hospital: { hospital_profile, users },
      inpatient: { vitals, admission, reviews },
      common: { CONSTANTS: { GENDERS } },
      records: { patients },
      revenue: { service_requests }
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
              tittle="Inpatient Treatment Summary" />

            <div className="col-12 mt-3">
              <p className="p-0 m-0">Client: <b>{(patients.length > 0 && patients.find(patient => patient.id === admission.patient_id)) ? patients.find(patient => patient.id === admission.patient_id).fullname : ""}</b></p>
              <p className="p-0 m-0">Sex: <b>{GENDERS[(patients.length > 0 && patients.find(patient => patient.id === admission.patient_id)) ? patients.find(patient => patient.id === admission.patient_id).sex : 0]}</b></p>
              <p className="p-0 m-0">Visit Date: <b>{new Date(admission.created).toLocaleString('en-uk')}</b></p>
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
                  {vitals.filter(vital => vital.admission_id === admission.id).map((vital, index) =>
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
              <b>Reviews</b>
              <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Condition</th>
                    <th>Review Notes</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.filter(review => review.admission_id === admission.id).map((review, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{review.condition}</td>
                      <td>{review.note}</td>
                      <td>
                        {users.find(user => user.id === review.created_by) ? users.find(user => user.id === review.created_by).username : ""}
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
                  {service_requests.filter(request => (request.department === 3 || request.department === 4) && request.admission_id === admission.id).map((request, index) =>
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
                  {service_requests.filter(request => request.department === 5 && request.admission_id === admission.id).map((request, index) =>
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
              <p><i>{admission.discharge_note}</i></p>
            </div>



            <div className="col-12 mx-auto mt-5">
              <b>...........................</b>
              <p><i>{(users.length > 0 && users.find(user => user.id === admission.discharged_by)) ? users.find(user => user.id === admission.discharged_by).username : ""}</i></p>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(state => ({
  inpatient: state.inpatient,
  hospital: state.hospital,
  records: state.records,
  revenue: state.revenue,
  common: state.common,
}), {
  getServiceRequests,
  getHospital, getUsers,
  getVitals, getInterventions, getReviews
})(Summary)
