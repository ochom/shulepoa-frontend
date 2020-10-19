import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import { getClasses, getClassrooms } from '../organization/actions'
import Staffs from './views/staff'
import Students from './views/students'
import Teachers from './views/teachers'

export class Records extends Component {

  componentDidMount() {
    this.props.getClasses()
    this.props.getClassrooms()
  }

  render() {
    const { user } = this.props
    // if (!user.rights.can_view_records) {
    //   return <Redirect to="/" />
    // }
    const menu_list =
      <div className="list-group">
        <Link to="/records" className="list-group-item"><i className="fa fa-angle-right"></i> Students</Link>
        <Link to="/records/classlist" className="list-group-item"><i className="fa fa-angle-right"></i> Class Lists</Link>
        <Link to="/records/teachers" className="list-group-item"><i className="fa fa-angle-right"></i> Teachers</Link>
        <Link to="/records/staffs" className="list-group-item"><i className="fa fa-angle-right"></i> Support Staffs</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Records" />
          <div className="page_body">
            <Route
              path="/records"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Students} exact />
                  <Route path={`${url}/student/:id`} component={Students} />
                  <Route path={`${url}/teachers`} component={Teachers} exact />
                  <Route path={`${url}/teachers/:id`} component={Teachers} />
                  <Route path={`${url}/staffs`} component={Staffs} exact />
                  <Route path={`${url}/staffs/:id`} component={Teachers} />
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
}), { getClasses, getClassrooms })(Records);

