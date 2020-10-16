import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addClass, getClasses, updateClass } from '../actions';

export class Classes extends Component {
  state = {
    showModal: false,
    selected_class: null,
    name: "",
    description: "",
  }

  componentDidMount() {
    this.props.getClasses()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewClass = () => {
    this.setState({
      selected_class: null,
      name: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditClass = (clas) => {
    this.setState({
      selected_class: clas,
      name: clas.name,
      description: clas.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_class,
      name,
      description
    } = this.state;
    const data = {
      selected_class,
      name,
      description
    }
    if (selected_class) {
      this.props.updateClass(selected_class.id, data);
    } else {
      this.props.addClass(data);
    }
    this.toggleModal();
  }

  render() {
    const { organization: { classes } } = this.props;

    const department_details_view =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_class ?
            <span><i className="fa fa-edit"></i> Update Academic Stage</span> :
            <span><i className="fa fa-plus-circle"></i> Reister Academic Stage</span>}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Academic Stage<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" name="description"
                  data-value={this.state.description} onChange={this.onChange}
                  value={this.state.description}>
                  <option value=""></option>
                  <option value="PREP">PREP</option>
                  <option value="Primary">Primary</option>
                  <option value="High school">High school</option>
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
            <div>Academic Stages</div>
            {this.props.rights.can_add_class ?
              <button
                className="btn btn-sm"
                onClick={this.onNewClass}><i className="fa fa-plus-circle"></i> Add Academic Stage
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
                {classes.map((clas, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{clas.name}</td>
                    <td>{clas.description}</td>
                    <td className="text-center">
                      {this.props.rights.can_edit_class ?
                        <button className="btn btn-sm btn-success mr-2"
                          onClick={() => this.onEditClass(clas)}><i className="fa fa-edit"></i> Edit</button>
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
}), { getClasses, addClass, updateClass })(Classes)