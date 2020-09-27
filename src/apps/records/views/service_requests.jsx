import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteData } from '../../common/actions';
import { addServiceRequest, deleteServiceRequest, getServiceRequests } from '../../revenue/actions';


export class ServiceRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered_services: [],
      patient_id: props.patient_id,
    };
  }

  componentDidMount() {
    this.props.getServiceRequests()
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewAppointment = () => {
    this.setState({
      showModal: !this.state.showModal,
      clinic_id: "",
    });
  }

  addRequest = (service) => {
    const data = {
      patient_id: this.state.patient_id,
      service_id: service.id,
      service_name: service.name,
      department: service.department,
      quantity: 1,
      price: service.price,
      cost: service.price
    }

    this.props.addServiceRequest(data)
    this.toggleModal()
  }

  onSearch = (e) => {
    const search = (e.target.value).toLowerCase()
    this.setState({
      filtered_services: this.props.hospital.services.filter(ser => ser.name.toLowerCase().includes(search))
    })
  }

  render() {
    const { common: { CONSTANTS: { DEPARTMENTS } }, service_requests, rights } = this.props
    const book_appointment_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Request service</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input className="form-control form-control-sm"
              onChange={this.onSearch} defaultValue="" />
            <label><span role="img" aria-label="search">&#x1F50D;</span> Search...</label>
          </div>
          <table className="tabble table-sm table-striped table-bordered col-12">
            <thead>
              <tr>
                <th>Service</th>
                <th>Dep.</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filtered_services.map((service, index) =>
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{DEPARTMENTS[service.department]}</td>
                  <td>{service.price}</td>
                  <td>
                    <button className="btn btn-sm btn-primary rounded"
                      onClick={() => this.addRequest(service)}>Add</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ModalBody >
        <ModalFooter>
          <button type="button" className="btn btn-sm btn-secondary"
            onClick={this.toggleModal}>
            <i className="fa fa-close"></i> Cancel</button>
        </ModalFooter>
      </Modal >

    return (
      <>
        {book_appointment_view}
        <div className="card">
          <div className="card-header">
            <div>Service Requests</div>
            {rights.can_add_service_request ?
              <button
                className="btn btn-sm"
                onClick={this.onNewAppointment}><i className="fa fa-plus-circle mr-2"></i> New request
              </button> : null}
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <th>Service</th>
                  <th>Department</th>
                  <th>Cost</th>
                  <th>Date Requested</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {service_requests.filter(req => req.patient_id === parseInt(this.state.patient_id)).map((req, index) =>
                  <tr key={index}>
                    <td>{req.service_name}</td>
                    <td>{DEPARTMENTS[req.department]}</td>
                    <td>{req.cost}</td>
                    <td>{new Date(req.created).toLocaleDateString("en-UK")}</td>
                    <td>
                      {rights.can_delete_service_request ? !req.is_approved ?
                        <button className="btn btn-sm btn-danger"
                          onClick={() => deleteData(req.id, this.props.deleteServiceRequest)}>Delete</button> :
                        <button className="btn btn-sm btn-secondary disabled">No Action</button>
                        : null}
                    </td>
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
  records: state.records,
  common: state.common,
  service_requests: state.revenue.service_requests,
  hospital: state.hospital,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps,
  { getServiceRequests, addServiceRequest, deleteServiceRequest }
)(ServiceRequests);
