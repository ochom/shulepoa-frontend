import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { loadService } from '../hospital/actions'
import Results from './views/results'
import Sampling from './views/sampling'
import logbooks from './views/logbooks'
import logbook from './views/logbook'

export class Radiology extends Component {
  componentDidMount() {
    this.props.loadService();
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/radiology/queue" className="list-group-item"><i className="fa fa-users"></i> Queue</Link>
        <Link to="/radiology/results" className="list-group-item"><i className="fa fa-edit"></i> Result entry</Link>
        <Link to="/radiology/logbooks" className="list-group-item"><i className="fa fa-book"></i> Logbook</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="row col-12 mx-auto page-container">
          <Route
            path="/radiology"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} component={Sampling} exact />
                <Route path={`${url}/queue`} component={Sampling} />
                <Route path={`${url}/results`} component={Results} />
                <Route path={`${url}/logbooks`} component={logbooks} exact />
                <Route path={`${url}/logbooks/:pk`} component={logbook} />
              </>
            )}
          />
        </div>
      </>
    )
  }
}
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { loadService })(Radiology);

