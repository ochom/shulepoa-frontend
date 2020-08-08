import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getQueue } from '../actions'
import store from '../../../reducer/store'

export class Queue extends Component {

  componentDidMount() {
    this.props.getQueue();
    setInterval(() => this.props.getQueue(), 300000);
  }

  selectQueue = (data) => {
    store.dispatch({ type: "PHARMACY_SELECT_QUEUE", payload: data });
    this.props.history.push("/pharmacy/queue/patient/" + data.patient_details.id);
  }

  render() {
    const { GENDERS } = this.props.constants;
    const { service_queue } = this.props.pharmacy;
    const queue_list = service_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient_details.fullname}</td>
        <td>{queue.patient_details.id}</td>
        <td>{GENDERS[queue.patient_details.sex]}</td>
        <td>{queue.patient_details.phone}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none cu-text-primary"
            onClick={() => this.selectQueue(queue)}
            to={`/pharmacy/queue/patient/${queue.patient_details.id}`}><i className="fa fa-edit"></i> Servce</button>
        </td>
      </tr>
    );


    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-1 px-3">Pharmacy Service Queue</div>
          <div className="card-body p-0">
            {this.props.common.silent_processing ?
              <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
            }
            <table className="table table-sm table-striped table-bordered">
              <thead className="">
                <tr>
                  <th>Patient's Name</th>
                  <th># Reg.</th>
                  <th>Sex</th>
                  <th>Mobile</th>
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
    )
  }
}

export default connect(state => ({
  pharmacy: state.pharmacy,
  service_list: state.hospital.service_list,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getQueue, })(Queue)
