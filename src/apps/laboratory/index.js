import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import { loadService } from '../hospital/actions'
import Results from './views/results'
import Sampling from './views/sampling'
import verifications from './views/verifications'
import logbooks from './views/logbooks'
import logbook from './views/logbook'
import Topnav from '../common/topnav'

export class Laboratory extends Component {
  componentDidMount() {
    this.props.loadService();
  }
  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/laboratory/sampling" className="list-group-item"><i className="fa fa-flask"></i> Sampling</Link>
        <Link to="/laboratory/results" className="list-group-item"><i className="fa fa-edit"></i> Result entry</Link>
        <Link to="/laboratory/result-verification" className="list-group-item"><i className="fa fa-check-circle"></i> Verification</Link>
        <Link to="/laboratory/logbooks" className="list-group-item"><i className="fa fa-book"></i> Logbook</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="page_container">
          <Topnav page="Laboratory" />
          <div className="page_body">
            <Route
              path="/laboratory"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Sampling} exact />
                  <Route path={`${url}/sampling`} component={Sampling} />
                  <Route path={`${url}/results`} component={Results} />
                  <Route path={`${url}/result-verification`} component={verifications} />
                  <Route path={`${url}/logbooks`} component={logbooks} exact />
                  <Route path={`${url}/logbooks/:pk`} component={logbook} />
                </>
              )}
            />
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { loadService })(Laboratory);

