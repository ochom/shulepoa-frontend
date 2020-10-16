import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addClassroom, getClassrooms, updateClassroom } from '../actions';

export class Classrooms extends Component {
  state = {
    showModal: false,
    selected_classroom: null,
    name: "",
    description: "",
  }

  componentDidMount() {
    this.props.getClassrooms()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewClassroom = () => {
    this.setState({
      selected_classroom: null,
      name: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditClassroom = (classroom) => {
    this.setState({
      selected_classroom: classroom,
      name: classroom.name,
      description: classroom.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_classroom,
      name,
      description
    } = this.state;
    const data = {
      selected_classroom,
      name,
      description
    }
    if (selected_classroom) {
      this.props.updateClassroom(selected_classroom.id, data);
    } else {
      this.props.addClassroom(data);
    }
    this.toggleModal();
  }

  render() {
    const { organization: { classrooms } } = this.props;

    const classroom_details_view =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_classroom ?
            <span><i className="fa fa-edit"></i> Update Classroom</span> :
            <span><i className="fa fa-plus-circle"></i> Reister Classroom</span>}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Classroom Name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="description"
                  onChange={this.onChange} value={this.state.description}></textarea>
                <label>Description</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div className="col-md-8 mx-auto mt-3">
        {classroom_details_view}
        <div className="card">
          <div className="card-header">
            <div>Classrooms</div>
            {this.props.rights.can_add_classroom ?
              <button
                className="btn btn-sm"
                onClick={this.onNewClassroom}><i className="fa fa-plus-circle"></i>  Add Classroom
              </button> :
              null}
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-bordered">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((classroom, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{classroom.name}</td>
                    <td>{classroom.description}</td>
                    <td className="text-center">
                      {this.props.rights.can_edit_classroom ?
                        <button className="btn btn-sm btn-success mr-2"
                          onClick={() => this.onEditClassroom(classroom)}><i className="fa fa-edit"></i> Edit</button>
                        : <button className="btn btn-sm btn-secondary"> No Action</button>
                      }
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

export default connect(state => ({
  organization: state.organization,
  rights: state.auth.user.rights
}), { getClassrooms, addClassroom, updateClassroom })(Classrooms)