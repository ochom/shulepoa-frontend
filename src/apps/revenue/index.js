import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getServices, getInsurances } from '../hospital/actions'
import CashPoint from './views/cashpoint'
import Topnav from '../common/topnav'

export class Revenue extends Component {

  componentDidMount() {
    this.props.getInsurances();
    this.props.getServices();
  }

  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/revenue/cashpoint" className="list-group-item"><i className="fa fa-money"></i> Cashpoint</Link>
        <Link to="/revenue/billing" className="list-group-item"><i className="fa fa-credit-card"></i> Billing</Link>
        <Link to="/revenue/invoicing" className="list-group-item"><i className="fa fa-list"></i> Invoices</Link>
        <Link to="/revenue/claims" className="list-group-item"><i className="fa fa-briefcase"></i> Claims</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Revenue &amp; Accounts" />
          <div className="page_body">
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
        </div>
      </>
    )
  }
}
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getServices, getInsurances })(Revenue);

