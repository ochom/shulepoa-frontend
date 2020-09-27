import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRequisitions } from '../actions'
import ReactHTMLTableToExcel from '../../common/actions'

export class Dispatches extends Component {
  state = {
  }

  componentDidMount() {
    this.props.getRequisitions()
  }

  render() {
    const { stores, products, requisitions } = this.props.inventory;

    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Item Dispatch History</div>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-sm"
              table="data_table"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export" />
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-hover table-responsive-sm" id="data_table">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Requesting Store</th>
                  <th>Quantity</th>
                  <th>Date Reuested</th>
                  <th>Date Dispatched</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.filter(req => req.is_dispatched === true).map((requisition, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{products.length > 0 ? products.find(product => product.id === requisition.product_id).name : ""}</td>
                    <td>{stores.length > 0 ? stores.find(store => store.id === requisition.store_id).name : ""}</td>
                    <td>{requisition.quantity_required}</td>
                    <td>{new Date(requisition.created).toLocaleDateString('en-uk')}</td>
                    <td>{new Date(requisition.required_by).toLocaleDateString('en-uk')}</td>
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
}), { getRequisitions })(Dispatches)
