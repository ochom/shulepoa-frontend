import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addBug, deleteBug, getBug, getBugs, updateBug } from './actions'
import { confirmAlert } from 'react-confirm-alert'


class Bugs extends Component {
  state = {
    modal: false,
    selected_bug: null,
    title: "",
    description: ""
  }

  componentDidMount() {
    this.props.getBugs()
  }

  toggleModal = () => this.setState({ modal: !this.state.modal })

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  newBug = () => this.setState({
    selected_bug: null,
    title: "",
    description: ""
  }, () => this.toggleModal())

  saveBug = (e) => {
    e.preventDefault()
    const {
      title,
      description
    } = this.state
    const data = {
      title,
      description
    }
    this.props.addBug(data)
    this.toggleModal()
  }


  onDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <div className="card">
              <div className="card-header">Delete</div>
              <div className="card-body">
                <p>You want to delete this file?</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-danger"
                  onClick={() => {
                    this.props.deleteBug(id);
                    onClose();
                  }}>Yes, Delete it!
                </button>
                <button className="btn btn-sm btn-secondary ml-2" onClick={onClose}>No</button>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const { users, bugs, auth } = this.props;
    const bug_modal =
      <Modal isOpen={this.state.modal}>
        <ModalHeader toggle={this.toggleModal}>
          Add new issue
        </ModalHeader>
        <form onSubmit={this.saveBug}>
          <ModalBody>
            <div className="row">
              <div className="form-group col-12">
                <label>Title</label>
                <input className="form-control" required={true} name="title"
                  value={this.state.title} onChange={this.onChange} />
              </div>
              <div className="form-group col-12">
                <label>Describe the issue</label>
                <textarea className="form-control" required={true} name="description"
                  value={this.state.description} onChange={this.onChange}
                  style={{ minHeight: "200px" }}></textarea>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-sm btn-primary" type="submit"
              onSubmit={this.saveBug}><i className="fa fa-check"></i> Add issue</button>
            <Button size="sm" color="secondary" onClick={this.toggleModal}><i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div>
        {bug_modal}
        <div className="col-md-10 mx-auto">
          <button className="btn btn-sm cu-bg-secondary"
            onClick={this.newBug}>Add new issue</button>
          <div className="list-group my-3 issues-list">
            {bugs.map((bug, index) =>
              <div key={index} className="list-group-item">
                <small className="time-posted">{new Date(bug.created).toLocaleDateString("en-us")}</small>
                <Link to={`issues/${bug.id}`} className="p-0 m-0">{bug.title}</Link><br />
                <small className="p-0 m-0">{(users && users.find(user => user.id === bug.created_by)) ? users.find(user => user.id === bug.created_by).username : ""}</small>
                {/* <small className="p-0 m-0">George, <i>Ombo Hospital</i></small> */}
                <p className="">{bug.description}</p>
                {bug.is_resolved ?
                  <button className="btn btn-sm btn-success mr-2 disabled">Resolved</button> :
                  <button className="btn btn-sm btn-warning mr-2 disabled">Resolved</button>
                }
                {(auth.user && auth.user.is_superuser) ? <button className="btn btn-sm btn-danger" onClick={() => this.onDelete(bug.id)}>delete</button> : null}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  auth: state.auth,
  users: state.hospital.users,
  bugs: state.bugs.bugs
}), { getBugs, addBug, getBug, updateBug, deleteBug })(Bugs)