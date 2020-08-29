import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addHospital, getHospital, updateHospital } from '../actions';

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

  componentDidUpdate(nextProps) {
    if (nextProps.hospital !== this.props.hospital) {
      const { hospital_profile } = this.props.hospital;
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

    return (
      <div className="col-sm-12 col-md-8 mx-auto mt-3">
        {hospital_profile ?
          <div className="card">
            <form onSubmit={this.onSubmitHospital}>
              <div className="card-body">
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
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-sm cu-bg-primary"
                  onSubmit={this.onSubmitHospital}>
                  <i className="fa fa-check"></i> Update</button>
              </div>
            </form>
          </div>
          :
          <div className="card card-body">
            Profile not loaded
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
});

export default connect(mapStateToProps, { getHospital, addHospital, updateHospital })(HospitalProfile);
