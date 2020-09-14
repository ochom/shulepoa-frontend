import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../../reducer/store'
import { getServiceRequests } from '../../revenue/actions'

export class Queue extends Component {

  componentDidMount() {
    this.props.getServiceRequests();
    setInterval(() => this.props.getServiceRequests(), 5000);
  }

  selectQueue = (data) => {
    store.dispatch({ type: "PHARMACY_SELECT_QUEUE", payload: data });
    this.props.history.push("/pharmacy/queue/patient/" + data.patient_details.id);
  }

  render() {
    const { revenue: { payment_queue } } = this.props;
    return (
      <div className="row col-12 mx-auto mt-2">
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
                {payment_queue.map((queue, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{queue.patient.fullname}</td>
                    <td>{queue.patient.id_no}</td>
                    <td>{queue.patient.phone}</td>
                    <td>{queue.total_bill}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 px-2 border-none rounded btn-primary"
                        onClick={() => this.onEditPayment(queue)}>Make Payments</button></td>
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
  revenue: state.revenue,
  common: state.common,
}), { getServiceRequests, })(Queue)
