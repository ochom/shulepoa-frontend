import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPatientRequests, saveDrugDispense } from '../actions'
import person_icon from '../../../images/person_icon.png'

export class ServePatient extends Component {

  componentDidMount() {
    this.props.getPatientRequests(this.props.match.params.patient_id);
  }

  onSubmit = (service_request) => {
    const data = { service_request: service_request.id }
    this.props.saveDrugDispense(data);
  }


  render() {
    const { GENDERS, MARITAL_STATUSES } = this.props.constants;
    const { patient_requests, pharm_selected_queue } = this.props.pharmacy;

    if (!pharm_selected_queue) {
      return (<Redirect to="/pharmacy/queue" />);
    }
    const queue_list = patient_requests.map((request, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{request.service_details.name}</td>
        <td>{request.description}</td>
        <td>{request.quantity}</td>
        <td className="text-center">
          <button className="btn btn-sm btn-primary p-0 px-1"
            onClick={() => this.onSubmit(request)}><i className="fa fa-check"></i> Dispense</button>
        </td>
      </tr>
    );


    return (
      <>
        {pharm_selected_queue ?
          <div className="row col-12 mx-auto mt-3">
            <div className="card card-header bg-white py-1 px-3 col-12">
              <div className="py-1 px-2">
                <Link to="/">Home</Link>  &nbsp;
                <i className="fa fa-angle-right"></i> &nbsp;
                <Link to="/pharmacy">Pharmacy</Link> &nbsp;
                <i className="fa fa-angle-right"></i> &nbsp;
                <Link to="/pharmacy/queue">Queue</Link> &nbsp;
                <i className="fa fa-angle-right"></i> &nbsp;
                <Link to={`/pharmacy/queue/patient/${pharm_selected_queue.patient_details.id}`}>{pharm_selected_queue.patient_details.fullname}</Link>
              </div>
            </div>
            <div className="row col-12 mt-2" style={{ minHeight: "80vh" }}>
              <div className="col-3">
                <div className="patient_profile p-0 border border-light rounded ">
                  <div className="row col-12 mx-auto justify-content-center"
                    style={{ marginTop: "2vw", zIndex: "1" }}>
                    <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                    <p className="custom-text-primary col-12 text-center text-white mt-2">Patient Profile</p>
                  </div>
                  <ul className="w-100 mx-auto list-group mt-2">
                    <li className="list-group-item">
                      <span className="m-0">Name:</span> <span style={{ float: "right" }}>{pharm_selected_queue.patient_details.fullname}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Sex:</span> <span style={{ float: "right" }}>{GENDERS[pharm_selected_queue.patient_details.sex]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">DoB:</span> <span style={{ float: "right" }}>{new Date(pharm_selected_queue.patient_details.dob).toDateString("en-UK")}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Marriage:</span> <span style={{ float: "right" }}>{MARITAL_STATUSES[pharm_selected_queue.patient_details.marital_status]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Mobile:</span> <span style={{ float: "right" }}>{pharm_selected_queue.patient_details.phone}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Address:</span> <span style={{ float: "right" }}>{`${pharm_selected_queue.patient_details.county}, ${pharm_selected_queue.patient_details.country}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-7">
                <div className="row bg-transparent pb-3 rounded ">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header custom-bg-secondary py-1 px-3">
                        <div className="py-1 px-2"><b>Prescription List</b></div>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-sm table-striped table-bordered">
                          <caption className="px-3">Client prescription list</caption>
                          <thead className="custom-text-primary">
                            <tr>
                              <th>#</th>
                              <th>Drug</th>
                              <th>Prescription</th>
                              <th>Quantity</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {queue_list}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> :
          null
        }
      </>
    )
  }
}

export default connect(state => ({
  pharmacy: state.pharmacy,
  service_list: state.hospital.service_list,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getPatientRequests, saveDrugDispense })(ServePatient)
