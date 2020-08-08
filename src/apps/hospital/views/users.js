import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { loadUsers, searchUser, updateUser } from '../actions';

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
    this.props.loadUsers();
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

              <div className="form-check col-12 pl-5 ">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"
                  name="is_primary" onChange={this.toggleCheck} checked={this.state.is_primary} />
                <label className="form-check-label custom-text-secondary py-1" htmlFor="exampleCheck1">This is the hospital's primary users</label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-primary"
              onSubmit={this.onSubmitUser}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    const users_filter_list = this.props.users_list.map((user, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.user_profile ? user.user_profile.fullname : user.username}</td>
        <td>{user.email}</td>
        <td>{user.user_profile ? user.user_profile.phone : "---"}</td>
        <td>{user.is_admin ? "Yes" : "No"}</td>
        <td>{user.is_staff ? "Yes" : "No"}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onEditUser(user)}><i className="fa fa-edit"></i> Edit</button>
        </td>
      </tr>
    )
    return (
      <>
        {users_details}
        <div className="row col-md-10 mx-auto mt-3">
          <div className="card col-12 p-0 mt-2">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-globe"></i> manage Users</div>
            </div>
            <div className="card-body p-0 pb-2">
              <div className="row col-12 mx-auto mt-3">
                <div className="form-group  col-3">
                  <label>User name</label>
                  <input className="form-control form-control-sm"
                    name="users_search_name"
                    value={this.state.users_search_name}
                    onChange={this.onChange}
                    placeholder="Enter name" />
                </div>
                <div className="form-group  col-3">
                  <label>Phone number</label>
                  <input className="form-control form-control-sm"
                    name="users_search_phone"
                    value={this.state.users_search_phone}
                    onChange={this.onChange}
                    placeholder="Enter phone number" />
                </div>
              </div>
              <div className="row col-12 mx-auto">
                <button
                  className="btn btn-sm btn-outline-success cu-text-primary ml-4"
                  onClick={this.onsearchUser}
                  disabled={this.props.common.isProcessing}><i className="fa fa-search mr-2"></i> Find User</button>
              </div>
            </div>
          </div>

          <div className="card card-body mt-4 p-0">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Recent users | Search results</i></caption>
              <thead className="cu-bg-secondary">
                <tr><th>#</th><th>Name</th>
                  <th>Email</th><th>Mobile</th>
                  <th>IS ADMIN</th><th>IS STAFF</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users_filter_list}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  users_list: state.hospital.users_list,
  common: state.common,
});

export default connect(mapStateToProps, { loadUsers, searchUser, updateUser })(Users);
