import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import PurchaseOrders from './views/orders'
import Products from './views/products'
import Requsitions from './views/requisitions'
import Stores from './views/stores'
import Supplies from './views/supplies'

export default class Inventory extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/inventory/stores" className="list-group-item"><i className="fa fa-building-o"></i> Stores</Link>
        <Link to="/inventory/stock" className="list-group-item"><i className="fa fa-line-chart"></i> Stock</Link>
        <Link to="/inventory/requisitions" className="list-group-item"><i className="fa fa-cart-plus"></i> Requisitions</Link>
        <Link to="/inventory/orders" className="list-group-item"><i className="fa fa-briefcase"></i> Orders</Link>
        <Link to="/inventory/supplies" className="list-group-item"><i className="fa fa-handshake-o"></i> Supplies</Link>
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
                  <Route path={`${url}/stock`} component={Products} />
                  <Route path={`${url}/requisitions`} component={Requsitions} />
                  <Route path={`${url}/orders`} component={PurchaseOrders} />
                  <Route path={`${url}/supplies`} component={Supplies} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}

