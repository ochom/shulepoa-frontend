import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { loadService, loadSupplier } from '../hospital/actions'
import { getReordersHistory } from './actions'
import Drugs from './views/drugs'
import Queue from './views/queue'
import reorders from './views/reorders'
import reorder_edit from './views/reorder_edit'
import history_details from './views/history_details'
import serve_patient from './views/serve_patient'

export class Pharmacy extends Component {
  componentDidMount() {
    this.props.loadService();
    this.props.loadSupplier();
    this.props.getReordersHistory();
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/pharmacy/queue" className="list-group-item"><i className="fa fa-users"></i> Queue</Link>
        <Link to="/pharmacy/drugs" className="list-group-item"><i className="fa fa-list"></i> Drugs</Link>
        <Link to="/pharmacy/drugs-reorders" className="list-group-item"><i className="fa fa-edit"></i> Re-orders</Link>
      </div>
    const welcome_screen =
      <div className="row col-12 mx-auto mt-3">
        <div className="card card-header bg-white py-1 px-3 col-12">
          <div className="py-1 px-2">
            <Link to="/pharmacy">Pharmacy</Link>
          </div>
        </div>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="row col-12 mx-auto page-container">
          <Route
            path="/pharmacy"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} exact render={() => welcome_screen} />
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
      </>
    )
  }
}
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { loadService, loadSupplier, getReordersHistory })(Pharmacy);

