import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import Exams from './views/exams'
import ExamReports from './views/exam_reports'
import MarksEntry from './views/marks_entry'

export default class Academics extends Component {
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/academics" className="list-group-item"><i className="fa fa-angle-right"></i> Examination</Link>
        <Link to="/academics/subjects-grading" className="list-group-item"><i className="fa fa-angle-right"></i> Subject Grading</Link>
        <Link to="/academics/attendance" className="list-group-item"><i className="fa fa-angle-right"></i> Attendance</Link>
        <Link to="/academics/awards" className="list-group-item"><i className="fa fa-angle-right"></i> Awards</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Records" />
          <div className="page_body">
            <Route
              path="/academics"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Exams} exact />
                  <Route path={`${url}/student/:id`} component={MarksEntry} />
                  <Route path={`${url}/teachers`} component={ExamReports} exact />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}
