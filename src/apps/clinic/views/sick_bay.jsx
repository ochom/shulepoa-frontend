import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'

export default class Sickbay extends Component {
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
                  {/* <Route path={`${url}`} component={Exams} exact />
                  <Route path={`${url}/student/:id`} component={MarksEntry} />
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
