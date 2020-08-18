import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addOPDServiceRequest, getOPDServiceRequests } from '../../revenue/actions';


export class ServiceRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered_services: [],
      patient_id: props.patient_id,
    };
  }

  componentDidMount() {
    this.props.getOPDServiceRequests()
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

  onSubmitAppointment = (e) => {
    e.preventDefault();
    const {
      patient_id,
      clinic_id,
      date,
    } = this.state;

    const file_data = {
      patient_id,
      clinic_id,
      date,
    }

    this.props.addAppointment(file_data)
    this.toggleModal()
  }

  onSearch = (e) => {
    const search = (e.target.value).toLowerCase()
    this.setState({
      filtered_services: this.props.hospital.services.filter(ser => ser.name.toLowerCase().includes(search))
    })
  }

  render() {
    const { common: { CONSTANTS: { DEPARTMENTS } }, services, opd_ser_reqs } = this.props
    const book_appointment_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Request service</ModalHeader>
        <ModalBody>
          <div className="form-group col-12">
            <input className="form-control form-control-sm"
              name="search" onChange={this.onSearch} />
          </div>
          <table className="tabble table-striped table-bordered table-sm">
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
                <tr>
                  <td>{service.name}</td>
                  <td>{DEPARTMENTS[service.department]}</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>
              )}
            </tbody>
          </table>
        </ModalBody >
        <ModalFooter>
          <Button color="danger" size="sm" onClick={this.toggleModal}>
            <i className="fa fa-close"></i> Cancel</Button>
        </ModalFooter>
      </Modal >

    return (
      <>
        {book_appointment_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Service Requests</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewAppointment}><i className="fa fa-plus-circle mr-2"></i> New request
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="">
                <tr><th>#</th><th>Date</th><th>Service</th><th>Department</th><th>Cost</th></tr>
              </thead>
              <tbody>
                {opd_ser_reqs.filter(req => req.patient_id === parseInt(this.state.patient_id)).map((req, index) =>
                  <tr key={index}>app
                    <td>{index + 1}</td>
                    <td>{new Date(req.created).toLocaleString("en-UK")}</td>
                    <td>{services.length > 0 ? services.filter(service => service.id === req.service_id)[0].name : ""}</td>
                    <td>{DEPARTMENTS[req.department]}</td>
                    <td>{req.cost}</td>
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
  opd_ser_reqs: state.revenue.opd_ser_reqs,
  hospital: state.hospital
});

export default connect(mapStateToProps,
  { getOPDServiceRequests, addOPDServiceRequest }
)(ServiceRequests);
