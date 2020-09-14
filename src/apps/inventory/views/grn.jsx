import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrders } from '../actions'

export class GRN extends Component {
  state = {
  }

  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const { suppliers, products, orders } = this.props.inventory;

    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Supply History</div>
            <button
              className="btn btn-sm "><i className="fa fa-file-excel-o mr-2"></i> Export
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Created</th>
                  <th>Item</th>
                  <th>Supplier</th>
                  <th>Ordered</th>
                  <th>Supply Date</th>
                  <th>Supplied</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {orders.filter(req => req.is_supplied === true).map((order, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(order.created).toLocaleDateString('en-uk')}</td>
                    <td>{products.length > 0 ? products.find(product => product.id === order.product_id).name : ""}</td>
                    <td>{suppliers.length > 0 ? suppliers.find(supplier => supplier.id === order.supplier_id).name : ""}</td>
                    <td>{order.number_ordered}</td>
                    <td>{new Date(order.updated).toLocaleDateString('en-uk')}</td>
                    <td>{order.number_received}</td>
                    <td>{order.cost}</td>
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
}), { getOrders })(GRN)
