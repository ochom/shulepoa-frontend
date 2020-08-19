import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getPatients, addPatient, updatePatient } from '../actions'
import { Link } from 'react-router-dom';

export class Patients extends Component {
  state = {
    patients: [],
    showModal: false,
    select_patient: null,


    fullname: "", id_type: "", id_no: "",
    dob: "", sex: "", marital_status: "",
    occupation: "",
    phone: "", postal_address: "", country: "Kenya",
    county: "", sub_county: "", ward_estate: "",
    kin_name: "", kin_phone: "", kin_relationship: "", kin_id: "",
  }

  componentDidMount() {
    this.props.getPatients()
  }

  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ patients: nextProps.patients })
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewPatient = () => {
    this.setState({
      select_patient: null,
      fullname: "", id_type: "", id_no: "",
      dob: "", sex: "", marital_status: "",
      occupation: "",
      phone: "", postal_address: "", country: "Kenya",
      county: "", sub_county: "", ward_estate: "",
      kin_name: "", kin_phone: "", kin_relationship: "", kin_id: "",
    });
    this.toggleModal();
  }

  onEditPatient = (data) => {
    this.setState({
      select_patient: data,
      fullname: data.fullname, id_type: data.id_type, id_no: data.id_no,
      dob: data.dob, sex: data.sex, marital_status: data.marital_status,
      occupation: data.occupation,
      phone: data.phone, postal_address: data.postal_address, country: data.country,
      county: data.county, sub_county: data.sub_county, ward_estate: data.ward_estate,
      kin_name: data.kin_name, kin_phone: data.kin_phone, kin_relationship: data.kin_relationship, kin_id: data.kin_id,
    });
    this.toggleModal();
  }

  onSubmitPatient = (e) => {
    e.preventDefault();
    const {
      select_patient,
      fullname, id_type, id_no,
      dob, sex, marital_status,
      occupation,
      phone, postal_address, country,
      county, sub_county, ward_estate,
      kin_name, kin_phone, kin_relationship, kin_id,
    } = this.state;

    const data = {
      fullname, id_type, id_no,
      dob, sex, marital_status,
      occupation,
      phone, postal_address, country,
      county, sub_county, ward_estate,
      kin_name, kin_phone, kin_relationship, kin_id,
    }
    if (select_patient) {
      this.props.updatePatient(select_patient.id, data);
    } else {
      this.props.addPatient(data)
    }

    this.toggleModal();
  }

  onSearchPatient = (e) => {
    const search_val = (e.target.value).toLowerCase();
    this.setState({
      patients: this.props.patients.filter(pt =>
        (pt.fullname.toLowerCase().includes(search_val) ||
          pt.id_no.toLowerCase().includes(search_val) ||
          pt.phone.toLowerCase().includes(search_val)
        )
      )
    })
  }


  render() {
    const {
      GENDERS, ID_TYPES, KIN_RELATIONSHIPS,
      MARITAL_STATUSES, COUNTRIES
    } = this.props.common.CONSTANTS;
    const { patients } = this.state

    const patient_details =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_patient ?
            <span><i className="fa fa-edit"></i> Edit Patient Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Patient</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitPatient}>
          <ModalBody>
            {/* Personal Details */}
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Personal Details</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-8">
                <label>Full name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="fullname" onChange={this.onChange} value={this.state.fullname} required={true}
                  placeholder="Full name" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Sex<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="sex" onChange={this.onChange} value={this.state.sex} required={true}>
                  <option value="">Select</option>
                  {GENDERS.map((GENDER, index) => <option key={index} value={index}>{GENDER}</option>)}
                </select>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Date of Birth<sup>*</sup></label>
                <input type="date" className="form-control form-control-sm"
                  name="dob" onChange={this.onChange} value={this.state.dob} required={true}
                  placeholder="Date" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>ID Type<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="id_type" onChange={this.onChange} value={this.state.id_type} required={true}>
                  <option value="">Select</option>
                  {ID_TYPES.map((ID_TYPE, index) => <option key={index} value={index}>{ID_TYPE}</option>)}
                </select>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>ID NO<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="id_no" onChange={this.onChange} value={this.state.id_no} required={true}
                  placeholder="Identification Number" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Marital Status<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="marital_status" onChange={this.onChange} value={this.state.marital_status} required={true}>
                  <option value={null}>Select</option>
                  <option value="">Select</option>
                  {MARITAL_STATUSES.map((MARITAL_STATUS, index) => <option key={index} value={index}>{MARITAL_STATUS}</option>)}
                </select>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Occupation</label>
                <input className="form-control form-control-sm"
                  name="occupation" onChange={this.onChange} value={this.state.occupation} />
              </div>
            </div>
            {/* Contact Information */}
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Contacts and Adress</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-4">
                <label>Phone Number<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone} required={true}
                  placeholder="Phone Number" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Postal Address</label>
                <input className="form-control form-control-sm"
                  name="postal_address" onChange={this.onChange} value={this.state.postal_address}
                  placeholder="Postal Address" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Country<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="country" onChange={this.onChange}
                  value={this.state.country} required={true}
                >
                  <option value="">Select</option>
                  {COUNTRIES.map((country, index) => <option key={index} value={country}>{country}</option>)}
                </select>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>County<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="county" onChange={this.onChange} value={this.state.county} required={true}
                  placeholder="County" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Sub-county</label>
                <input className="form-control form-control-sm"
                  name="sub_county" onChange={this.onChange} value={this.state.sub_county}
                  placeholder="Sub-county" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Ward/Estate</label>
                <input className="form-control form-control-sm"
                  name="ward_estate" onChange={this.onChange} value={this.state.ward_estate}
                  placeholder="Ward/ Village/ Estate" />
              </div>
            </div>
            {/* NEXT OF KIN */}
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Next of kin</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-4">
                <label>Kin's Name <small>(Full name)</small><sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="kin_name" onChange={this.onChange} value={this.state.kin_name} required={true}
                  placeholder="Kin name" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Kin's Mobile<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="kin_phone" onChange={this.onChange} value={this.state.kin_phone} required={true}
                  placeholder="Mobile" />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Relationship<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="kin_relationship" onChange={this.onChange} value={this.state.kin_relationship} required={true}>
                  <option value="">Select</option>
                  {KIN_RELATIONSHIPS.map((KIN_RELATIONSHIP, index) => <option key={index} value={index}>{KIN_RELATIONSHIP}</option>)}
                </select>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label>Kin's ID Number</label>
                <input className="form-control form-control-sm"
                  name="kin_id" onChange={this.onChange} value={this.state.kin_id}
                  placeholder="Kin's ID number" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitPatient}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <>
        {patient_details}
        <div className="col-sm-12 col-md-11 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-globe"></i> Manage patient records</div>
              <input className="form-control form-control-sm"
                onChange={this.onSearchPatient}
                placeholder="Search..." />
              <button
                className="btn btn-sm py-1 px-2 mr-auto"
                onClick={this.onNewPatient}><i className="fa fa-plus-circle mr-2"></i> Add Patient
              </button>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header"></div>
            <div className="card-bodyp-0">
              <table className="table table-sm table-striped table-bordered">
                <caption className="px-2"><i>Recent patients | Search results</i></caption>
                <thead className="">
                  <tr><th>#</th><th>Full name</th><th>Gender</th><th>Mobile</th><th>Address</th><th className="text-center">Action</th></tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{patient.fullname}</td>
                      <td>{GENDERS[patient.sex]}</td>
                      <td>{patient.phone}</td>
                      <td>{`${patient.county}, ${patient.country}`}</td>
                      <td className="text-center">
                        <button className="btn btn-sm p-0 border-none text-success"
                          onClick={() => this.onEditPatient(patient)}><i className="fa fa-edit"></i> Edit</button>{' | '}
                        <Link to={`/records/patients/${patient.id}`}
                          className="btn btn-sm p-0 border-none text-primary"><i className="fa fa-user"></i> View profile</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  patients: state.records.patients,
  common: state.common,
});

export default connect(mapStateToProps, { getPatients, addPatient, updatePatient })(Patients);
