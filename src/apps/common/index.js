import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CanvasJSReact from '../../lib/canvasjs.react';
import Sidenav from './sidenav';
import Topnav from './topnav';

//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Dashboard extends Component {
  componentDidMount() {
  }

  render() {
    const top_infections = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Most infectious diseases"
      },
      data: [{
        type: "pie",
        dataPoints: [
          { label: "TB", y: 10 },
          { label: "Typhoid", y: 15 },
          { label: "Ulcers", y: 25 },
          { label: "Malaria", y: 30 },
          { label: "Others", y: 28 }
        ]
      }]
    }

    const daily_visits = {
      title: {
        text: "Daily Visits"
      },
      data: [{
        type: "spline",
        dataPoints: [
          { label: "TB", y: 10 },
          { label: "Typhoid", y: 15 },
          { label: "Ulcers", y: 25 },
          { label: "Malaria", y: 30 },
          { label: "Others", y: 28 }
        ]
      }, {
        type: "spline",
        dataPoints: [
          { label: "TB", y: 8 },
          { label: "Typhoid", y: 22 },
          { label: "Ulcers", y: 25 },
          { label: "Malaria", y: 28 },
          { label: "Others", y: 30 }
        ]
      }]
    }

    const menus =
      <div className="list-group">
        <Link className="list-group-item" to="/records"><i className="fa fa-pencil"></i> Records</Link>
        <Link className="list-group-item" to="/outpatient"><i className="fa fa-stethoscope"></i> Outpatient</Link>
        <Link className="list-group-item" to="/laboratory"><i className="fa fa-flask"></i> Laboratory</Link>
        <Link className="list-group-item" to="/radiology"><i className="fa fa-photo"></i> Radiology</Link>
        <Link className="list-group-item" to="/pharmacy"><i className="fa fa-medkit"></i> Pharmacy</Link>
        <Link className="list-group-item" to="/inpatient"><i className="fa fa-heartbeat"></i> Inpatient</Link>
        <Link className="list-group-item" to="/revenue/accounts"><i className="fa fa-money"></i> Accounts</Link>
        <Link className="list-group-item" to="/inventory"><i className="fa fa-truck"></i> Inventory</Link>
        <Link className="list-group-item" to="/hospital/users"><i className="fa fa-user-md"></i> Doctors</Link>
        <Link className="list-group-item" to="/hospital/users"><i className="fa fa-users"></i> Users</Link>
        <Link className="list-group-item" to="/hospital"><i className="fa fa-h-square"></i> Hospital</Link>
      </div>
    return (
      <>
        <Sidenav menus={menus} />
        <div className="page_container">
          <Topnav page="Dashboard" />
          <div className="page_body">
            <div className="row col-12 mx-auto">
              <div className="col-md-6 col-lg-6 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
              </div>
              <div className="col-md-6 col-lg-6 dash_item">
                <CanvasJSChart className="canvas" options={daily_visits} />
              </div>
              <div className="col-md-12 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
              </div>
              <div className="col-md-6 col-lg-4 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
              </div>
              <div className="col-md-6 col-lg-4 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
              </div>
              <div className="col-md-6 col-lg-4 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
              </div>
              <div className="col-md-6 col-lg-6 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
              </div>
              <div className="col-md-6 col-lg-6 dash_item">
                <CanvasJSChart className="canvas" options={top_infections} />
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
)(Dashboard);
