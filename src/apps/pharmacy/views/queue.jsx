import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getServiceRequestQueue } from '../../revenue/actions'
import { addDispense } from '../actions'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

export class Queue extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,

    precription_list: [],
  }

  componentDidMount() {
    this.props.getServiceRequestQueue(5);
    window.interval = setInterval(() => this.props.getServiceRequestQueue(5), 10000);
  }

  componentWillUnmount() {
    clearInterval(window.interval)
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  onAction = (data) => {
    this.setState({
      selected_queue_data: data,
      precription_list: data.service_requests,
    });
    this.toggleModal()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (_data) => {
    this.props.addDispense({ service_request_id: _data.id });
    this.setState({
      precription_list: this.state.precription_list.filter(p => p.id !== _data.id),
    });
  }

  render() {
    const { constants: { GENDERS }, service_request_queue } = this.props;
    const { selected_queue_data, precription_list } = this.state
    const dispense_modal =
      <Modal isOpen={this.state.showModal && this.state.precription_list.length > 0}>
        <ModalHeader toggle={this.toggleModal}>
          Dispense to: {selected_queue_data ? selected_queue_data.patient.fullname : ""}
        </ModalHeader>
        <ModalBody>
          {precription_list.map((prescription, index) =>
            <form key={index} onSubmit={() => this.onSubmit(prescription)}>
              <div className="form-row">
                <div className="form-group col-8">
                  <input className="form-control form-control-sm" readOnly={true}
                    value={prescription.service_name} />
                  <label>Drug</label>
                </div>
                <div className="form-group col-4">
                  <input className="form-control form-control-sm"
                    value={prescription.description} readOnly={true} />
                  <label>Prescription <sup>*</sup></label>
                </div>
                <div className="form-group col-6">
                  <input className="form-control form-control-sm"
                    value={prescription.quantity} readOnly={true} />
                  <label>Prescribed Quantity<sup>*</sup></label>
                </div>
                <div className="form-group col-6">
                  <button type="submit" className="btn btn-sm btn-success"
                    onSubmit={() => this.onSubmit(prescription)}>Dispense</button>
                </div>
              </div>
              <hr className="border-primary" />
            </form>
          )}
        </ModalBody>
      </Modal>

    return (
      <div className="row col-12 mx-auto mt-2">
        {dispense_modal}
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header py-1 px-3">Queue</div>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {service_request_queue.map((queue, index) =>
                    <tr key={index}>
                      <td>{queue.patient.fullname}</td>
                      <td>{queue.patient.id}</td>
                      <td>{GENDERS[queue.patient.sex]}</td>
                      <td>{queue.patient.phone}</td>
                      <td>
                        <button className="btn btn-sm btn-primary"
                          onClick={() => this.onAction(queue)}>Dispense Drugs</button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  laboratory: state.laboratory,
  service_request_queue: state.revenue.service_request_queue,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getServiceRequestQueue, addDispense, })(Queue)
