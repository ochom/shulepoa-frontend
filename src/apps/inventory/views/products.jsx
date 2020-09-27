import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import PaginatedTable from '../../common/pagination'
import {
  addProduct,
  addRequisition, deleteProduct, getProducts, updateProduct
} from '../actions'

export class Products extends Component {
  state = {
    showModal: false,
    selected_product: null,
    store_id: "",
    name: "",
    label: "",
    category_id: "",
    unit_id: "",
    price: "",
    startingInventory: "",
    minimumRequired: "",

    reqModal: false,
    product_id: "",
    quantity_required: "",
    required_by: "",
  }

  componentDidMount() {
    this.props.getProducts();
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onNewProduct = (data) => {
    this.setState({
      selected_product: null,
      store_id: "",
      name: "",
      label: "",
      category_id: "",
      unit_id: "",
      price: "",
      startingInventory: "",
      minimumRequired: "",
    })
    this.toggleModal();
  }

  onEditProduct = (data) => {
    this.setState({
      selected_product: data,
      store_id: data.store_id,
      name: data.name,
      label: data.label,
      category_id: data.category_id,
      unit_id: data.unit_id,
      price: data.price,
      startingInventory: data.startingInventory,
      minimumRequired: data.minimumRequired,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_product,
      store_id,
      name,
      label,
      category_id,
      unit_id,
      price,
      startingInventory,
      minimumRequired
    } = this.state

    const data = {
      store_id,
      name,
      label,
      category_id,
      unit_id,
      price,
      startingInventory,
      minimumRequired
    }
    if (selected_product) {
      this.props.updateProduct(selected_product.id, data)
    } else {
      this.props.addProduct(data)
    }
    this.toggleModal();
  }

  toggleReqModal = () => this.setState({ reqModal: !this.state.reqModal })

  onNewRequsition = (product) => this.setState({
    store_id: "",
    selected_product: product,
    quantity_required: "",
    required_by: "",
  }, () => this.toggleReqModal())

  onSubmitRequisition = (e) => {
    e.preventDefault()
    const {
      selected_product,
      store_id,
      quantity_required,
      required_by, } = this.state
    const data = {
      store_id,
      product_id: selected_product.id,
      quantity_required,
      required_by,
    }
    this.props.addRequisition(data)
    this.toggleReqModal()
  }

  render() {
    const { products, categories, stores, units } = this.props.inventory;
    const { selected_product } = this.state
    const product_modal_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {selected_product ? 'Edit Product Details' : 'Add New Product'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
                <label>Name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="label" required={true}
                  onChange={this.onChange} value={this.state.label} />
                <label>Label<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" name="category_id"
                  required={true} data-value={this.state.category_id}
                  onChange={this.onChange} value={this.state.category_id}>
                  <option value=""></option>
                  {categories.map((cat, index) =>
                    <option key={index} value={cat.id}>{cat.name}</option>)}
                </select>
                <label>Category<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" name="store_id" required={true}
                  onChange={this.onChange} value={this.state.store_id} data-value={this.state.store_id}>
                  <option value=""></option>
                  {stores.map((store, index) =>
                    <option key={index} value={store.id}>{store.name}</option>)}
                </select>
                <label>Store<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="price" required={true}
                  onChange={this.onChange} value={this.state.price} />
                <label>Cost<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <select className="form-control form-control-sm" name="unit_id" required={true}
                  onChange={this.onChange} value={this.state.unit_id} data-value={this.state.unit_id}>
                  <option value=""></option>
                  {units.map((unit, index) =>
                    <option key={index} value={unit.id}>{unit.abbr}</option>)}
                </select>
                <label>Units<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="startingInventory" required={true}
                  onChange={this.onChange} value={this.state.startingInventory} />
                <label>Start Inventory<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="minimumRequired" required={true}
                  onChange={this.onChange} value={this.state.minimumRequired} />
                <label>Minimum Required<sup>*</sup></label>
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

    const requisition_modal_view =
      <Modal isOpen={this.state.reqModal} size="md">
        <ModalHeader toggle={this.toggleReqModal}>
          {selected_product ? 'Edit Product Details' : 'Add New Product'}
        </ModalHeader>
        <form onSubmit={this.onSubmitRequisition}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm" name="name" readOnly={true}
                  value={selected_product ? selected_product.name : null} />
                <label>Product</label>
              </div>
              <div className="form-group col-12">
                <select className="form-control form-control-sm" name="store_id" required={true}
                  onChange={this.onChange} value={this.state.store_id} data-value={this.state.store_id}>
                  <option value=""></option>
                  {stores.map((store, index) =>
                    <option key={index} value={store.id}>{store.name}</option>)}
                </select>
                <label>Requesting Store<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm" name="quantity_required" required={true}
                  onChange={this.onChange} value={this.state.quantity_required} />
                <label>Quantity Required<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input type="text" className="form-control form-control-sm" name="required_by" required={true}
                  onChange={this.onChange} value={this.state.required_by}
                  onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value ? e.target.type = 'text' : 'date'} />
                <label>Required BY<sup>*</sup></label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmitRequisition}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleReqModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>
    const columns = [
      {
        title: "",
        render: rowData => {
          return <span>{rowData.name}</span>
        }
      },
      {
        title: "",
        render: rowData => {
          return <span>{rowData.label}</span>
        }
      },
      {
        title: "",
        render: rowData => {
          return <span>{rowData.category.name}</span>
        }
      },
      {
        title: "",
        render: rowData => {
          return <span>{rowData.store.name}</span>
        }
      },
      {
        title: "",
        render: rowData => {
          return <span>
            {rowData.inventoryOnHand}{' '}
            {rowData.units.abbr}
          </span>
        }
      },
      {
        title: "",
        render: rowData => {
          return <span>{rowData.price}</span>
        }
      },
      {
        title: "",
        render: rowData => {
          return <>
            {this.props.rights.can_edit_product ? <button className="btn btn-sm btn-success mr-2"
              onClick={() => this.onEditProduct(rowData)}><i className="fa fa-edit"></i> Edit</button> : null}
            {this.props.rights.can_add_requisition ?
              <button className="btn btn-sm btn-primary"
                onClick={() => this.onNewRequsition(rowData)}><i className="fa fa-plus"></i> Requisition</button>
              : null}
          </>
        }
      },
    ]
    return (
      <div className="col-md-10 mx-auto mt-3">
        {product_modal_view}
        {requisition_modal_view}
        <div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Product Management</div>
            {this.props.rights.can_add_product ?
              <button
                className="btn btn-sm "
                onClick={this.onNewProduct}><i className="fa fa-plus-circle mr-2"></i> Add Product
              </button> : null}
          </div>
          <div className="card-body p-0">
            <PaginatedTable cols={columns} rows={products} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  inventory: state.inventory,
  rights: state.auth.user.rights
}), {
  getProducts, addProduct, updateProduct, deleteProduct,
  addRequisition
})(Products)
