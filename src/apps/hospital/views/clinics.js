import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getClinics, addClinic, updateClinic } from '../actions';

export class Clinic extends Component {
  state = {
    showModal: false,
    select_clinic: null,

    name: "",
    desc: "",

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
      desc: "",
    })
  }

  onEditClinic = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_clinic: data,
      name: data.name,
      desc: data.desc,
    })
  }

  onSubmitClinic = (e) => {
    e.preventDefault();
    const {
      select_clinic,
      name,
      desc
    } = this.state;

    const data = {
      name,
      desc
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
        <form onSubmit={this.onSubmitClinic}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Clininc name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                />
              </div>
              <div className="form-group col-12">
                <label>Description<sup>*</sup></label>
                <textarea className="form-control form-control-sm"
                  name="desc" onChange={this.onChange} value={this.state.desc} required={true}
                ></textarea>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitClinic}>
              <i className="fa fa-check"></i> Save</button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    return (
      <div className="col-md-8 mx-auto mt-3">
        {clinic_details}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><i className="fa fa-stethoscope"></i> Clinics</div>
            <button
              className="btn btn-sm py-1 px-2 mr-auto"
              onClick={this.onNewClinic}><i className="fa fa-plus-circle mr-2"></i> Add Clinic
              </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Desc</td>
                  <td className="text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {this.props.clinics.map((clinic, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{clinic.name}</td>
                    <td>{clinic.desc}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditClinic(clinic)}><i className="fa fa-edit"></i> Edit</button>{' | '}
                      <button className="btn btn-sm p-0 border-none text-danger"><i className="fa fa-trash"></i> Delete</button>
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
});

export default connect(mapStateToProps, { getClinics, addClinic, updateClinic })(Clinic);
