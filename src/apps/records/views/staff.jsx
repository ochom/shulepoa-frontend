import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PaginatedTable from '../../common/pagination';
import { addStaff, getStaffs, updateStaff } from '../actions';

export class Staffs extends Component {
  state = {
    showModal: false,
    selected_staff: null,
    name: "",
    phone: "",
    email: "",
    idno: "",
    sex: "",
    address: "",
  }

  componentDidMount() {
    this.props.getStaffs()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewStaff = () => {
    this.setState({
      selected_staff: null,
      name: "",
      phone: "",
      email: "",
      idno: "",
      sex: "",
      address: "",
    });
    this.toggleModal();
  }

  onEditStaff = (data) => {
    this.setState({
      selected_staff: data,
      name: data.name,
      phone: data.phone,
      idno: data.idno,
      email: data.email,
      sex: data.sex,
      address: data.address,
    });
    this.toggleModal();
  }

  onSubmitStaff = (e) => {
    e.preventDefault();
    const {
      selected_staff,
      name,
      phone,
      email,
      idno,
      sex,
      address,
    } = this.state;

    const data = {
      name,
      phone,
      email,
      idno,
      sex,
      address,
    }
    if (selected_staff) {
      this.props.updateStaff(selected_staff.id, data);
    } else {
      this.props.addStaff(data)
    }

    this.toggleModal();
  }

  render() {
    const { common: { GENDERS },
      records: { staffs },
    } = this.props;

    const staff_details =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_staff ?
            <span><i className="fa fa-edit"></i> Edit Staff Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Staff</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitStaff}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-sm-12">
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                />
                <label>Name <small>(Full name)</small><sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12">
                <select className="form-control form-control-sm" data-value={this.state.sex}
                  name="sex" onChange={this.onChange} value={this.state.sex} required={true}>
                  <option value=""></option>
                  {GENDERS.map((gender, index) => <option key={index} value={gender}>{gender}</option>)}
                </select>
                <label>Sex<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12">
                <input className="form-control form-control-sm"
                  name="address" onChange={this.onChange} value={this.state.address} />
                <label>Home Address</label>
              </div>
              <div className="form-group col-sm-12">
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone} required={true}
                />
                <label>Mobile<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12">
                <input className="form-control form-control-sm"
                  name="email" onChange={this.onChange} value={this.state.email} required={true}
                />
                <label>Email<sup>*</sup></label>
              </div>
              <div className="form-group col-sm-12">
                <input className="form-control form-control-sm"
                  name="idno" onChange={this.onChange} value={this.state.idno}
                />
                <label>ID Number</label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmitStaff}>
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
        title: 'Sex',
        render: rowData => {
          return <span>{rowData.sex}</span>;
        }
      },
      {
        title: 'ID No.',
        render: rowData => {
          return <span>{rowData.idno}</span>;
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
          return <span>{rowData.address}</span>;
        }
      },
      {
        title: 'Action',
        render: rowData => {
          return <>
            <button className="btn btn-sm btn-success mr-2"
              onClick={() => this.onEditStaff(rowData)}><i className="fa fa-edit"></i> Edit</button>
            <Link to={`/records/staffs/${rowData.id}`}
              className="btn btn-sm btn-warning"><i className="fa fa-user"></i> View profile</Link>
          </>;
        }
      },
    ]

    return (
      <div className="col-md-10 mx-auto">
        {staff_details}
        <div className="card">
          <div className="card-header">
            <div>Staffs</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewStaff}>
              <i className="fa fa-plus-circle mr-2"></i> Add Staff</button>
          </div>
          <div className="card-bodyp-0">
            <PaginatedTable cols={columns} rows={staffs} />
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

export default connect(mapStateToProps, { getStaffs, addStaff, updateStaff })(Staffs);
