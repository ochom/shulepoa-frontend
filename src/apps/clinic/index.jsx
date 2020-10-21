import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'

export default class Clinic extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/clinic" className="list-group-item"><i className="fa fa-angle-right"></i> Drugs</Link>
        <Link to="/clinic/awards" className="list-group-item"><i className="fa fa-angle-right"></i> Beds</Link>
        <Link to="/clinic/subjects-grading" className="list-group-item"><i className="fa fa-angle-right"></i> Sick-bay</Link>
        <Link to="/clinic/attendance" className="list-group-item"><i className="fa fa-angle-right"></i> Referrals</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Records" />
          <div className="page_body">
            <Route
              path="/clinic"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} exact render={() => { return <Dashboard /> }} />
                  {/* <Route path={`${url}/student/:id`} component={MarksEntry} />
                  <Route path={`${url}/teachers`} component={ExamReports} exact /> */}
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}


const Dashboard = () => {
  return (
    <div className="row col-12 mx-auto">
      <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
        <div className="card card-body">
          <b className="text-secondary">Drugs</b>
          <h1 className="text-success"><b>{0}</b></h1>
          <span>Drugs in stock</span>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
        <div className="card card-body">
          <b className="text-secondary">Sickbay</b>
          <h1 className="text-primary"><b>{0}</b></h1>
          <span>Students in sickbay</span>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
        <div className="card card-body">
          <b className="text-secondary">Referrals</b>
          <h1 className="text-danger"><b>{0}</b></h1>
          <span>To other facilities</span>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
        <div className="card card-body">
          <b className="text-secondary">Bed</b>
          <h1 className="text-info"><b>{0}%</b></h1>
          <span>Occupation</span>
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
                  <th>Reg Number</th>
                  <th>Sex</th>
                  <th>Group</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {/* {appointments.filter(a => !a.is_discharged).slice(0, 5).map((appointment, index) =>
                          <tr key={index}>
                            <td>{appointment.patient.fullname}</td>
                            <td>{GENDERS[appointment.patient.sex]}</td>
                            <td>{new Date(appointment.patient.dob).toDateString('en-uk')}</td>
                            <td>{appointment.patient.phone}</td>
                            <td>{appointment.patient.id_no}</td>
                            <td>{appointment.clinic.name}</td>
                          </tr>
                        )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}