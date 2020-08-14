import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Topnav extends Component {
  state = {
    showMainMenu: false,
  }
  toggleMenu = () => this.setState({ showMainMenu: !this.state.showMainMenu })
  render() {
    return (
      <>
        <div className="topnav">
          <div className="topnav-title"><b>{this.props.page ? this.props.page : "Dashboard"}</b></div>
          <div className="topnav-title right" >
            <button className="btn cu-text-primary" style={{ position: "relative" }}
              onClick={this.toggleMenu} title="Profile">
              <i className="fa fa-user-o"></i></button>
            <button className="btn cu-text-primary" title="Main Menu"
              onClick={this.toggleMenu}><i className="fa fa-th"></i></button>
          </div>
        </div>
        <div id="main-menu"
          className={this.state.showMainMenu ? "show-menu" : "hide-menu"}
          onClick={this.toggleMenu}>
          <div className="col-sm-8 col-md-6 col-lg-4"
            style={{ minHeight: "250px", maxHeight: "500px", overflowY: "auto", float: "right", marginTop: "60px" }}>
            <div className="card card-body py-4 px-2">
              <div className="row col-12 mx-auto">
                <Link className="main-menu-menu text-center" to="/"><i className="fa fa-home"></i><br />Dashboard</Link>
                <Link className="main-menu-menu text-center" to="/records"><i className="fa fa-pencil"></i><br />Records</Link>
                <Link className="main-menu-menu text-center" to="/outpatient"><i className="fa fa-user-md"></i><br />Out-patient</Link>
                <Link className="main-menu-menu text-center" to="/laboratory"><i className="fa fa-flask"></i><br />Laboratory</Link>
                <Link className="main-menu-menu text-center" to="/radiology"><i className="fa fa-photo"></i><br />Radiology</Link>
                <Link className="main-menu-menu text-center" to="/pharmacy"><i className="fa fa-medkit"></i><br />Pharmacy</Link>
                <Link className="main-menu-menu text-center" to="/inpatient"><i className="fa fa-heartbeat"></i><br />In-patient</Link>
                <Link className="main-menu-menu text-center" to="/revenue/cashpoint/payment-queue"><i className="fa fa-dollar"></i><br />Cashpoint</Link>
                <Link className="main-menu-menu text-center" to="/revenue/accounts"><i className="fa fa-money"></i><br />Accounts</Link>
                <Link className="main-menu-menu text-center" to="/inventory"><i className="fa fa-truck"></i><br />Inventory</Link>
                <Link className="main-menu-menu text-center" to="/hospital/services"><i className="fa fa-ambulance"></i><br />Services</Link>
                <Link className="main-menu-menu text-center" to="/hospital/insurance"><i className="fa fa-briefcase"></i><br />Insurance</Link>
                <Link className="main-menu-menu text-center" to="/hospital"><i className="fa fa-h-square"></i><br />Hospital</Link>
                <Link className="main-menu-menu text-center" to="/hospital/users"><i className="fa fa-users"></i><br />Users</Link>
              </div>
            </div>
          </div>

        </div>
      </>
    )
  }
}
