import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import {
  addProduct, deleteProduct, getProducts, updateProduct,
  addRequisition,
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
                <label>Name<sup>*</sup></label>
                <input className="form-control form-control-sm" name="name" required={true}
                  onChange={this.onChange} value={this.state.name} />
              </div>
              <div className="form-group col-12">
                <label>Label<sup>*</sup></label>
                <input className="form-control form-control-sm" name="label" required={true}
                  onChange={this.onChange} value={this.state.label} />
              </div>
              <div className="form-group col-12">
                <label>Category<sup>*</sup></label>
                <select className="form-control form-control-sm" name="category_id" required={true}
                  onChange={this.onChange} value={this.state.category_id} >
                  <option value="">Select</option>
                  {categories.map((cat, index) =>
                    <option key={index} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="form-group col-12">
                <label>Store<sup>*</sup></label>
                <select className="form-control form-control-sm" name="store_id" required={true}
                  onChange={this.onChange} value={this.state.store_id} >
                  <option value="">Select</option>
                  {stores.map((store, index) =>
                    <option key={index} value={store.id}>{store.name}</option>)}
                </select>
              </div>
              <div className="form-group col-6">
                <label>Price<sup>*</sup></label>
                <input className="form-control form-control-sm" name="price" required={true}
                  onChange={this.onChange} value={this.state.price} />
              </div>
              <div className="form-group col-6">
                <label>Units<sup>*</sup></label>
                <select className="form-control form-control-sm" name="unit_id" required={true}
                  onChange={this.onChange} value={this.state.unit_id} >
                  <option value="">Select</option>
                  {units.map((unit, index) =>
                    <option key={index} value={unit.id}>{unit.abbr}</option>)}
                </select>
              </div>
              <div className="form-group col-6">
                <label>Start Inventory<sup>*</sup></label>
                <input className="form-control form-control-sm" name="startingInventory" required={true}
                  onChange={this.onChange} value={this.state.startingInventory} />
              </div>
              <div className="form-group col-6">
                <label>Minimum Required<sup>*</sup></label>
                <input className="form-control form-control-sm" name="minimumRequired" required={true}
                  onChange={this.onChange} value={this.state.minimumRequired} />
              </div>
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


    const requisition_modal_view =
      <Modal isOpen={this.state.reqModal} size="md">
        <ModalHeader toggle={this.toggleReqModal}>
          {selected_product ? 'Edit Product Details' : 'Add New Product'}
        </ModalHeader>
        <form onSubmit={this.onSubmitRequisition}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <label>Product</label>
                <input className="form-control form-control-sm" name="name" readOnly={true}
                  value={selected_product ? selected_product.name : null} />
              </div>
              <div className="form-group col-12">
                <label>Requesting Store<sup>*</sup></label>
                <select className="form-control form-control-sm" name="store_id" required={true}
                  onChange={this.onChange} value={this.state.store_id} >
                  <option value="">Select</option>
                  {stores.map((store, index) =>
                    <option key={index} value={store.id}>{store.name}</option>)}
                </select>
              </div>
              <div className="form-group col-6">
                <label>Quantity Required<sup>*</sup></label>
                <input className="form-control form-control-sm" name="quantity_required" required={true}
                  onChange={this.onChange} value={this.state.quantity_required} />
              </div>
              <div className="form-group col-6">
                <label>Required BY<sup>*</sup></label>
                <input type="date" className="form-control form-control-sm" name="required_by" required={true}
                  onChange={this.onChange} value={this.state.required_by} />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmitRequisition}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleReqModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-md-10 mx-auto mt-3">
        {product_modal_view}
        {requisition_modal_view}
        <div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Product Management</div>
            <button
              className="btn btn-sm "
              onClick={this.onNewProduct}><i className="fa fa-plus-circle mr-2"></i> Add Product
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Label</th>
                  <th>Category</th>
                  <th>Store</th>
                  <th>In Store</th>
                  <th>Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.label}</td>
                    <td>
                      {categories.length > 0 ? categories.find(cat => cat.id === product.category_id).name : ""}
                    </td>
                    <td>
                      {stores.length > 0 ? stores.find(store => store.id === product.store_id).name : ""}
                    </td>
                    <td>
                      {product.inventoryOnHand}{' '}
                      {units.length > 0 ? units.find(unit => unit.id === product.unit_id).abbr : ""}
                    </td>
                    <td>{product.price}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditProduct(product)}><i className="fa fa-edit"></i> Edit</button> {` | `}
                      <button className="btn btn-sm p-0 border-none text-primary"
                        onClick={() => this.onNewRequsition(product)}><i className="fa fa-plus"></i> Requisition</button>
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
}), {
  getProducts, addProduct, updateProduct, deleteProduct,
  addRequisition
})(Products)
