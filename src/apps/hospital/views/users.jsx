import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getUsers, addUser, updateUser } from '../actions';

export class Users extends Component {
  state = {
    showModal: false,
    select_user: null,
    username: "",
    email: "",
    phone: "",

    user_level: 1
  }

  componentDidMount() {
    this.props.getUsers();
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

      user_level: 0
    })
  }

  onEditUser = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_user: data,
      username: data.username,
      email: data.email,
      phone: data.phone,

      user_level: data.is_admin ? 3 : data.is_senior ? 2 : data.is_junior ? 1 : 0
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      select_user,
      username,
      email,
      phone,

      user_level
    } = this.state;

    console.log(typeof user_level)

    const create_data = {
      username,
      email,
      phone,
      password: phone,
      is_admin: parseInt(user_level) === 3,
      is_senior: parseInt(user_level) === 2,
      is_junior: parseInt(user_level) === 1,
    }

    const update_data = {
      username,
      email,
      phone,
      is_admin: parseInt(user_level) === 3,
      is_senior: parseInt(user_level) === 2,
      is_junior: parseInt(user_level) === 1,
    }

    if (select_user) {
      this.props.updateUser(select_user.id, update_data);
    } else {
      this.props.addUser(create_data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
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
                  name="user_level" onChange={this.onChange} value={this.state.user_level}
                  required={true}>
                  <option value={1}>Junior staff</option>
                  <option value={2}>Senior staff</option>
                  <option value={3}>Administrator</option>
                </select>
                <label>User Level<sup>*</sup></label>
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
              <div>Manage Users</div>
              <button className="btn" onClick={this.onNewUser}>
                <i className="fa fa-plus-circle"></i> Add User</button>
            </div>
            <div className="card-body p-0">
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Level</th>
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
                      <td>{user.is_admin ? "Administrator" : user.is_senior ? "Senior staff" : user.is_junior ? "Junior staff" : "Client"}</td>
                      <td>{user.is_active ? "Active" : "Inactive"}</td>
                      <td>
                        <button className="btn btn-sm p-0 px-1 border-none btn-success"
                          onClick={() => this.onEditUser(user)}><i className="fa fa-edit"></i> Edit</button>
                        {user.id !== this.props.auth.user.id ?
                          <>
                            {' | '}
                            {user.is_active ?
                              <button className="btn btn-sm p-0 px-1 border-none btn-secondary"
                                onClick={() => this.props.updateUser(user.id, { is_active: false })}>Deactivate
                        </button> :
                              <button className="btn btn-sm p-0 px-1 border-none btn-primary"
                                onClick={() => this.props.updateUser(user.id, { is_active: true })}>Activate
                        </button>
                            }
                          </> : null
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
  common: state.common,
});

export default connect(mapStateToProps, { getUsers, addUser, updateUser })(Users);