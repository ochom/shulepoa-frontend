import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getRequisitions, updateRequisition } from '../actions'

export class Requsitions extends Component {
  state = {
    showModal: false,
    selected_requisition: null,
    quantity_released: "",
  }

  componentDidMount() {
    this.props.getRequisitions()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onNewDispatch = (data) => {
    this.setState({
      selected_requisition: data,
      quantity_released: "",
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_requisition,
      quantity_released
    } = this.state
    const data = {
      quantity_released
    }
    this.props.updateRequisition(selected_requisition.id, data)
    this.toggleModal();
  }


  render() {
    const { requisitions } = this.props.inventory;
    const { selected_requisition } = this.state

    const requisition_modal_view = selected_requisition ?
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {'Dispatch items'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="product_id" readOnly={true}
                  value={selected_requisition.product_id.name} />
                <label>Item</label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="store_id" readOnly={true}
                  value={selected_requisition.store.name} />
                <label>Receiving Store</label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="quantity_required" readOnly={true}
                  value={selected_requisition.quantity_required} />
                <label>Requested Quantity</label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="quantity_released" required={true}
                  onChange={this.onChange} value={this.state.quantity_released} />
                <label>Dispatch Quantity <sup>*</sup></label>
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
      : null


    return (
      <div className="col-md-10 mx-auto mt-3">
        {requisition_modal_view}
        < div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Item Requisitions</div>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Requesting Store</th>
                  <th>Quantity</th>
                  <th>Required By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.filter(req => req.is_dispatched === false).map((requisition, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(requisition.created).toLocaleDateString('en-uk')}</td>
                    <td>{requisition.product.name}</td>
                    <td>{requisition.store.name}</td>
                    <td>{requisition.quantity_required}</td>
                    <td>{new Date(requisition.required_by).toLocaleDateString('en-uk')}</td>
                    <td>
                      {this.props.rights.can_edit_requisition ?
                        <button className="btn btn-sm btn-primary"
                          onClick={() => this.onNewDispatch(requisition)}><i className="fa fa-truck"></i> Dispatch</button>
                        : null}
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
  inventory: state.inventory,
  rights: state.auth.user.rights
}), { getRequisitions, updateRequisition })(Requsitions)
