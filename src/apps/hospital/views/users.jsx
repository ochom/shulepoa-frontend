import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getUsers, addUser, updateUser, getGroups } from '../actions';

export class Users extends Component {
  state = {
    showModal: false,
    select_user: null,
    username: "",
    email: "",
    phone: "",
    group: ""
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getGroups()
  }


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewUser = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_user: null,
      username: "",
      email: "",
      phone: "",
      group: ""
    })
  }

  onEditUser = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_user: data,
      username: data.username,
      email: data.email,
      phone: data.phone,
      group: data.group
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      select_user,
      username,
      email,
      phone,

      group
    } = this.state;

    console.log(typeof group)

    const create_data = {
      username,
      email,
      phone,
      password: phone,
      group
    }

    const update_data = {
      username,
      email,
      phone,
      group
    }

    if (select_user) {
      this.props.updateUser(select_user.id, update_data);
    } else {
      this.props.addUser(create_data)
    }

    this.toggleModal()
  }

  render() {
    const users_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_user ?
            <span><i className="fa fa-edit"></i> Edit User Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register User</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12 my-2">
                <input className="form-control form-control-sm"
                  name="username" onChange={this.onChange} value={this.state.username}
                  required={true} />
                <label>Full name<sup>*</sup></label>
              </div>
              <div className="form-group col-12 my-2">
                <input type="email" className="form-control form-control-sm"
                  name="email" onChange={this.onChange} value={this.state.email}
                  required={true} />
                <label>Email<sup>*</sup></label>
              </div>
              <div className="form-group col-12 my-2">
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone}
                  required={true} />
                <label>Phone Nunber<sup>*</sup></label>
              </div>
              <div className="form-group col-12 my-2">
                <select className="form-control form-control-sm"
                  name="group" onChange={this.onChange} value={this.state.group}
                  required={true}>
                  <option value=""></option>
                  {this.props.groups.map((group, index) => <option value={group.id} key={index}>{group.name}</option>)}
                </select>
                <label>Role<sup>*</sup></label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <>
        {users_details}
        <div className="col-md-10 mx-auto mt-3">
          <div className="card">
            <div className="card-header">
              <div>Users</div>
              {this.props.rights.can_edit_user ?
                <button
                  className="btn btn-sm"
                  onClick={this.onNewUser}><i className="fa fa-plus-circle"></i>  Add User</button> : null}
            </div>
            <div className="card-body p-0">
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th></tr>
                </thead>
                <tbody>
                  {this.props.users.map((user, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.rights ? user.rights.name : ""}</td>
                      <td>{user.is_active ? "Active" : "Inactive"}</td>
                      <td>
                        {this.props.rights.can_edit_user ?
                          <>
                            <button className="btn btn-sm btn-success mr-2"
                              onClick={() => this.onEditUser(user)}>Edit</button>
                            {user.id !== this.props.auth.user.id ?
                              <button className="btn btn-sm btn-secondary"
                                onClick={() => this.props.updateUser(user.id, { is_active: !user.is_active })}>{user.is_active ? 'Deactivate' : 'Activate'}
                              </button>
                              : null
                            }
                          </> :
                          <button className="btn btn-sm btn-secondary disabled">No Action</button>
                        }
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
  auth: state.auth,
  users: state.hospital.users,
  groups: state.hospital.groups,
  common: state.common,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getGroups, getUsers, addUser, updateUser })(Users);