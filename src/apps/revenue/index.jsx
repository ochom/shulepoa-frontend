import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getServices, getInsurances } from '../hospital/actions'
import CashPoint from './views/cashpoint'
import Topnav from '../common/topnav'
import Invoices from './views/invoices'
import deposits from './views/deposits'
import Invoice from './views/invoice'

export class Revenue extends Component {

  componentDidMount() {
    this.props.getInsurances();
    this.props.getServices();
  }

  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/revenue/cashpoint" className="list-group-item"><i className="fa fa-angle-right"></i> Cashier</Link>
        <Link to="/revenue/invoices" className="list-group-item"><i className="fa fa-angle-right"></i> Invoices</Link>
        <Link to="/revenue/deposits" className="list-group-item"><i className="fa fa-angle-right"></i> Deposits</Link>
        <Link to="/revenue/pricing" className="list-group-item"><i className="fa fa-angle-right"></i> Pricing</Link>
        <Link to="/revenue/profits" className="list-group-item"><i className="fa fa-angle-right"></i> Profit &amp; Loss</Link>
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
                  <Route path={`${url}/cashpoint`} component={CashPoint} />
                  <Route path={`${url}/invoices`} component={Invoices} exact />
                  <Route path={`${url}/invoices/:invoice_id`} component={Invoice} />
                  <Route path={`${url}/deposits`} component={deposits} />
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

