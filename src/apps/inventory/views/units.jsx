import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addUnit, deleteUnit, getUnits, updateUnit } from '../actions'

export class Units extends Component {
  state = {
    showModal: false,
    selected_unit: null,
    abbr: "",
    desc: "",
  }

  componentDidMount() {
    this.props.getUnits();
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onNewUnit = (data) => {
    this.setState({
      selected_unit: null,
      abbr: "",
      desc: "",
    })
    this.toggleModal();
  }

  onEditUnit = (data) => {
    this.setState({
      selected_unit: data,
      abbr: data.abbr,
      desc: data.desc,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_unit,
      abbr, desc
    } = this.state
    const data = {
      abbr, desc
    }
    if (selected_unit) {
      this.props.updateUnit(selected_unit.id, data)
    } else {
      this.props.addUnit(data)
    }
    this.toggleModal();
  }


  render() {
    const { units } = this.props.inventory;
    const unit_modal_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_unit ? 'Edit Unit Details' : 'Add new unit'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-group">
              <input className="form-control form-control-sm" name="abbr" required={true}
                onChange={this.onChange} value={this.state.abbr} />
              <label>Abbr.</label>
            </div>
            <div className="form-group">
              <input className="form-control form-control-sm" name="desc" required={true}
                onChange={this.onChange} value={this.state.desc} />
              <label>Label</label>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-5 mt-3">
        {unit_modal_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Measurement units</div>
            <button
              className="btn btn-sm "
              onClick={this.onNewUnit}><i className="fa fa-plus-circle mr-2"></i> Add Unit
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Abbr.</th>
                  <th>Label</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{unit.abbr}</td>
                    <td>{unit.desc}</td>
                    <td>
                      <button className="btn btn-sm btn-success"
                        onClick={() => this.onEditUnit(unit)}><i className="fa fa-edit"></i> Edit</button></td>
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
  inventory: state.inventory,
}), { getUnits, addUnit, updateUnit, deleteUnit })(Units)
