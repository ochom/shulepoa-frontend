import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux';
import { loadWards, addWard, updateWard } from '../actions'

export class Wards extends Component {
  state = {
    showModal: false,
    selected_ward: null,
    name: "",
    bed_capacity: "",
    admission_fee: "",
    daily_fee: "",
    description: "",
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewWard = () => {
    this.setState({
      selected_ward: null,
      name: "",
      bed_capacity: "",
      admission_fee: "",
      daily_fee: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditWard = (ward) => {
    this.setState({
      selected_ward: ward,
      name: ward.name,
      bed_capacity: ward.bed_capacity,
      admission_fee: ward.admission_fee,
      daily_fee: ward.daily_fee,
      description: ward.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_ward,
      name,
      bed_capacity,
      admission_fee,
      daily_fee,
      description
    } = this.state;
    const data = {
      selected_ward,
      name,
      bed_capacity,
      admission_fee,
      daily_fee,
      description
    }
    if (selected_ward) {
      this.props.updateWard(selected_ward.id, data);
    } else {
      this.props.addWard(data);
    }
    this.toggleModal();
  }

  render() {
    const { ward_list } = this.props.inpatient;
    const ward_details_view =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_ward ?
            <span><i className="fa fa-edit"></i> Update Ward</span> :
            <span><i className="fa fa-plus-circle"></i> Reister Ward</span>}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <label>Ward Name<sup>*</sup></label>
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
              </div>
              <div className="form-group col-12">
                <label>Bed Capacity<sup>*</sup></label>
                <input className="form-control form-control-sm" name="bed_capacity" required={true}
                  onChange={this.onChange} value={this.state.bed_capacity} placeholder="0" />
              </div>
              <div className="form-group col-6">
                <label>Admission Fee (Ksh)<sup>*</sup></label>
                <input className="form-control form-control-sm" name="admission_fee" required={true}
                  onChange={this.onChange} value={this.state.admission_fee} />
              </div>
              <div className="form-group col-6">
                <label>Daily Accomodation Fee (ksh)<sup>*</sup></label>
                <input className="form-control form-control-sm" name="daily_fee" required={true}
                  onChange={this.onChange} value={this.state.daily_fee} />
              </div>
              <div className="form-group col-12">
                <label>Description</label>
                <textarea className="form-control form-control-sm" name="description"
                  onChange={this.onChange} value={this.state.description} ></textarea>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Submit</Button>
            <Button size="sm" color="secondary" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Close</Button>
          </ModalFooter>
        </form>
      </Modal>

    const wards_list_view = ward_list.map((ward, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{ward.name}</td>
        <td>{ward.bed_capacity}</td>
        <td>{ward.admissions}</td>
        <td>{ward.admission_fee}</td>
        <td>{ward.daily_fee}</td>
        <td>{ward.description}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-primary"
            onClick={() => this.onEditWard(ward)}><i className="fa fa-edit"></i> Edit</button> {` | `}
          <Link className="btn btn-sm p-0 border-none cu-text-primary"
            to={`/inpatient/wards/${ward.id}/patients`}><i className="fa fa-users"></i> Patients</Link>
        </td>
      </tr >)
    return (
      <div className="col-md-10 mx-auto mt-3">
        {ward_details_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><i className="fa fa-search mr-3"></i> Search admited patients
              </div>
            <button className="btn btn-sm"
              onClick={this.onNewWard}><i className="fa fa-plus-circle"></i> Add Ward</button>

          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-bordered">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Ward Name</th>
                  <th>Beds</th>
                  <th>Active</th>
                  <th>Adm. Fee</th>
                  <th>Daily. Fee</th>
                  <th>Description</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {wards_list_view}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  inpatient: state.inpatient,
}), { loadWards, addWard, updateWard })(Wards)