import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteData } from '../../common/actions'
import { addServiceRequest, deleteServiceRequest, getServiceRequests, updateServiceRequest } from '../../revenue/actions'

export class Prescription extends Component {
  state = {
    showModal: false,
    search_result: [],
    search: "",

    selected_drug: null,
    dosage: "",
    frequency: "",
    days: "",
    dos_2_qnty: 1,
    quantity: 1,
  }

  componentDidMount = () => {
    this.props.getServiceRequests();
  }

  onSearch = (e) => {
    this.onChange(e)
    const search = e.target.value;
    const result = this.props.drugs.filter(drug =>
      (drug.brand_name.toLowerCase().includes(search.toLowerCase()))
    ).slice(0, 7);
    this.setState({ search_result: result });
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

  onNewPrescription = () => {
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
      quantity,
    } = this.state;

    const data = {
      admission_id: this.props.admission.id,
      patient_id: this.props.admission.patient_id,
      service_id: selected_drug.id,
      service_name: selected_drug.brand_name,
      department: 5,
      is_approved: true,
      price: selected_drug.price,
      cost: quantity * selected_drug.price,
      description: dosage + "x" + frequency + "x" + days,
      quantity
    }
    this.props.addServiceRequest(data);
    this.toggleModal();
  }

  render() {
    const { selected_drug } = this.state;
    const { service_requests, admission, rights } = this.props
    const prescription_view =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}><i className="fa fa-plus-circle"></i> Add prescription
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row col-12">
              <div className="col-6">
                <div className="form-group col-12">
                  <input className="form-control form-control-sm" name="search"
                    onChange={this.onSearch} value={this.state.search} />
                  <label><span role="img" aria-label="search">&#x1F50D;</span> Search...</label>
                </div>
                <table className="table table-sm table-hover table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Drug name</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.search_result.map((drug, index) =>
                      <tr key={index} style={{ cursor: "pointer" }} onClick={() => this.onSelectDrug(drug)}>
                        <td>{drug.brand_name}</td>
                        <td>{drug.price}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {selected_drug ?
                <div className="row col-6">
                  <div className="form-group  col-12">
                    <input className="form-control form-control-sm" readOnly={true}
                      value={selected_drug.brand_name} />
                    <label>Drug name</label>
                  </div>
                  <div className="form-group col-6">
                    <input className="form-control form-control-sm" readOnly={true}
                      value={selected_drug.quantity} />
                    <label>In store</label>
                  </div>
                  <div className="form-group col-6">
                    <input className="form-control form-control-sm" readOnly={true}
                      value={selected_drug.price} onChange={this.onChange} />
                    <label>Cost</label>
                  </div>
                  <div className="form-group col-4">
                    <input className="form-control form-control-sm" name="dosage" required={true}
                      value={this.state.dosage} onChange={this.onChange} />
                    <label>Dosage</label>
                  </div>
                  <div className="form-group col-4">
                    <input className="form-control form-control-sm" name="frequency" required={true}
                      value={this.state.frequency} onChange={this.onChange} />
                    <label>Frequency</label>
                  </div>
                  <div className="form-group col-4">
                    <input className="form-control form-control-sm" name="days" required={true}
                      value={this.state.days} onChange={this.onChange} />
                    <label>Days</label>
                  </div>
                  <div className="form-group col-12">
                    <select className="form-control form-control-sm" name="dos_2_qnty" data-value={this.state.dos_2_qnty}
                      required={true} value={this.state.dos_2_qnty} onChange={this.onChange}>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                    <label>Dosage to Quantity ?</label>
                  </div>
                  <div className="form-group col-12">
                    <input className="form-control form-control-sm" name="quantity" required={true}
                      value={this.state.quantity} onChange={this.onChange} />
                    <label>Prescription Quantity</label>
                  </div>
                </div>
                : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <>
        {prescription_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Prescriptions</b></div>
            {rights.can_add_prescription ?
              <button
                className="btn btn-sm "
                onClick={this.onNewPrescription}><i className="fa fa-plus-circle mr-2"></i> Add
              </button> : null}
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Drug</th>
                  <th>Dosage</th>
                  <th className="text-center">Served</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {service_requests.filter(request => request.department === 5 && request.admission_id === admission.id).map((request, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{request.service_name}</td>
                    <td>{request.description}</td>
                    <td className="text-center">
                      {
                        request.is_served ? <i className="fa fa-check text-success"></i> :
                          <i className="fa fa-minus text-secondary"></i>
                      }
                    </td>
                    <td className="text-center">
                      {rights.can_add_prescription ?
                        !request.is_served ?
                          <button className="btn btn-sm  border-none btn-danger"
                            onClick={() => deleteData(request.id, this.props.deleteServiceRequest)}><i className="fa fa-trash"></i> delete</button>
                          : <button className="btn btn-sm btn-secondary disabled">no action</button>
                        : null
                      }
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
export default connect(state => ({
  admission: state.inpatient.admission,
  service_requests: state.revenue.service_requests,
  common: state.common,
  drugs: state.pharmacy.drugs,
  rights: state.auth.user.rights
}), { getServiceRequests, addServiceRequest, updateServiceRequest, deleteServiceRequest })(Prescription)
