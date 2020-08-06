import React, { Component } from 'react'
import Sidenav from './sidenav'
import { connect } from 'react-redux'
import { loadDashboardData } from './actions'

export class Dashboard extends Component {
  componentDidMount() {
    this.props.loadDashboardData();
  }
  render() {
    const { dashboard_data } = this.props.common
    return (
      <>
        <Sidenav menus={null} />
        <div className="row col-12 mx-auto page-container">
          <h5 className="col-11 mx-auto text-center text-success py-3">Hi {this.props.auth.user.username}, we hope you are having a good time. !</h5>
          <div className="bg-danger dashboard-primary-tags">
            <h3>{dashboard_data ? dashboard_data.active_active_users : '0'}</h3>
            <b>Active Medics</b>
            <i className="fa fa-user-md"></i>
          </div>
          <div className="bg-success dashboard-primary-tags">
            <h3>{dashboard_data ? dashboard_data.active_appointments : '0'}</h3>
            <b>Live Appointments</b>
            <i className="fa fa-calendar"></i>
          </div>
          <div className="bg-primary dashboard-primary-tags">
            <h3>{dashboard_data ? dashboard_data.registered_patients : '0'}</h3>
            <b>Registered Patients</b>
            <i className="fa fa-users"></i>
          </div>
          <div className="dashboard-secondary-tags">
            <div></div>
          </div>

          <div className="dashboard-secondary-tags">
            <table className="table table-sm table-bordered m-0">
              <caption className="px-2"><i>Recent Patients</i></caption>
              <thead className="custom-bg-primary">
                <tr><th>#</th><th>Name</th><th>Sex</th><th>Mobile</th></tr>
              </thead>
              <tbody>
                {dashboard_data ? dashboard_data.recent_patients.map((patient, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{patient.fullname}</td>
                    <td>{this.props.common.CONSTANTS.GENDERS[patient.sex]}</td>
                    <td>{patient.phone}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
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
