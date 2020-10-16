import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Topnav from './topnav';

export class Dashboard extends Component {
  render() {
    const menus =
      <div className="list-group">
        <Link className="list-group-item" to="/records"><i className="fa fa-users"></i> Records</Link>
        <Link className="list-group-item" to="/outpatient"><i className="fa fa-pencil-square-o"></i> Examination</Link>
        <Link className="list-group-item" to="/outpatient"><i className="fa fa-stethoscope"></i> Clinic</Link>
        <Link className="list-group-item" to="/inpatient"><i className="fa fa-calendar"></i> Calendar &amp; Timetable</Link>
        <Link className="list-group-item" to="/laboratory"><i className="fa fa-book"></i> Library</Link>
        <Link className="list-group-item" to="/radiology"><i className="fa fa-trophy"></i> Games &amp; Awards</Link>
        <Link className="list-group-item" to="/revenue"><i className="fa fa-money"></i> Accounts &amp; Finance</Link>
        <Link className="list-group-item" to="/inventory"><i className="fa fa-truck"></i> Inventory</Link>
        <Link className="list-group-item" to="/inventory"><i className="fa fa-address-card-o"></i> Payroll</Link>
        <Link className="list-group-item" to="/inventory"><i className="fa fa-comments-o"></i> SMS &amp; Emails</Link>
        <Link className="list-group-item" to="/administrator"><i className="fa fa-cog"></i> Administrator</Link>
      </div>

    return (
      <>
        <Sidenav menus={menus} />
        <div className="page_container">
          <Topnav page="Dashboard" />
          <div className="page_body">
            <div className="row col-12 mx-auto">

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Active</b>
                  <h1 className="text-success"><b>{0}</b></h1>
                  <Link to="/outpatient/">Appointments</Link>
                </div>
              </div>

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Active</b>
                  <h1 className="text-primary"><b>{0}</b></h1>
                  <Link to="/inpatient/">Admissions</Link>
                </div>
              </div>

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Invoices</b>
                  <h1 className="text-danger"><b>{0}</b></h1>
                  <Link to="/revenue/invoices">Drafts</Link>
                </div>
              </div>

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Stock</b>
                  <h1 className="text-info"><b>{0}</b></h1>
                  <Link to="/inventory/products">Deficit</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth,
    common: state.common,
  })
)(Dashboard);
