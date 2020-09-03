import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { getServices } from '../hospital/actions'
import { getSuppliers } from '../inventory/actions'
import { getReorders } from './actions'
import Drugs from './views/drugs'
import Queue from './views/queue'
import reorders from './views/reorders'
import reorder_edit from './views/reorder_edit'
import history_details from './views/history_details'
import serve_patient from './views/serve_patient'
import Topnav from '../common/topnav'

export class Pharmacy extends Component {
  componentDidMount() {
    this.props.getServices();
    this.props.getSuppliers();
    this.props.getReorders();
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/pharmacy/queue" className="list-group-item"><i className="fa fa-users"></i> Queue</Link>
        <Link to="/pharmacy/drugs" className="list-group-item"><i className="fa fa-list"></i> Drugs</Link>
        <Link to="/pharmacy/drugs-reorders" className="list-group-item"><i className="fa fa-edit"></i> Re-orders</Link>
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
                  <Route path={`${url}/queue/patient/:patient_id`} component={serve_patient} />
                  <Route path={`${url}/drugs`} component={Drugs} />
                  <Route path={`${url}/drugs-reorders`} component={reorders} exact />
                  <Route path={`${url}/drugs-reorders/:pk/edit`} component={reorder_edit} />
                  <Route path={`${url}/drugs-reorders/:pk/history`} component={history_details} />
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

export default connect(mapStateToProps, { getServices, getSuppliers, getReorders })(Pharmacy);

