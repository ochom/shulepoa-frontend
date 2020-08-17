import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getOrders, addOrder, updateOrder } from '../actions'

export class PurchaseOrders extends Component {
  state = {
    searchModal: false,
    showModal: false,
    supplyModal: false,
    search: "",
    search_result: [],

    supplier_id: "",
    product_id: "",
    number_ordered: "",

    selected_order: null,
    number_received: "",
    batch_number: "",
    cost: ""
  }

  componentDidMount() {
    this.props.getOrders()
  }

  toggleSearchModal = () => this.setState({ searchModal: !this.state.searchModal });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onNewOrder = () => {
    this.setState({
      search: "",
      search_result: [],
      supplier_id: "",
      product_id: "",
      number_ordered: "",
    })
    this.toggleSearchModal();
  }

  onEditOrder = (product) => {
    this.setState({
      product_id: product.id,
    })
    this.toggleSearchModal();
    this.toggleModal();
  }

  onSearchItem = (e) => this.setState({
    search: e.target.value,
    search_result: this.props.inventory.products.filter(product => product.name.toLowerCase().includes((e.target.value).toLowerCase()))
  })

  onSubmit = (e) => {
    e.preventDefault();
    const {
      supplier_id,
      product_id,
      number_ordered,
    } = this.state

    const data = {
      supplier_id,
      product_id,
      number_ordered,
    }
    this.props.addOrder(data)
    this.toggleModal();
  }

  toggleSupplyModal = () => this.setState({ supplyModal: !this.state.supplyModal })

  onNewSupply = (order) => this.setState({
    selected_order: order,
    number_received: "",
    batch_number: "",
    cost: ""
  }, () => this.toggleSupplyModal())

  onSubmitSupply = (e) => {
    e.preventDefault()
    const {
      selected_order,
      number_received,
      batch_number,
      cost
    } = this.state
    const data = {
      number_received,
      batch_number,
      cost
    }
    this.props.updateOrder(selected_order.id, data)
    this.toggleSupplyModal()
  }

  render() {
    const { products, suppliers, orders } = this.props.inventory;

    const search_item_modal_view =
      <Modal isOpen={this.state.searchModal} size="md">
        <ModalHeader toggle={this.toggleSearchModal}>
          {'Dispatch items'}
        </ModalHeader>
        <ModalBody>
          <div className="col-12 mx-auto">
            <div className="form-group">
              <input className="form-control form-control-sm" name="search"
                value={this.state.search} onChange={this.onSearchItem} placeholder="Search item..." />
            </div>
            <table className="table table-sm table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>On Hand</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.search_result.map((res, index) =>
                  <tr key={index}>
                    <td>{res.name}</td>
                    <td>{res.inventoryOnHand}</td>
                    <td>
                      <button className="btn btn-sm btn-primary"
                        onClick={() => this.onEditOrder(res)}>Order now</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ModalBody >
        <ModalFooter>
          <Button color="danger" size="sm" onClick={this.toggleSearchModal}>
            <i className="fa fa-close"></i> Cancel</Button>
        </ModalFooter>
      </Modal >

    const order_modal_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {'Add item to orders'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <label>Item</label>
                <input className="form-control form-control-sm" name="product_id" readOnly={true}
                  value={(products && this.state.product_id) ? products.filter(pr => pr.id === this.state.product_id)[0].name : ""} onChange={this.onChange} />
              </div>
              <div className="form-group col-12">
                <label>Supplier</label>
                <select className="form-control form-control-sm" name="supplier_id" required={true}
                  value={this.state.supplier_id} onChange={this.onChange} >
                  <option value="">Select</option>
                  {suppliers.map((supplier, index) => <option key={index} value={supplier.id}>{supplier.name}</option>)}
                </select>
              </div>
              <div className="form-group col-12">
                <label>Order Quantity</label>
                <input className="form-control form-control-sm" name="number_ordered" required={true}
                  onChange={this.onChange} value={this.state.number_ordered} />
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

    const supply_goods_modal_view =
      <Modal isOpen={this.state.supplyModal} size="md">
        <ModalHeader toggle={this.toggleSupplyModal}>
          {'Add item to orders'}
        </ModalHeader>
        <form onSubmit={this.onSubmitSupply}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <label>Item</label>
                <input className="form-control form-control-sm" name="product_id" readOnly={true}
                  value={(products && this.state.selected_order) ? products.filter(pr => pr.id === this.state.selected_order.product_id)[0].name : ""} />
              </div>
              <div className="form-group col-12">
                <label>Supplier</label>
                <input className="form-control form-control-sm" name="supplier_id" readOnly={true}
                  value={(suppliers && this.state.selected_order) ? suppliers.filter(supplier => supplier.id === this.state.selected_order.supplier_id)[0].name : ""} />
              </div>
              <div className="form-group col-6">
                <label>Order Quantity</label>
                <input className="form-control form-control-sm" name="number_ordered" readOnly={true}
                  value={this.state.selected_order ? this.state.selected_order.number_ordered : ""} />
              </div>
              <div className="form-group col-6">
                <label>Supply Quantity</label>
                <input className="form-control form-control-sm" name="number_received" required={true}
                  onChange={this.onChange} value={this.state.number_received} />
              </div>
              <div className="form-group col-8">
                <label>Batch No_<sup>*</sup> </label>
                <input className="form-control form-control-sm" name="batch_number" required={true}
                  onChange={this.onChange} value={this.state.batch_number} />
              </div>
              <div className="form-group col-4">
                <label>Cost<sup>*</sup> </label>
                <input className="form-control form-control-sm" name="cost" required={true}
                  onChange={this.onChange} value={this.state.cost} />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmitSupply}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleSupplyModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-md-10 mx-auto mt-3">
        {search_item_modal_view}
        {order_modal_view}
        {supply_goods_modal_view}
        <div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Active Purchase Orders</div>
            <button
              className="btn btn-sm "
              onClick={this.onNewOrder}><i className="fa fa-plus-circle mr-2"></i> Create purchase order
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Supplier</th>
                  <th>Order Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.filter(req => req.is_supplied === false).map((order, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(order.created).toLocaleDateString('en-uk')}</td>
                    <td>{products.length > 0 ? products.filter(product => product.id === order.product_id)[0].name : ""}</td>
                    <td>{suppliers.length > 0 ? suppliers.filter(supplier => supplier.id === order.supplier_id)[0].name : ""}</td>
                    <td>{order.number_ordered}</td>
                    <td>
                      <button className="btn btn-sm rounded btn-primary" onClick={() => this.onNewSupply(order)}>Receive Goods</button>
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
}), { getOrders, addOrder, updateOrder })(PurchaseOrders)
