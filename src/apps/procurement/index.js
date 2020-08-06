import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Stores from './views/stores'

export default class Pocurement extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/procurement/stores" className="list-group-item"><i className="fa fa-users"></i> Stores</Link>
        <Link to="/procurement/inventory" className="list-group-item"><i className="fa fa-credit-card"></i> Inventory</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="row col-12 mx-auto page-container">
          <Route
            path="/procurement"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} component={Stores} exact />
                <Route path={`${url}/cashpoint`} component={Stores} exact />
                <Route path={`${url}/cashpoint/payment-queue`} component={Stores} />
                <Route path={`${url}/cashpoint/custom-payments`} component={Stores} />
              </>
            )}
          />
        </div>
      </>
    )
  }
}

