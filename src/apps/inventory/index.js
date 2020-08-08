import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Stores from './views/stores'
import Topnav from '../common/topnav'

export default class Inventory extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/inventory/stores" className="list-group-item"><i className="fa fa-building-o"></i> Stores</Link>
        <Link to="/inventory/stock" className="list-group-item"><i className="fa fa-line-chart"></i> Stock</Link>
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
                  <Route path={`${url}/stock`} component={Stores} />
                  <Route path={`${url}/procurement`} component={Stores} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}

