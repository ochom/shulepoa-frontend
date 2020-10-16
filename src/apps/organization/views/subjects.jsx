import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addSubject, getSubjects, updateSubject } from '../actions';

export class Subjects extends Component {
  state = {
    showModal: false,
    selected_subject: null,
    name: "",
    description: "",
  }

  componentDidMount() {
    this.props.getSubjects()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewSubject = () => {
    this.setState({
      selected_subject: null,
      name: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditSubject = (subject) => {
    this.setState({
      selected_subject: subject,
      name: subject.name,
      description: subject.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_subject,
      name,
      description
    } = this.state;
    const data = {
      selected_subject,
      name,
      description
    }
    if (selected_subject) {
      this.props.updateSubject(selected_subject.id, data);
    } else {
      this.props.addSubject(data);
    }
    this.toggleModal();
  }

  render() {
    const { organization: { subjects } } = this.props;

    const subject_details_view =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_subject ?
            <span><i className="fa fa-edit"></i> Update Subject</span> :
            <span><i className="fa fa-plus-circle"></i> Reister Subject</span>}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Subject Name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="description"
                  onChange={this.onChange} value={this.state.description}></input>
                <label>Abbreviation</label>
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
        {subject_details_view}
        <div className="card">
          <div className="card-header">
            <div>Subjects</div>
            {this.props.rights.can_add_subject ?
              <button
                className="btn btn-sm"
                onClick={this.onNewSubject}><i className="fa fa-plus-circle"></i>  Add Subject
              </button> :
              null}
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-bordered">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Abbr.</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{subject.name}</td>
                    <td>{subject.description}</td>
                    <td className="text-center">
                      {this.props.rights.can_edit_subject ?
                        <button className="btn btn-sm btn-success mr-2"
                          onClick={() => this.onEditSubject(subject)}><i className="fa fa-edit"></i> Edit</button>
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
}), { getSubjects, addSubject, updateSubject })(Subjects)