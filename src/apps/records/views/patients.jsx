import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addStudent, getStudents, updateStudent } from '../actions';
import PaginatedTable from '../../common/pagination';

export class Students extends Component {
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
    this.props.getStudents()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  toggleModal2 = () => this.setState({ showModal2: !this.state.showModal2 });
  toggleModal3 = () => this.setState({ showModal3: !this.state.showModal3 });

  onNewStudent = () => {
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

  onEditStudent = (data) => {
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

  onSubmitStudent = (e) => {
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
      this.props.updateStudent(selected_patient.id, data);
    } else {
      this.props.addStudent(data)
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
    const { common: { GENDERS, ID_TYPES, KIN_RELATIONSHIPS, },
      records: { patients }
    } = this.props;

    const patient_details =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_patient ?
            <span><i className="fa fa-edit"></i> Edit Student Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Student</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitStudent}>
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
              onSubmit={this.onSubmitStudent}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal >


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
            <button className="btn btn-sm btn-success mr-2"
              onClick={() => this.onEditStudent(rowData)}><i className="fa fa-edit"></i> Edit</button>
            {rowData.is_booked ?
              <button className="btn btn-sm btn-secondary disabled mr-2"><i className="fa fa-user-md"></i> Booked</button> :
              <button className="btn btn-sm btn-primary mr-2"
                onClick={() => this.onNewAppointment(rowData)}><i className="fa fa-user-md"></i> Book</button>
            }
            {rowData.is_admitted ?
              <button className="btn btn-sm btn-secondary disabled mr-2"><i className="fa fa-bed"></i> Admitted</button> :
              <button className="btn btn-sm btn-danger mr-2"
                onClick={() => this.onNewAdmission(rowData)}><i className="fa fa-bed"></i> Admit</button>
            }
            <Link to={`/records/patients/${rowData.id}`}
              className="btn btn-sm btn-warning"><i className="fa fa-user"></i> View</Link>
          </>;
        }
      },
    ]

    return (
      <div className="col-md-10 mx-auto">
        {patient_details}
        <div className="card">
          <div className="card-header">
            <div>Students</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewStudent}>
              <i className="fa fa-plus-circle mr-2"></i> Add Student</button>
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
  hospital: state.hospital
});

export default connect(mapStateToProps, { getStudents, addStudent, updateStudent })(Students);
