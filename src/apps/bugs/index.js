import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import Bug from './issue'
import Bugs from './issues_list'


class Issues extends Component {
  render() {
    const menus =
      <div className="list-group">
        <Link className="list-group-item" to="/records"><i className="fa fa-pencil"></i> Records</Link>
        <Link className="list-group-item" to="/outpatient"><i className="fa fa-user-md"></i> Out-patient</Link>
        <Link className="list-group-item" to="/laboratory"><i className="fa fa-flask"></i> Laboratory</Link>
        <Link className="list-group-item" to="/radiology"><i className="fa fa-photo"></i> Radiology</Link>
        <Link className="list-group-item" to="/pharmacy"><i className="fa fa-medkit"></i> Pharmacy</Link>
        <Link className="list-group-item" to="/inpatient"><i className="fa fa-heartbeat"></i> In-patient</Link>
        <Link className="list-group-item" to="/revenue/cashpoint/payment-queue"><i className="fa fa-dollar"></i> Cashpoint</Link>
        <Link className="list-group-item" to="/revenue/accounts"><i className="fa fa-money"></i> Accounts</Link>
        <Link className="list-group-item" to="/inventory"><i className="fa fa-truck"></i> Inventory</Link>
        <Link className="list-group-item" to="/hospital/services"><i className="fa fa-ambulance"></i> Services</Link>
        <Link className="list-group-item" to="/hospital/insurance"><i className="fa fa-briefcase"></i> Insurance</Link>
        <Link className="list-group-item" to="/hospital"><i className="fa fa-h-square"></i> Hospital</Link>
        <Link className="list-group-item" to="/hospital/users"><i className="fa fa-users"></i> Users</Link>
      </div>
    return (
      <div>
        <Sidenav menus={menus} />
        <div className="page_container">
          <Topnav page="Issues and Bugs" />
          <div className="page_body">
            <Route path="/issues" exact component={Bugs} />
            <Route path="/issues/:bug_id" component={Bug} />
          </div>
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  bugs: state.bugs.issues
}))(Issues)