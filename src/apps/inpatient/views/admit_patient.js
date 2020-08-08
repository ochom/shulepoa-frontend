import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import person_icon from '../../../images/person_icon.png'
import { admitPatient } from '../actions'

export class Admission extends Component {
  state = {
    showModal: false,
    stage: 1,
    ward: "",
    bed: "",
    admission_notes: "",
    selected_services: [],
    search_result: [],
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })
  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  onSearch = (e) => {
    const search = e.target.value;
    var result = this.props.service_list.filter(service => (
      service.name.toLowerCase().includes(search.toLowerCase()) && service.department === 6)
    ).slice(0, 20);
    this.setState({ search_result: result });
  }
  submitWardBed = (e) => {
    e.preventDefault();
    this.setState({ stage: 2, });
  }

  onAddService = (service) => {
    this.setState({ selected_services: [...this.state.selected_services.filter(serv => serv.id !== service.id), service] });
    this.toggleModal();
  }
  removeService = (service) => {
    this.setState({ selected_services: [...this.state.selected_services.filter(serv => serv.id !== service.id)] });
  }


  submitServices = () => {
    this.setState({ stage: 3, })
  }

  onAdmitPatient = () => {
    const data = {
      patient: this.props.selected_patient.id,
      service_requests: this.state.selected_services,
      ward: this.state.ward,
      bed: this.state.bed,
      admission_notes: this.state.admission_notes,
    }
    this.props.admitPatient(data);
    this.props.history.push("/inpatient/admission");
  }

  render() {
    const { ward_list } = this.props.inpatient;
    const { GENDERS, MARITAL_STATUSES } = this.props.common.CONSTANTS;
    const { selected_patient } = this.props;
    if (!selected_patient) {
      return (<Redirect to="/inpatient/admission" />)
    }

    const service_list_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}><i className="fa fa-plus-circle"></i> Add charges</ModalHeader>
        <ModalBody>
          <div className="form-row">
            <input className="form-control col-12" name="search_name" onChange={this.onSearch}
              placeholder="Search..." />
            {this.state.search_result.length > 0 ?
              <table className="table table-sm table-bordered mt-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service name</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.search_result.map((search, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{search.name}</td>
                      <td>{search.price}</td>
                      <td className="text-center">
                        <button className="btn btn-sm p-0 border-none text-primary"
                          onClick={() => this.onAddService(search)}><i className="fa fa-plus"></i> Add</button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table> : null}
          </div>
        </ModalBody >
      </Modal >


    return (
      <div>
        {service_list_view}
        <div className="row col-12 justify-content-center mx-auto mt-3">
          <div className="col-3">
            <div className="patient_profile p-0 border border-light rounded ">
              <div className="row mx-auto justify-content-center mt-4">
                <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                <p className="cu-text-primary col-12 text-center text-white mt-2">Patient Profile</p>
              </div>
              <ul className="w-100 mx-auto list-group mt-2">
                <li className="list-group-item">
                  <span className="m-0">Name:</span> <span style={{ float: "right" }}>{selected_patient.fullname}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Sex:</span> <span style={{ float: "right" }}>{GENDERS[selected_patient.sex]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">DoB:</span> <span style={{ float: "right" }}>{new Date(selected_patient.dob).toDateString("en-UK")}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Marriage:</span> <span style={{ float: "right" }}>{MARITAL_STATUSES[selected_patient.marital_status]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Mobile:</span> <span style={{ float: "right" }}>{selected_patient.phone}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Address:</span> <span style={{ float: "right" }}>{`${selected_patient.county}, ${selected_patient.country}`}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-7">
            {
              this.state.stage === 1 ?
                <div className="card" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                  <div className="card-header cu-bg-secondary px-3 py-2">
                    <div style={{ fontSize: "1.2vw", }}>Select Ward &amp; Bed</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.submitWardBed}>
                      <div className="form-group">
                        <label>Ward</label>
                        <select className="form-control" name="ward" required={true}
                          onChange={this.onChange} value={this.state.ward}>
                          <option value="">Select</option>
                          {ward_list.map((ward, index) => <option key={index} value={ward.id}>{ward.name}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Bed Number</label>
                        <input className="form-control" name="bed" required={true}
                          onChange={this.onChange} value={this.state.bed} />
                      </div>
                      <div className="form-group">
                        <label>Admission Notes</label>
                        <textarea className="form-control" name="admission_notes" required={true}
                          onChange={this.onChange} value={this.state.admission_notes} ></textarea>
                      </div>

                      <div className="form-group">
                        <button className="btn btn-outline-primary"
                          onSubmit={this.submitWardBed}>Next</button>
                      </div>
                    </form>
                  </div>
                </div> :
                this.state.stage === 2 ?
                  <div className="card" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                    <div className="card-header cu-bg-secondary py-1 px-3">
                      <div
                        style={{ fontSize: "1.2vw", float: "left" }} className="py-1 px-2">Admission Charges  &amp; Services</div>
                      <button
                        style={{ float: "right" }}
                        className="btn btn-sm "
                        onClick={this.toggleModal}><i className="fa fa-plus-circle mr-2"></i> Add
                    </button>
                    </div>
                    <div className="card-body p-0 mt-0">
                      <table className="table table-sm table-bordered m-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Service</th>
                            <th>Cost</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.selected_services.map((service, index) =>
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{service.name}</td>
                              <td>{service.price}</td>
                              <td className="text-center">
                                <button className="btn btn-sm border-none text-danger"
                                  onClick={() => this.removeService(service)}><i className="fa fa-close"></i> Remove</button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="form-group col-12 mx-auto mt-3">
                        {this.state.selected_services.length === 0 ?
                          <button className="btn btn-sm btn-outline-secondary"
                            onClick={this.submitServices}> Skip</button>
                          :
                          <button className="btn btn-sm btn-outline-primary"
                            onClick={this.submitServices}> Next</button>
                        }
                      </div>
                    </div>
                  </div> :
                  this.state.stage === 3 ?
                    <>
                      <div className="card">
                        <div className="card-header cu-bg-secondary px-3 py-2">
                          <div style={{ fontSize: "1.2vw", }}>Select Ward &amp; Bed</div>
                        </div>
                        <div className="card-body p-0">
                          <ul className="w-100 mx-auto list-group">
                            <li className="list-group-item">
                              <span className="m-0">Ward:</span> <span style={{ float: "right" }}>
                                {ward_list.filter(ward => ward.id === parseInt(this.state.ward))[0].name}</span>
                            </li>
                            <li className="list-group-item">
                              <span className="m-0">Bed:</span> <span style={{ float: "right" }}>{this.state.bed}</span>
                            </li>
                            <li className="list-group-item">
                              <span className="m-0">Notes:</span> <span style={{ float: "right" }}>{this.state.admission_notes}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="card mt-3">
                        <div className="card-header cu-bg-secondary px-3 py-2">
                          <div style={{ fontSize: "1.2vw", }}>Selected services</div>
                        </div>
                        <div className="card-body p-0">
                          <ul className="w-100 mx-auto list-group">
                            {this.state.selected_services.map((service, index) =>
                              <li key={index} className="list-group-item">
                                <span className="m-0">{service.name}</span>
                                <span style={{ float: "right" }}>{service.price}</span>
                              </li>
                            )}
                          </ul>
                          <div className="form-group col-12 mx-auto mt-3">
                            <button className="btn btn-sm btn-primary"
                              onClick={this.onAdmitPatient}> Admit Patient</button>
                          </div>
                        </div>
                      </div>
                    </>
                    : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  inpatient: state.inpatient,
  service_list: state.hospital.service_list,
  selected_patient: state.inpatient.selected_patient,
  common: state.common,
}), { admitPatient })(Admission)