import React, { Component } from 'react'
import { connect } from "react-redux"
import { Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import Bug from './views/issue'
import Bugs from './views/issues'
import { getUsers } from '../hospital/actions'


class Issues extends Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <div>
        <Sidenav menus={null} />
        <div className="page_container">
          <Topnav page="Issues and Bugs" />
          <div className="page_body">
            <Route path="/issues" exact component={Bugs} />
            <Route path="/issues/:bug_id" component={Bug} />
          </div>
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  bugs: state.bugs.issues
}), { getUsers })(Issues)