import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getServices, getInsurances } from '../hospital/actions'
import CashPoint from './views/cashpoint'
import Topnav from '../common/topnav'
import Invoices from './views/invoices'

export class Revenue extends Component {

  componentDidMount() {
    this.props.getInsurances();
    this.props.getServices();
  }

  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/revenue/cashpoint" className="list-group-item"><i className="fa fa-angle-right"></i> Cashier</Link>
        <Link to="/revenue/invoicing" className="list-group-item"><i className="fa fa-angle-right"></i> Invoices</Link>
        <Link to="/revenue/invoicing" className="list-group-item"><i className="fa fa-angle-right"></i> Payments</Link>
        <Link to="/revenue/invoicing" className="list-group-item"><i className="fa fa-angle-right"></i> Pricing</Link>
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
                  <Route path={`${url}/invoicing`} component={Invoices} />
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

