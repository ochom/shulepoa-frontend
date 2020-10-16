import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import Departments from './views/departments'
import Classes from './views/classes'
import Classrooms from './views/classrooms'
import Profile from './views/profile'
import Users from './views/users'
import Group from './views/user_roles'
import Subjects from './views/subjects'

export class Organization extends Component {
  render() {
    const { user } = this.props
    if (!user.rights.can_view_administration) {
      return <Redirect to="/" />
    }
    const menu_list =
      <div className="list-group">
        <Link to="/administrator" className="list-group-item"><i className="fa fa-angle-right"></i> Institution</Link>
        <Link to="/administrator/departments" className="list-group-item"><i className="fa fa-angle-right"></i> Departments</Link>
        <Link to="/administrator/classes" className="list-group-item"><i className="fa fa-angle-right"></i> Academic Stages</Link>
        <Link to="/administrator/classrooms" className="list-group-item"><i className="fa fa-angle-right"></i> Classrooms</Link>
        <Link to="/administrator/subjects" className="list-group-item"><i className="fa fa-angle-right"></i> Subjects</Link>
        <Link to="/administrator/roles" className="list-group-item"><i className="fa fa-angle-right"></i> User Roles</Link>
        <Link to="/administrator/users" className="list-group-item"><i className="fa fa-angle-right"></i> Users</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Organization Manager" />
          <div className="page_body">
            <Route
              path="/administrator"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Profile} exact />
                  <Route path={`${url}/departments`} component={Departments} />
                  <Route path={`${url}/classes`} component={Classes} />
                  <Route path={`${url}/classrooms`} component={Classrooms} />
                  <Route path={`${url}/subjects`} component={Subjects} />
                  <Route path={`${url}/users`} component={Users} />
                  <Route path={`${url}/roles`} component={Group} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}

export default connect(state => ({
  user: state.auth.user
}))(Organization);

