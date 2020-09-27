import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteData } from '../../common/actions';
import { addClinic, deleteClinic, getClinics, updateClinic } from '../actions';

export class Clinic extends Component {
  state = {
    showModal: false,
    select_clinic: null,

    name: "",
    appointment_fee: "",

  }

  componentDidMount() {
    this.props.getClinics();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleCheck = (e) => {
    this.setState({ [e.target.name]: e.target.checked ? 1 : 0 })
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewClinic = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_clinic: null,
      name: "",
      appointment_fee: "",
    })
  }

  onEditClinic = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_clinic: data,
      name: data.name,
      appointment_fee: data.appointment_fee,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      select_clinic,
      name,
      appointment_fee
    } = this.state;

    const data = {
      name,
      appointment_fee
    }
    if (select_clinic) {
      this.props.updateClinic(select_clinic.id, data);
    } else {
      this.props.addClinic(data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const clinic_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_clinic ? "Edit Clinic Details" : "Add Clinic"}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true} />
                <label>Clinic name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="appointment_fee" onChange={this.onChange} value={this.state.appointment_fee} required={true} />
                <label>Appointment Fee<sup>*</sup></label>
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
      <div className="col-md-8 mx-auto mt-3">
        {clinic_details}
        <div className="card">
          <div className="card-header">
            <div>Groups</div>
            {this.props.rights.can_add_clinic ?
              <button
                className="btn btn-sm"
                onClick={this.onNewClinic}><i className="fa fa-plus-circle"></i>  Add Clinic
              </button> :
              null}
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Appointment Fee</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {this.props.clinics.map((clinic, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{clinic.name}</td>
                    <td>{clinic.appointment_fee}</td>
                    <td>
                      {this.props.rights.can_edit_clinic ? <>
                        <button className="btn btn-sm btn-success mr-2"
                          onClick={() => this.onEditClinic(clinic)}><i className="fa fa-edit"></i> Edit</button>
                        <button className="btn btn-sm btn-danger"
                          onClick={() => deleteData(clinic.id, this.props.deleteClinic)}><i className="fa fa-trash"></i> Delete</button>
                      </> :
                        <button className="btn btn-sm btn-secondary disabled">No Action</button>}
                    </td>
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

const mapStateToProps = state => ({
  clinics: state.hospital.clinics,
  common: state.common,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getClinics, addClinic, updateClinic, deleteClinic })(Clinic);
