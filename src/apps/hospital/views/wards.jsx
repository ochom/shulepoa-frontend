import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addWard, getWards, updateWard } from '../actions';

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

  componentDidMount() {
    this.props.getWards()
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
    const { hospital: { wards } } = this.props;

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
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Ward Name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="bed_capacity" required={true}
                  onChange={this.onChange} value={this.state.bed_capacity} />
                <label>Bed Capacity<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="admission_fee" required={true}
                  onChange={this.onChange} value={this.state.admission_fee} />
                <label>Admission Fee (Ksh)<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="daily_fee" required={true}
                  onChange={this.onChange} value={this.state.daily_fee} />
                <label>Daily Accomodation Fee (ksh)<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="description"
                  onChange={this.onChange} value={this.state.description} ></textarea>
                <label>Description</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div className="col-md-10 mx-auto mt-3">
        {ward_details_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Inpatient Wards
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
                {wards.map((ward, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ward.name}</td>
                    <td>{ward.bed_capacity}</td>
                    <td>{ward.admissions}</td>
                    <td>{ward.admission_fee}</td>
                    <td>{ward.daily_fee}</td>
                    <td>{ward.description}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-success mr-2"
                        onClick={() => this.onEditWard(ward)}><i className="fa fa-edit"></i> Edit</button>
                    </td>
                  </tr >
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
  hospital: state.hospital,
}), { getWards, addWard, updateWard })(Wards)