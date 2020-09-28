import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addBug, deleteBug, getBug, getBugs, updateBug } from './actions'
import moment from 'moment'


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
  
  getTime = (date) => {
    return moment(date).fromNow();
  }

  render() {
    const { bugs, } = this.props;
    const bug_modal =
      <Modal isOpen={this.state.modal}>
        <ModalHeader toggle={this.toggleModal}>
          Add new issue
        </ModalHeader>
        <form onSubmit={this.saveBug}>
          <ModalBody>
            <div className="row">
              <div className="form-group col-12">
                <input className="form-control" required={true} name="title"
                  value={this.state.title} onChange={this.onChange} />
                <label>Title</label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control" required={true} name="description"
                  value={this.state.description} onChange={this.onChange}
                  style={{ minHeight: "200px" }}></textarea>
                <label>Describe the issue</label>
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
        <div className="col-md-8 mx-auto">
          <button className="btn btn-sm cu-bg-secondary"
            onClick={this.newBug}>Add new issue</button>
          <div className="list-group my-3 issues-list">
            <div className="list-group">
              {bugs.map((bug, index) =>
                <Link to={`issues/${bug.id}`}
                  key={index}
                  className="list-group-item border list-group-item-action flex-column align-items-start">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{bug.title}</h5>
                    <small>{this.getTime(new Date(bug.created))}</small>
                  </div>
                  <p className="mb-1">{bug.description}</p>
                  <small>
                    {bug.is_resolved ?
                      <span className="status-resolved">Resolved</span> :
                      <span className="status-open">Active</span>
                    }
                  </small>
                  <small>{bug.creator.username}</small>
                  <small>{bug.replies.length} Replies</small>
                </Link>
              )}
            </div>
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