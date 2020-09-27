import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addStore, deleteStore, getStores, updateStore } from '../actions'
import Categories from './categories'
import Units from './units'

export class Stores extends Component {
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

  onNewStore = () => {
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
      name,
      description
    } = this.state
    const data = {
      name,
      description
    }
    if (selected_store) {
      this.props.updateStore(selected_store.id, data)
    } else {
      this.props.addStore(data)
    }
    this.toggleModal();
  }


  render() {
    const { stores } = this.props.inventory;
    const store_modal_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_store ? 'Edit Store Details' : 'Add new store'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-group">
              <input className="form-control form-control-sm" name="name" required={true}
                onChange={this.onChange} value={this.state.name} />
              <label>Name</label>
            </div>
            <div className="form-group">
              <textarea className="form-control form-control-sm" name="description" required={true}
                onChange={this.onChange} value={this.state.description}></textarea>
              <label>Description</label>
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
      <div className="row col-12 mx-auto">
        <div className="col-md-7 mt-3">
          {store_modal_view}
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2">Store Management</div>
              {this.props.rights.can_add_store ?
                <button
                  className="btn btn-sm "
                  onClick={this.onNewStore}><i className="fa fa-plus-circle mr-2"></i> Add Store
              </button> : null
              }
            </div>
            <div className="card-body p-0 pb-2">
              <table className="table table-sm table-striped table-bordered">
                <thead className="cu-text-primary">
                  <tr>
                    <th>#</th>
                    <th>Store name</th>
                    <th>Store Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{store.name}</td>
                      <td>{store.description}</td>
                      <td>
                        {this.props.rights.can_edit_store ?
                          <button className="btn btn-sm btn-success"
                            onClick={() => this.onEditStore(store)}><i className="fa fa-edit"></i> Edit</button> :
                          <button className="btn btn-sm btn-secondary disabled">No Action</button>}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Categories />
        <Units />
      </div>
    )
  }
}

export default connect(state => ({
  inventory: state.inventory,
  rights: state.auth.user.rights
}), { getStores, addStore, updateStore, deleteStore })(Stores)
