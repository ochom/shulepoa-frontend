import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../auth/actions'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class Topnav extends Component {
  state = {
    showMainMenu: false,
    dropdown: false
  }

  toggleMenu = () => this.setState({ showMainMenu: !this.state.showMainMenu })

  render() {
    return (
      <>
        <div className="topnav">
          <div className="topnav-title"><b>{this.props.page ? this.props.page : "Dashboard"}</b></div>
          <div className="topnav-title right" >
            <button className="btn cu-text-primary" title="Main Menu"
              onClick={this.toggleMenu}><i className="fa fa-th"></i></button>
            <Dropdown isOpen={this.state.dropdown} className="btn"
              toggle={() => this.setState({ dropdown: !this.state.dropdown })}>
              <DropdownToggle color="cu-text-primary" className="bg-transparent border-0" caret><i className="fa fa-user-o"></i></DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => window.location.href = '/profile'}>Profile</DropdownItem>
                <DropdownItem onClick={() => window.location.href = '/change-password'}>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.props.logout()}>Signout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
                <Link className="main-menu-menu text-center" to="/records"><i className="fa fa-users"></i><br />Patients</Link>
                <Link className="main-menu-menu text-center" to="/outpatient"><i className="fa fa-user-md"></i><br />Outpatient</Link>
                <Link className="main-menu-menu text-center" to="/inpatient"><i className="fa fa-heartbeat"></i><br />Inpatient</Link>
                <Link className="main-menu-menu text-center" to="/laboratory"><i className="fa fa-flask"></i><br />Laboratory</Link>
                <Link className="main-menu-menu text-center" to="/radiology"><i className="fa fa-photo"></i><br />Imaging</Link>
                <Link className="main-menu-menu text-center" to="/pharmacy"><i className="fa fa-medkit"></i><br />Pharmacy</Link>
                <Link className="main-menu-menu text-center" to="/revenue/cashpoint"><i className="fa fa-dollar"></i><br />Billing</Link>
                <Link className="main-menu-menu text-center" to="/revenue/accounts"><i className="fa fa-money"></i><br />Accounts</Link>
                <Link className="main-menu-menu text-center" to="/inventory"><i className="fa fa-truck"></i><br />Inventory</Link>
                <Link className="main-menu-menu text-center" to="/hospital/services"><i className="fa fa-ambulance"></i><br />Services</Link>
                <Link className="main-menu-menu text-center" to="/hospital"><i className="fa fa-h-square"></i><br />Admin</Link>
              </div>
            </div>
          </div>

        </div>
      </>
    )
  }
}
export default connect(null, { logout })(Topnav)
