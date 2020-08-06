import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getPrescriptions, addPrescription, deletePrescription } from '../actions'

export class Prescription extends Component {
  state = {
    showModal: false,
    search_list: [],
    selected_drug: null,
    dosage: "",
    frequency: "",
    days: "",
    dos_2_qnty: 0,
    quantity: 1,
  }

  componentDidMount = () => {
    this.props.getPrescriptions(this.props.health_file.id);
  }

  onSearch = (e) => {
    const search_name = e.target.value;
    const result = this.props.service_list.filter(service =>
      (service.name.toLowerCase().includes(search_name.toLowerCase()) && service.department === 5)
    ).slice(0, 15);
    this.setState({ search_list: result });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value }, () => this.calculateDosage());

  calculateDosage = () => {
    var quantity = 1;
    if (parseInt(this.state.dos_2_qnty) === 1) {
      quantity = this.state.dosage * this.state.frequency * this.state.days;
    }
    this.setState({ quantity: quantity });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewPrescription = (data) => {
    this.setState({
      selected_drug: null,
      dosage: "",
      frequency: "",
      days: "",
      quantity: 1,
    });
    this.toggleModal();
  }

  onSelectDrug = (data) => {
    this.setState({
      selected_drug: data,
      dosage: "",
      frequency: "",
      days: "",
      quantity: 1,
    });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_drug,
      dosage,
      frequency,
      days,
      quantity, } = this.state;

    const data = {
      service: selected_drug.id,
      description: dosage + "x" + frequency + "x" + days,
      quantity
    }
    this.props.addPrescription(this.props.health_file.id, data);
    this.toggleModal();
  }

  render() {
    const { selected_drug } = this.state;
    const { prescriptions } = this.props;
    const prescription_view =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}><i className="fa fa-plus-circle"></i> Add prescription
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row col-12">
              <div className="col-5">
                <div className="form-group col-12">
                  <input className="form-control form-control-sm"
                    onChange={this.onSearch} placeholder="Search..." />
                </div>
                <div className="col-12">
                  <table className="table table-sm table-bordered">
                    <caption>Drugs list</caption>
                    <thead className="custom-bg-primary">
                      <tr><td>Drug name</td><td>Cost</td></tr>
                    </thead>
                    <tbody>
                      {this.state.search_list.map((service, index) =>
                        <tr key={index} style={{ cursor: "pointer" }} onClick={() => this.onSelectDrug(service)}>
                          <td>{service.name}</td>
                          <td>{service.price}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {selected_drug ?
                <div className="row col-7">
                  <div className="form-group  col-12">
                    <label>Drug name</label>
                    <input className="form-control form-control-sm" readOnly={true}
                      value={selected_drug.name} />
                  </div>
                  <div className="form-group col-6">
                    <label>In store</label>
                    <input className="form-control form-control-sm" readOnly={true}
                      value={selected_drug.quantity_in_store} />
                  </div>
                  <div className="form-group col-6">
                    <label>Cost</label>
                    <input className="form-control form-control-sm" readOnly={true}
                      value={selected_drug.price} onChange={this.onChange} />
                  </div>
                  <div className="form-group col-4">
                    <label>Dosage</label>
                    <input className="form-control form-control-sm" name="dosage" required={true}
                      value={this.state.dosage} onChange={this.onChange} />
                  </div>
                  <div className="form-group col-4">
                    <label>Frequency</label>
                    <input className="form-control form-control-sm" name="frequency" required={true}
                      value={this.state.frequency} onChange={this.onChange} />
                  </div>
                  <div className="form-group col-4">
                    <label>Days</label>
                    <input className="form-control form-control-sm" name="days" required={true}
                      value={this.state.days} onChange={this.onChange} />
                  </div>
                  <div className="form-group col-6">
                    <label>Dosage to Quantity ?</label>
                    <select className="form-control form-control-sm" name="dos_2_qnty" required={true}
                      value={this.state.dos_2_qnty} onChange={this.onChange} >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  </div>
                  <div className="form-group col-6">
                    <label>Prescription Quantity</label>
                    <input className="form-control form-control-sm" name="quantity" required={true}
                      value={this.state.quantity} onChange={this.onChange} />
                  </div>
                </div>
                : null}
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >


    return (
      <>
        {prescription_view}
        <div className="card">
          <div className="card-header custom-bg-secondary py-1 px-3">
            <div
              style={{ fontSize: "1vw", float: "left" }} className="py-1 px-2">Drug  &nbsp; &amp; &nbsp; Medicine Prescriptions</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm bg-light text-dark py-0 px-2 mr-auto mt-1"
              onClick={this.onNewPrescription}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Drug</th>
                  <th>Dosage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prescription.service_details.name}</td>
                    <td>{prescription.description}</td>
                    <td>
                      {
                        (prescription.is_paid && prescription.is_served) ? "Served" :
                          (prescription.is_paid && !prescription.is_served) ? "In progress" :
                            "Not paid"
                      }</td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
export default connect(state => ({
  health_file: state.outpatient.selected_health_file,
  prescriptions: state.outpatient.prescriptions,
  common: state.common,
  service_list: state.hospital.service_list,
}), { getPrescriptions, addPrescription, deletePrescription })(Prescription)
