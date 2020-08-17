import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import { getProducts, getStores, getUnits } from './actions'
import Dispatches from './views/dispatches'
import GRN from './views/grn'
import PurchaseOrders from './views/purchase_orders'
import Products from './views/products'
import Requsitions from './views/requisitions'
import Stores from './views/stores'
import supplier from './views/supplier'

class Inventory extends Component {
  componentDidMount() {
    this.props.getStores();
    this.props.getUnits();
    this.props.getProducts();
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/inventory/stores" className="list-group-item"><i className="fa fa-building-o"></i> Stores</Link>
        <Link to="/inventory/products" className="list-group-item"><i className="fa fa-line-chart"></i> Products</Link>
        <Link to="/inventory/requisitions" className="list-group-item"><i className="fa fa-cart-plus"></i> New Requisitions</Link>
        <Link to="/inventory/dispatches" className="list-group-item"><i className="fa fa-history"></i> Dispatch</Link>
        <Link to="/inventory/suppliers" className="list-group-item"><i className="fa fa-handshake-o"></i> Suppliers</Link>
        <Link to="/inventory/orders" className="list-group-item"><i className="fa fa-briefcase"></i> Orders</Link>
        <Link to="/inventory/grn" className="list-group-item"><i className="fa fa-truck"></i> GRN</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Inventory Manager" />
          <div className="page_body">
            <Route
              path="/inventory"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Stores} exact />
                  <Route path={`${url}/stores`} component={Stores} exact />
                  <Route path={`${url}/products`} component={Products} />
                  <Route path={`${url}/requisitions`} component={Requsitions} />
                  <Route path={`${url}/dispatches`} component={Dispatches} />
                  <Route path={`${url}/suppliers`} component={supplier} />
                  <Route path={`${url}/orders`} component={PurchaseOrders} />
                  <Route path={`${url}/grn`} component={GRN} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}

export default connect(null, { getStores, getUnits, getProducts })(Inventory)