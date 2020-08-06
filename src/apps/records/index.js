import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Patients from './views/patients'
import Sidenav from '../common/sidenav'
import { connect } from 'react-redux'
import Schemes from './views/schemes'
import HealthFiles from './views/health_files'
import HealthFileDetails from './views/health_file_details'
import { loadService, loadInsurance } from '../hospital/actions'

export class Records extends Component {

  componentDidMount() {
    this.props.loadInsurance();
    this.props.loadService();
  }

  render() {
    const menu_list =
      <div className="list-group">
        <Link to="/records" className="list-group-item"><i className="fa fa-user"></i> Registration</Link>
        <Link to="/outpatient/triage" className="list-group-item"><i className="fa fa-thermometer-half"></i> Triage</Link>
      </div>
    return (
      <>
        <Sidenav menus={menu_list} />
        <div className="row col-12 mx-auto page-container">
          <Route
            path="/records"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} component={Patients} exact />
                <Route path={`${url}/patients/:patient_id/insurance`} component={Schemes} />
                <Route path={`${url}/patients/:patient_id/health-files`} component={HealthFiles} exact />
                <Route path={`${url}/patients/:patient_id/health-files/:pk`} component={HealthFileDetails} />
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

export default connect(mapStateToProps, { loadService, loadInsurance })(Records);

