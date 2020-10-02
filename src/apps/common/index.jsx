import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidenav from './sidenav';
import Topnav from './topnav';
import { getAppointments } from '../outpatient/actions'
import { getAdmissions } from '../inpatient/actions'
import { getInvoices } from '../revenue/actions'
import { getProducts } from '../inventory/actions'
import CanvasJSReact from '../../lib/canvasjs.react'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getAppointments()
    this.props.getAdmissions()
    this.props.getInvoices()
    this.props.getProducts()
  }

  render() {
    const { appointments, admissions, invoices, products, common: { CONSTANTS: { GENDERS } } } = this.props

    const menus =
      <div className="list-group">
        <Link className="list-group-item" to="/records"><i className="fa fa-users"></i> Records</Link>
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

    const options = {
      animationEnabled: true,
      title: {
        text: "Invoice Categories",
        horizontalAlign: "left"
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} (#percent%)",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
          { y: invoices.filter(i => i.status === "DRAFT").length, label: "Drafts" },
          { y: invoices.filter(i => i.status === "BILLED").length, label: "Billed" },
          { y: invoices.filter(i => i.status === "CLEARED").length, label: "Cleared" },
        ]
      }]
    }

    const options2 = {
      animationEnabled: true,
      title: {
        text: "Appointments vs Admissions",
        horizontalAlign: "left"
      },
      data: [{
        type: "pie",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} (#percent%)",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
          { y: admissions.length, label: "Admissions" },
          { y: appointments.length, label: "Appointments" },
        ]
      }]
    }

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
                  <h1 className="text-success"><b>{appointments.filter(a => !a.is_discharged).length}</b></h1>
                  <Link to="/outpatient/">Appointments</Link>
                </div>
              </div>

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Active</b>
                  <h1 className="text-primary"><b>{admissions.filter(a => !a.is_discharged).length}</b></h1>
                  <Link to="/inpatient/">Admissions</Link>
                </div>
              </div>

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Invoices</b>
                  <h1 className="text-danger"><b>{invoices.filter(i => i.status === "DRAFT").length}</b></h1>
                  <Link to="/revenue/invoices">Drafts</Link>
                </div>
              </div>

              <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
                <div className="card card-body">
                  <b className="text-secondary">Stock</b>
                  <h1 className="text-info"><b>{products.filter(p => p.quantity <= p.minimumRequired).length}</b></h1>
                  <Link to="/inventory/products">Deficit</Link>
                </div>
              </div>

              <div className="col-12 mx-auto my-3">
                <div className="card">
                  <div className="card-header">Recent Patients</div>
                  <div className="card-body p-0">
                    <table className="table table-sm table-responsive-lg">
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Sex</th>
                          <th>DoB</th>
                          <th>Mobile</th>
                          <th>ID Number</th>
                          <th>Clinic Visited</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.filter(a => !a.is_discharged).slice(0, 5).map((appointment, index) =>
                          <tr key={index}>
                            <td>{appointment.patient.fullname}</td>
                            <td>{GENDERS[appointment.patient.sex]}</td>
                            <td>{new Date(appointment.patient.dob).toDateString('en-uk')}</td>
                            <td>{appointment.patient.phone}</td>
                            <td>{appointment.patient.id_no}</td>
                            <td>{appointment.clinic.name}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 mb-2">
                <div className="card card-body">
                  <CanvasJSChart options={options} style={{ height: "250px", width: "100%" }} />
                </div>
              </div>

              <div className="col-sm-6 mb-2">
                <div className="card card-body">
                  <CanvasJSChart options={options2} style={{ height: "250px", width: "100%" }} />
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
    appointments: state.outpatient.appointments,
    admissions: state.inpatient.admissions,
    invoices: state.revenue.invoices,
    products: state.inventory.products,
  }), { getAppointments, getAdmissions, getInvoices, getProducts }
)(Dashboard);
