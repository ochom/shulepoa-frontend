import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addExam, getExams, updateExam } from '../actions';

export class Exams extends Component {
  state = {
    showModal: false,
    selected_exam: null,
    name: "",
    description: "",
  }

  componentDidMount() {
    this.props.getExams()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewExam = () => {
    this.setState({
      selected_exam: null,
      name: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditExam = (exam) => {
    this.setState({
      selected_exam: exam,
      name: exam.name,
      description: exam.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_exam,
      name,
      description
    } = this.state;
    const data = {
      selected_exam,
      name,
      description
    }
    if (selected_exam) {
      this.props.updateExam(selected_exam.id, data);
    } else {
      this.props.addExam(data);
    }
    this.toggleModal();
  }

  render() {
    const { academics: { exams } } = this.props;

    const exam_details_view =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_exam ?
            <span><i className="fa fa-edit"></i> Update Exam</span> :
            <span><i className="fa fa-plus-circle"></i> Reister Exam</span>}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Exam Title<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" name="description" required={true}
                  onChange={this.onChange} value={this.state.description} data-value={this.state.description}>
                  <option value=""></option>
                  <option value="0">Average of CATs</option>
                  <option value="1">Sum of CATs</option>
                  <option value="2">Main plus average of CATs</option>
                </select>
                <label>Summary Type<sup>*</sup></label>
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
        {exam_details_view}
        <div className="card">
          <div className="card-header">
            <div>Exams</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewExam}><i className="fa fa-plus-circle"></i>  Add Exam
              </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-bordered">
              <thead className="">
                <tr>
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Analysis</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exam.name}</td>
                    <td>{exam.description}</td>
                    <td className="text-center">
                      {this.props.rights.can_edit_exam ?
                        <button className="btn btn-sm btn-success mr-2"
                          onClick={() => this.onEditExam(exam)}><i className="fa fa-edit"></i> Edit</button>
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
  academics: state.academics,
  rights: state.auth.user.rights
}), { getExams, addExam, updateExam })(Exams)