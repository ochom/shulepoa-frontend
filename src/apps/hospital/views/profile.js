import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getHospital, addHospital, updateHospital } from '../actions';

export class HospitalProfile extends Component {
  state = {
    showModal: false,
    selected_hospital: null,
    hospital_name: "",
    mfl_code: "",
    postal_address: "",
    physical_address: "",
    email: "",
    phone: "",
  }

  componentDidMount() {
    this.props.getHospital()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.hospital !== this.props.hospital) {
      const { hospital_profile } = nextProps.hospital;
      if (hospital_profile) {
        this.setState({
          selected_hospital: hospital_profile,
          hospital_name: hospital_profile.hospital_name,
          mfl_code: hospital_profile.mfl_code,
          postal_address: hospital_profile.postal_address,
          physical_address: hospital_profile.physical_address,
          email: hospital_profile.email,
          phone: hospital_profile.phone,
        })
      }
    }
  }

  onSubmitHospital = (e) => {
    e.preventDefault();
    const {
      selected_hospital,
      hospital_name,
      mfl_code,
      postal_address,
      physical_address,
      email,
      phone,
    } = this.state;

    const data = {
      hospital_name,
      mfl_code,
      postal_address,
      physical_address,
      email,
      phone,
    }
    if (selected_hospital) {
      this.props.updateHospital(selected_hospital.id, data);
    } else {
      this.props.addHospital(data)
    }
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const { hospital_profile } = this.props.hospital;
    const hospital_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          <span><i className="fa fa-edit"></i> Edit Hospital Profile</span>
        </ModalHeader>
        <form onSubmit={this.onSubmitHospital}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Hospital Name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="hospital_name" onChange={this.onChange}
                  value={this.state.hospital_name}
                  required={true} placeholder="Hospital Name" />
              </div>
              <div className="form-group col-12">
                <label>MFL Code<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="mfl_code" onChange={this.onChange}
                  value={this.state.mfl_code}
                  required={true} placeholder="MFL Code" />
              </div>
              <div className="form-group col-6">
                <label>Postal Address</label>
                <input className="form-control form-control-sm"
                  name="postal_address" onChange={this.onChange}
                  value={this.state.postal_address}
                  required={true} placeholder="Postal Address" />
              </div>
              <div className="form-group col-6">
                <label>Permanent Address<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="physical_address" onChange={this.onChange}
                  value={this.state.physical_address}
                  required={true} placeholder="Permanent Address" />
              </div>
              <div className="form-group col-6">
                <label>Email Address<sup>*</sup></label>
                <input type="email" className="form-control form-control-sm"
                  name="email" onChange={this.onChange} value={this.state.email}
                  required={true} placeholder="Email address" />
              </div>
              <div className="form-group col-6">
                <label>Phone Number</label>
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone}
                  required={true} placeholder="Phone number" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitHospital}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <>
        {hospital_details}
        <div className="col-sm-12 col-md-8 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div
                style={{ fontSize: "1.2vw", width: "300px", float: "left" }} className="py-1 px-2"><i className="fa fa-globe"></i> Browse hospital</div>
              <button
                style={{ float: "right" }}
                className="btn btn-sm py-1 px-2 mr-auto"
                onClick={this.toggleModal}><i className="fa fa-edit mr-2"></i> Edit Hospital
              </button>
            </div>
            <div className="card-body p-0 pb-2">
              <h5 className="pb-2 pt-3 px-5">{hospital_profile ? hospital_profile.hospital_name : 'Data not loaded'}</h5>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
});

export default connect(mapStateToProps, { getHospital, addHospital, updateHospital })(HospitalProfile);
