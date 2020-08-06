import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { loadService, loadInsurance } from '../hospital/actions'
import CashPoint from './views/payments_queue'

export class Revenue extends Component {

  componentDidMount() {
    this.props.loadInsurance();
    this.props.loadService();
  }

  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/revenue/cashpoint/payment-queue" className="list-group-item"><i className="fa fa-users"></i> Clients Queue</Link>
        <Link to="/revenue/cashpoint/custom-payments" className="list-group-item"><i className="fa fa-credit-card"></i> Custom payments</Link>
        <Link to="/revenue/accounts/invoices" className="list-group-item"><i className="fa fa-list"></i> Billing Invoices</Link>
        <Link to="/revenue/accounts/claims" className="list-group-item"><i className="fa fa-briefcase"></i> Claims</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="row col-12 mx-auto page-container">
          <Route
            path="/revenue"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} component={CashPoint} exact />
                <Route path={`${url}/cashpoint`} component={CashPoint} exact />
                <Route path={`${url}/cashpoint/payment-queue`} component={CashPoint} />
                <Route path={`${url}/cashpoint/custom-payments`} component={CashPoint} />
              </>
            )}
          />
        </div>
      </>
    )
  }
}
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { loadService, loadInsurance })(Revenue);

