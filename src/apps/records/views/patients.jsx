import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addAdmission } from '../../inpatient/actions';
import { addPatient, getPatients, updatePatient } from '../actions';
import { addAppointment } from '../../outpatient/actions';
import PaginatedTable from '../../common/pagination';

export class Patients extends Component {
  state = {
    showModal: false,
    showModal2: false,
    showModal3: false,
    selected_patient: null,

    //registration
    fullname: "", id_type: "", id_no: "",
    dob: "", sex: "", marital_status: "",
    occupation: "",
    phone: "", postal_address: "", country: "Kenya",
    county: "", sub_county: "", ward_estate: "",
    kin_name: "", kin_phone: "", kin_relationship: "", kin_id: "",

    //appointment
    clinic_id: "",
    date: "",

    //admission
    ward_id: "",
    admission_notes: "",
  }

  componentDidMount() {
    this.props.getPatients()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  toggleModal2 = () => this.setState({ showModal2: !this.state.showModal2 });
  toggleModal3 = () => this.setState({ showModal3: !this.state.showModal3 });

  onNewPatient = () => {
    this.setState({
      selected_patient: null,
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
      selected_patient: data,
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
      selected_patient,
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
    if (selected_patient) {
      this.props.updatePatient(selected_patient.id, data);
    } else {
      this.props.addPatient(data)
    }

    this.toggleModal();
  }

  onNewAppointment = (data) => {
    this.setState({
      selected_patient: data,
      fullname: data.fullname,
      dob: data.dob, sex: data.sex,
      clinic_id: "",
      date: "",
    });
    this.toggleModal3();
  }

  onSubmitAppointment = (e) => {
    e.preventDefault()
    const { hospital: { clinics } } = this.props;
    const {
      selected_patient,
      clinic_id,
      date,
    } = this.state;

    const file_data = {
      patient_id: selected_patient.id,
      clinic_id,
      date,
      service_name: "Clinic Fee",
      price: clinics.find(c => c.id === parseInt(clinic_id)).appointment_fee,
      cost: clinics.find(c => c.id === parseInt(clinic_id)).appointment_fee,
    }
    this.props.addAppointment(file_data)
    this.toggleModal3();
  }

  onNewAdmission = (data) => {
    this.setState({
      selected_patient: data,
      fullname: data.fullname,
      dob: data.dob, sex: data.sex,
      ward_id: "",
      admission_notes: "",
    });
    this.toggleModal2();
  }

  onSubmitAdmission = (e) => {
    e.preventDefault()
    const {
      selected_patient,
      ward_id,
      admission_notes } = this.state

    var data = {
      patient_id: selected_patient.id,
      ward_id,
      admission_notes
    }

    this.props.addAdmission(data)
    this.toggleModal2();
  }

  getAge = () => {
    var diff_ms = Date.now() - new Date(this.state.dob).getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970) + " Years";
  }

  render() {
    const { common: { CONSTANTS: { GENDERS, ID_TYPES, KIN_RELATIONSHIPS,
      MARITAL_STATUSES, COUNTRIES } },
      hospital: { wards, clinics },
      records: { patients },
      rights,
    } = this.props;

    const patient_details =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_patient ?
            <span><i className="fa fa-edit"></i> Edit Patient Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Patient</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitPatient}>
          <ModalBody>
            {/* Personal Details */}
            <div className="bg-secondary text-warning py-1 px-3 mb-2 rounded">Personal Details</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-8">
                <input className="form-control form-control-sm"
                  name="fullname" onChange={this.onChange} value={this.state.fullname} required={true}
                />
                <label>Full name<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm" data-value={this.state.sex}
                  name="sex" onChange={this.onChange} value={this.state.sex} required={true}>
                  <option value=""></option>
                  {GENDERS.map((GENDER, index) => <option key={index} value={index}>{GENDER}</option>)}
                </select>
                <label>Sex<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input type="text" className="form-control form-control-sm"
                  name="dob" onChange={this.onChange} value={this.state.dob} required={true}
                  onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value ? e.target.type = 'text' : 'date'} />
                <label>Date of Birth<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm"
                  name="id_type" onChange={this.onChange} data-value={this.state.id_type}
                  value={this.state.id_type} required={true}>
                  <option value=""></option>
                  {ID_TYPES.map((ID_TYPE, index) => <option key={index} value={index}>{ID_TYPE}</option>)}
                </select>
                <label>ID Type<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="id_no" onChange={this.onChange} value={this.state.id_no} required={true} />
                <label>ID NO<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm"
                  name="marital_status" onChange={this.onChange} data-value={this.state.marital_status}
                  value={this.state.marital_status} required={true}>
                  <option value=""></option>
                  {MARITAL_STATUSES.map((MARITAL_STATUS, index) => <option key={index} value={index}>{MARITAL_STATUS}</option>)}
                </select>
                <label>Marital Status<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="occupation" onChange={this.onChange} value={this.state.occupation} />
                <label>Occupation<sup>*</sup></label>
              </div>
            </div>
            {/* Contact Information */}
            <div className="bg-secondary text-warning py-1 px-3 mb-2 rounded">Contacts and Adress</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone} required={true}
                />
                <label>Phone Number<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="postal_address" onChange={this.onChange} value={this.state.postal_address}
                />
                <label>Postal Address</label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm"
                  name="country" onChange={this.onChange} data-value={this.state.country}
                  value={this.state.country} required={true}>
                  <option value=""></option>
                  {COUNTRIES.map((country, index) => <option key={index} value={country}>{country}</option>)}
                </select>
                <label>Country<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="county" onChange={this.onChange} value={this.state.county} required={true}
                />
                <label>County<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="sub_county" onChange={this.onChange} value={this.state.sub_county}
                />
                <label>Sub-county</label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="ward_estate" onChange={this.onChange} value={this.state.ward_estate}
                />
                <label>Ward/Estate</label>
              </div>
            </div>
            {/* NEXT OF KIN */}
            <div className="bg-secondary text-warning py-1 px-3 mb-2 rounded">Next of kin</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_name" onChange={this.onChange} value={this.state.kin_name} required={true}
                />
                <label>Kin's Name <small>(Full name)</small><sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_phone" onChange={this.onChange} value={this.state.kin_phone} required={true}
                />
                <label>Kin's Mobile<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm"
                  name="kin_relationship" onChange={this.onChange} data-value={this.state.kin_relationship}
                  value={this.state.kin_relationship} required={true}>
                  <option value=""></option>
                  {KIN_RELATIONSHIPS.map((KIN_RELATIONSHIP, index) => <option key={index} value={index}>{KIN_RELATIONSHIP}</option>)}
                </select>
                <label>Relationship<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_id" onChange={this.onChange} value={this.state.kin_id}
                />
                <label>Kin's ID Number</label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmitPatient}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal >

    const book_appointment_view =
      <Modal isOpen={this.state.showModal3}>
        <ModalHeader toggle={this.toggleModal3}>Book apoointment :: {this.state.fullname}</ModalHeader>
        <form onSubmit={this.onSubmitAppointment}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm"
                  value={this.state.fullname} readOnly={true} />
                <label>Patient Name</label>
              </div>
              <div className="form-group col-6">
                <input type="text" className="form-control form-control-sm"
                  value={GENDERS[this.state.sex]} readOnly={true} />
                <label>Sex</label>
              </div>
              <div className="form-group col-6">
                <input type="text" className="form-control form-control-sm"
                  value={this.getAge()} readOnly={true} />
                <label>Age</label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" data-value={this.state.clinic_id}
                  name="clinic_id" onChange={this.onChange} value={this.state.clinic_id} required={true}>
                  <option value=""></option>
                  {clinics.map((clinic, index) => <option key={index} value={clinic.id}>{clinic.name}</option>)}
                </select>
                <label>Clinic to visit</label>
              </div>
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm"
                  name="date" onChange={this.onChange} value={this.state.date} required={true}
                  onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value ? e.target.type = 'text' : 'date'} />
                <label>Appointment Date<sup>*</sup></label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmitAppointment}>
              <i className="fa fa-check"></i> Submit</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal3}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal >

    const admission_modal =
      <Modal isOpen={this.state.showModal2}>
        <ModalHeader toggle={this.toggleModal2}>Admit :: {this.state.fullname}</ModalHeader>
        <form onSubmit={this.onSubmitAdmission}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm"
                  value={this.state.fullname} readOnly={true} />
                <label>Patient Name</label>
              </div>
              <div className="form-group col-6">
                <input type="text" className="form-control form-control-sm"
                  value={GENDERS[this.state.sex]} readOnly={true} />
                <label>Sex</label>
              </div>
              <div className="form-group col-6">
                <input type="text" className="form-control form-control-sm"
                  value={this.getAge()} readOnly={true} />
                <label>Age</label>
              </div>
              <div className="form-group col-12">
                <select type="text" className="form-control form-control-sm" name="ward_id" onChange={this.onChange}
                  value={this.state.ward_id} data-value={this.state.ward_id} required={true}>
                  <option value=""></option>
                  {wards.map((ward, index) => <option key={index} value={ward.id}>{ward.name}</option>)}
                </select>
                <label>Ward</label>
              </div>
              <div className="form-group col-12">
                <textarea
                  type="text"
                  name="admission_notes"
                  className="form-control form-control-sm"
                  onChange={this.onChange}
                  rows="6"
                  value={this.state.admission_notes}
                  required={true}>
                </textarea>
                <label>Admission Notes</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success">
              <i className="fa fa-check"></i> Submit</button>{' '}
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModal2}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    const columns = [
      {
        title: '#Reg',
        render: rowData => {
          return <span>{rowData.id}</span>;
        }
      },
      {
        title: 'Fullname',
        render: rowData => {
          return <span>{rowData.fullname}</span>;
        }
      },
      {
        title: 'Sex',
        render: rowData => {
          return <span>{GENDERS[rowData.sex]}</span>;
        }
      },
      {
        title: 'Mobile',
        render: rowData => {
          return <span>{rowData.phone}</span>;
        }
      },
      {
        title: 'Address',
        render: rowData => {
          return <span>{`${rowData.county}, ${rowData.country}`}</span>;
        }
      },
      {
        title: 'Action',
        render: rowData => {
          return <>
            {rights.can_edit_patient ? <button className="btn btn-sm btn-success mr-2"
              onClick={() => this.onEditPatient(rowData)}><i className="fa fa-edit"></i> Edit</button> : null}
            {rights.can_add_appointment ? rowData.is_booked ?
              <button className="btn btn-sm btn-secondary disabled mr-2"><i className="fa fa-user-md"></i> Booked</button>
              : <button className="btn btn-sm btn-primary mr-2"
                onClick={() => this.onNewAppointment(rowData)}><i className="fa fa-user-md"></i> Book</button>
              : null}
            {rights.can_add_admission ? rowData.is_admitted ?
              <button className="btn btn-sm btn-secondary disabled mr-2"><i className="fa fa-bed"></i> Admitted</button>
              : <button className="btn btn-sm btn-danger mr-2"
                onClick={() => this.onNewAdmission(rowData)}><i className="fa fa-bed"></i> Admit</button>
              : null}
            <Link to={`/records/patients/${rowData.id}`}
              className="btn btn-sm btn-warning"><i className="fa fa-user"></i> View</Link>
          </>;
        }
      },
    ]

    return (
      <div className="col-md-10 mx-auto">
        {patient_details}
        {admission_modal}
        {book_appointment_view}
        <div className="card">
          <div className="card-header">
            <div>Patients</div>
            {rights.can_add_patient ?
              <button
                className="btn btn-sm"
                onClick={this.onNewPatient}>
                <i className="fa fa-plus-circle mr-2"></i> Add Patient</button> : null}
          </div>
          <div className="card-bodyp-0">
            <PaginatedTable cols={columns} rows={patients} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  records: state.records,
  common: state.common,
  hospital: state.hospital,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getPatients, addPatient, updatePatient, addAdmission, addAppointment })(Patients);
