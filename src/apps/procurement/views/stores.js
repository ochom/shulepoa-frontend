import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getStores, addStore, updateStore, deleteStore } from '../actions'

export class CashPoint extends Component {
  state = {
    showModal: false,
    selected_store: null,
    name: "",
    description: "",
  }

  componentDidMount() {
    this.props.getStores();
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onNewStore = (data) => {
    this.setState({
      selected_store: null,
      name: "",
      description: "",
    })
    this.toggleModal();
  }

  onEditStore = (data) => {
    this.setState({
      selected_store: data,
      name: data.name,
      description: data.description,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_store,
      name, description
    } = this.state
    const data = {
      name, description
    }
    if (selected_store) {
      this.props.updateStore(selected_store.id, data)
    } else {
      this.props.addStore(data)
    }
    this.toggleModal();
  }


  render() {
    const { stores } = this.props.procurement;
    const store_modal_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_store ? 'Edit Store Details' : 'Add new store'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control form-control-sm" name="name" required={true}
                onChange={this.onChange} value={this.state.name} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control form-control-sm" name="description" required={true}
                onChange={this.onChange} value={this.state.description} ></textarea>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-md-12 mx-auto mt-3">
        {store_modal_view}
        <div className="card card-header bg-white py-1 px-3">
          <div
            style={{ fontSize: "1vw", width: "300px", float: "left" }}
            className="py-1 px-2">
            <Link to="/stores">stores</Link> &nbsp;
              <i className="fa fa-angle-right"></i> &nbsp;
              <Link to="/stores/cashpoint">Cashpoint</Link> &nbsp;
              <i className="fa fa-angle-right"></i> &nbsp;
              <Link to="/stores/cashpoint/Store-store">Store store</Link>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header custom-bg-secondary py-1 px-3">
            <div
              style={{ fontSize: "1vw", float: "left" }} className="py-1 px-2">Store Management</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm bg-light text-dark py-0 px-2 mr-auto mt-1"
              onClick={this.onNewStore}><i className="fa fa-plus-circle mr-2"></i> Add Store
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="custom-text-primary">
                <tr>
                  <th>#</th>
                  <th>Store name</th>
                  <th>Store Description</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{store.name}</td>
                    <td>{store.description}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditStore(store)}><i className="fa fa-edit"></i> Edit</button></td>
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
  procurement: state.procurement,
}), { getStores, addStore, updateStore, deleteStore })(CashPoint)
