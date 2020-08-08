import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDashboardData } from './actions';
import Sidenav from './sidenav';
import Topnav from './topnav';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.loadDashboardData();
  }
  render() {
    // const { dashboard_data } = this.props.common
    return (
      <>
        <Sidenav menus={null} />
        <div className="page_container">
          <Topnav page="Dashboard" />
          <div className="page_body">
            <div className="row col-12 mx-auto">
              <div className="col-md-6 col-lg-6 dash_item">
                <canvas></canvas>
              </div>
              <div className="col-md-6 col-lg-6 dash_item">
                <canvas></canvas>
              </div>
              <div className="col-md-6 col-lg-4 dash_item">
                <canvas></canvas>
              </div>
              <div className="col-md-6 col-lg-4 dash_item">
                <canvas></canvas>
              </div>
              <div className="col-md-6 col-lg-4 dash_item">
                <canvas></canvas>
              </div>
              <div className="col-md-6 col-lg-6 dash_item">
                <canvas></canvas>
              </div>
              <div className="col-md-6 col-lg-6 dash_item">
                <canvas></canvas>
              </div>
            </div>
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
  { loadDashboardData }
)(Dashboard);
