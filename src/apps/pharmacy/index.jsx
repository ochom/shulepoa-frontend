import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import { getSuppliers } from '../inventory/actions'
import { getDrugs } from './actions'
import { getUsers } from '../hospital/actions'
import Drugs from './views/drugs'
import Queue from './views/queue'
import Reorders from './views/reorders'
import ShortageNotice from './views/shortage'

export class Pharmacy extends Component {
  componentDidMount() {
    this.props.getSuppliers();
    this.props.getDrugs()
    this.props.getUsers()
  }

  shortage = () => {
    var total = this.props.drugs.filter(d => d.quantity <= d.reorder_level).length;
    return total;
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/pharmacy/queue" className="list-group-item"><i className="fa fa-users"></i> Queue</Link>
        <Link to="/pharmacy/drugs" className="list-group-item"><i className="fa fa-list"></i> Drugs</Link>
        <Link to="/pharmacy/notification" className="list-group-item"><i className="fa fa-bell"></i> Shortage ({this.shortage()})</Link>
        <Link to="/pharmacy/reorders" className="list-group-item"><i className="fa fa-clock-o"></i> Stock Monitor</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Pharmacy" />
          <div className="page_body">
            <Route
              path="/pharmacy"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} exact component={Queue} />
                  <Route path={`${url}/queue`} component={Queue} exact />
                  <Route path={`${url}/drugs`} component={Drugs} />
                  <Route path={`${url}/notification`} component={ShortageNotice} exact />
                  <Route path={`${url}/reorders`} component={Reorders} />
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
  drugs: state.pharmacy.drugs,
})

export default connect(mapStateToProps, { getSuppliers, getDrugs, getUsers })(Pharmacy);

