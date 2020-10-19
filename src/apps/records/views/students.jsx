import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addStudent, getStudents, updateStudent } from '../actions';
import PaginatedTable from '../../common/pagination';

export class Students extends Component {
  state = {
    showModal: false,
    selected_student: null,
    level: "",
    classroom: "",
    name: "",
    reg_no: "",
    dob: "",
    sex: "",
    address: "",

    kin_name: "",
    kin_phone: "",
    kin_email: "",
    relationship: "",
    kin_id: "",
  }

  componentDidMount() {
    this.props.getStudents()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewStudent = () => {
    this.setState({
      selected_student: null,
      level: "",
      classroom: "",
      name: "",
      reg_no: "",
      dob: "",
      sex: "",
      address: "",

      kin_name: "",
      kin_phone: "",
      kin_email: "",
      relationship: "",
      kin_id: "",
    });
    this.toggleModal();
  }

  onEditStudent = (data) => {
    this.setState({
      selected_student: data,
      level: data.level,
      classroom: data.classroom,
      name: data.name,
      reg_no: data.reg_no,
      dob: data.dob,
      sex: data.sex,
      address: data.address,
      kin_name: data.kin_name,
      kin_phone: data.kin_phone,
      kin_email: data.kin_email,
      relationship: data.relationship,
      kin_id: data.kin_id,
    });
    this.toggleModal();
  }

  onSubmitStudent = (e) => {
    e.preventDefault();
    const {
      selected_student,
      level,
      classroom,
      name,
      reg_no,
      dob,
      sex,
      address,

      kin_name,
      kin_phone,
      kin_email,
      relationship,
      kin_id,
    } = this.state;

    const data = {
      level,
      classroom,
      name,
      reg_no,
      dob,
      sex,
      address,

      kin_name,
      kin_phone,
      kin_email,
      relationship,
      kin_id,
    }
    if (selected_student) {
      this.props.updateStudent(selected_student.id, data);
    } else {
      this.props.addStudent(data)
    }

    this.toggleModal();
  }

  render() {
    const { common: { GENDERS, KIN_RELATIONSHIPS, },
      records: { students },
      organization: { classes, classrooms }
    } = this.props;

    const student_details =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_student ?
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
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                />
                <label>Full name<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="reg_no" onChange={this.onChange} value={this.state.reg_no} required={true} />
                <label>REG. NO<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm" data-value={this.state.sex}
                  name="sex" onChange={this.onChange} value={this.state.sex} required={true}>
                  <option value=""></option>
                  {GENDERS.map((gender, index) => <option key={index} value={gender}>{gender}</option>)}
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
                <input className="form-control form-control-sm"
                  name="address" onChange={this.onChange} value={this.state.address} />
                <label>Home Address</label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm" data-value={this.state.level}
                  name="level" onChange={this.onChange} value={this.state.level} required={true}>
                  <option value=""></option>
                  {classes.map((cls, index) => <option key={index} value={cls.id}>{cls.name}</option>)}
                </select>
                <label>Academic Level<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm" data-value={this.state.classroom}
                  name="classroom" onChange={this.onChange} value={this.state.classroom} required={true}>
                  <option value=""></option>
                  {classrooms.map((clrm, index) => <option key={index} value={clrm.id}>{clrm.name}</option>)}
                </select>
                <label>Classroom<sup>*</sup></label>
              </div>
            </div>
            {/* NEXT OF KIN */}
            <div className="bg-secondary text-warning py-1 px-3 mb-2 rounded">Next of kin</div>
            <div className="row mx-auto">
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_name" onChange={this.onChange} value={this.state.kin_name} required={true}
                />
                <label>Name <small>(Full name)</small><sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_phone" onChange={this.onChange} value={this.state.kin_phone} required={true}
                />
                <label>Mobile<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_email" onChange={this.onChange} value={this.state.kin_email} required={true}
                />
                <label>Email<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <select className="form-control form-control-sm"
                  name="relationship" onChange={this.onChange} data-value={this.state.relationship}
                  value={this.state.relationship} required={true}>
                  <option value=""></option>
                  {KIN_RELATIONSHIPS.map((rel, index) => <option key={index} value={rel}>{rel}</option>)}
                </select>
                <label>Relationship<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <input className="form-control form-control-sm"
                  name="kin_id" onChange={this.onChange} value={this.state.kin_id}
                />
                <label>ID Number</label>
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
        title: 'Name',
        render: rowData => {
          return <span>{rowData.name}</span>;
        }
      },
      {
        title: 'REG No.',
        render: rowData => {
          return <span>{rowData.id}</span>;
        }
      },
      {
        title: 'Level',
        render: rowData => {
          return <span>{classes.length > 0 ? classes.find(cls => cls.id === rowData.level).name : ""}</span>;
        }
      },
      {
        title: 'Class',
        render: rowData => {
          return <span>{classrooms.length > 0 ? classrooms.find(room => room.id === rowData.classroom).name : ""}</span>;
        }
      },
      {
        title: 'Address',
        render: rowData => {
          return <span>{rowData.address}</span>;
        }
      },
      {
        title: 'Action',
        render: rowData => {
          return <>
            <button className="btn btn-sm btn-success mr-2"
              onClick={() => this.onEditStudent(rowData)}><i className="fa fa-edit"></i> Edit</button>
            <Link to={`/records/students/${rowData.id}`}
              className="btn btn-sm btn-warning"><i className="fa fa-user"></i> View profile</Link>
          </>;
        }
      },
    ]

    return (
      <div className="col-md-10 mx-auto">
        {student_details}
        <div className="card">
          <div className="card-header">
            <div>Students</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewStudent}>
              <i className="fa fa-plus-circle mr-2"></i> Add Student</button>
          </div>
          <div className="card-bodyp-0">
            <PaginatedTable cols={columns} rows={students} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  records: state.records,
  common: state.common,
  organization: state.organization
});

export default connect(mapStateToProps, { getStudents, addStudent, updateStudent })(Students);
