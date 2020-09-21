import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Topnav from './topnav';

export class Dashboard extends Component {
  componentDidMount() {
  }

  render() {
    const menus =
      <div className="list-group">
        <Link className="list-group-item" to="/records"><i className="fa fa-users"></i> Patients</Link>
        <Link className="list-group-item" to="/outpatient"><i className="fa fa-stethoscope"></i> Outpatient</Link>
        <Link className="list-group-item" to="/inpatient"><i className="fa fa-heartbeat"></i> Inpatient</Link>
        <Link className="list-group-item" to="/laboratory"><i className="fa fa-flask"></i> Laboratory</Link>
        <Link className="list-group-item" to="/radiology"><i className="fa fa-photo"></i> Imaging</Link>
        <Link className="list-group-item" to="/pharmacy"><i className="fa fa-medkit"></i> Pharmacy</Link>
        <Link className="list-group-item" to="/revenue"><i className="fa fa-money"></i> Billing</Link>
        <Link className="list-group-item" to="/inventory"><i className="fa fa-truck"></i> Inventory</Link>
        <Link className="list-group-item" to="/hospital/users"><i className="fa fa-users"></i> Users</Link>
        <Link className="list-group-item" to="/hospital"><i className="fa fa-h-square"></i> Administrator</Link>
      </div>
    return (
      <>
        <Sidenav menus={menus} />
        <div className="page_container">
          <Topnav page="Dashboard" />
          <div className="page_body">
            <div className="dashboard-image-div row col-12 justify-content-center mx-auto">
              <img
                src="/static/undraw_medicine_b1ol.svg"
                alt="Doctors"
                width="300px"
                height="auto"
              /></div>
          </div>
        </div >
      </ >
    )
  }
}

export default connect(
  state => ({
    auth: state.auth,
    common: state.common,
  }),
)(Dashboard);
