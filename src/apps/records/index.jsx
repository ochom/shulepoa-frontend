import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import { getClasses, getClassrooms } from '../organization/actions'
import Patients from './views/patients'

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
        <Link to="/records/staff" className="list-group-item"><i className="fa fa-angle-right"></i> Staff</Link>
        <Link to="/records/classlist" className="list-group-item"><i className="fa fa-angle-right"></i> Class Lists</Link>
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
                  <Route path={`${url}`} component={Patients} exact />
                  <Route path={`${url}/student/:id`} component={Patients} />
                  <Route path={`${url}/staff`} component={Patients} exact />
                  <Route path={`${url}/staff/:id`} component={Patients} />
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

