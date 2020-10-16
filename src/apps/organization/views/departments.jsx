import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addDepartment, getDepartments, updateDepartment } from '../actions';

export class Departments extends Component {
  state = {
    showModal: false,
    selected_department: null,
    name: "",
    description: "",
  }

  componentDidMount() {
    this.props.getDepartments()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewDepartment = () => {
    this.setState({
      selected_department: null,
      name: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditDepartment = (department) => {
    this.setState({
      selected_department: department,
      name: department.name,
      description: department.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_department,
      name,
      description
    } = this.state;
    const data = {
      selected_department,
      name,
      description
    }
    if (selected_department) {
      this.props.updateDepartment(selected_department.id, data);
    } else {
      this.props.addDepartment(data);
    }
    this.toggleModal();
  }

  render() {
    const { organization: { departments } } = this.props;

    const department_details_view =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_department ?
            <span><i className="fa fa-edit"></i> Update Department</span> :
            <span><i className="fa fa-plus-circle"></i> Reister Department</span>}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Department Name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" name="description"
                  data-value={this.state.description} onChange={this.onChange}
                  value={this.state.description}>
                  <option value=""></option>
                  <option value="Academic">Academic</option>
                  <option value="Others">Others</option>
                </select>
                <label>Department Type</label>
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
        {department_details_view}
        <div className="card">
          <div className="card-header">
            <div>Departments</div>
            {this.props.rights.can_add_department ?
              <button
                className="btn btn-sm"
                onClick={this.onNewDepartment}><i className="fa fa-plus-circle"></i>  Add Department
              </button> :
              null}
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-bordered">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{department.name}</td>
                    <td>{department.description}</td>
                    <td className="text-center">
                      {this.props.rights.can_edit_department ?
                        <button className="btn btn-sm btn-success mr-2"
                          onClick={() => this.onEditDepartment(department)}><i className="fa fa-edit"></i> Edit</button>
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
}), { getDepartments, addDepartment, updateDepartment })(Departments)