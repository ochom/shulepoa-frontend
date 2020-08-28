import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getUsers, updateUser } from '../actions';

export class Users extends Component {
  state = {
    users_search_name: "",
    users_search_phone: "",
    showModal: false,
    select_users: null,


    company_name: "",
    company_email: "",
    company_phone: "",
    is_primary: 0,

  }

  componentDidMount() {
    this.props.getUsers();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleCheck = (e) => {
    this.setState({ [e.target.name]: e.target.checked ? 1 : 0 })
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewUser = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_users: null,
      company_name: "",
      company_email: "",
      company_phone: "",
      is_primary: 0,
    })
  }

  onEditUser = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_users: data,
      company_name: data.company_name,
      company_email: data.company_email,
      company_phone: data.company_phone,
      is_primary: data.is_primary,
    })
  }

  onSubmitUser = (e) => {
    e.preventDefault();
    const {
      select_users,
      company_name,
      company_email,
      company_phone,
      is_primary
    } = this.state;

    const data = {
      company_name,
      company_email,
      company_phone,
      is_primary
    }
    if (select_users) {
      this.props.updateUser(select_users.id, data);
    } else {
      this.props.addUser(data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  onsearchUser = () => {
    const data = {
      "company_name": this.state.users_search_name,
      "company_phone": this.state.users_search_phone,
    }
    this.props.searchUser(data);
  }

  render() {
    const users_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_users ?
            <span><i className="fa fa-edit"></i> Edit User Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register User</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitUser}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Company name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="company_name" onChange={this.onChange} value={this.state.company_name} required={true}
                  placeholder="Company full name" />
              </div>
              <div className="form-group col-12">
                <label>Email Address<sup>*</sup></label>
                <input type="email" className="form-control form-control-sm"
                  name="company_email" onChange={this.onChange} value={this.state.company_email} required={true}
                  placeholder="Email Address" />
              </div>
              <div className="form-group col-12">
                <label>Phone Nunber<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="company_phone" onChange={this.onChange} value={this.state.company_phone} required={true}
                  placeholder="Contact phone number" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitUser}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    return (
      <div className="col-md-10 mx-auto mt-3">
        {users_details}
        <div className="my-2">
          <input className="form-control"
            onChange={this.onChange} placeholder="Search..." />
        </div>
        <div className="card mt-2">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Manage system Users</div>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Recent users | Search results</i></caption>
              <thead className="">
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Mobile</td>
                  <td>Group</td>
                  <td>Status</td>
                  <td className="text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {this.props.users.map((user, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.user_profile ? user.user_profile.fullname : user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone ? user.phone : "---"}</td>
                    <td>{user.is_admin ? "Admin" : "Normal user"}</td>
                    <td>{user.is_active ? "Active" : "Deactivated"}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={null}><i className="fa fa-edit"></i> Edit</button>
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
  users: state.hospital.users,
  common: state.common,
});

export default connect(mapStateToProps, { getUsers, updateUser })(Users);
