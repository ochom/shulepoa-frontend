import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Sidenav from '../common/sidenav'
import Topnav from '../common/topnav'
import { getServices, loadInsurance } from '../hospital/actions'
import Patient from './views/patient'
import Patients from './views/patients'

export class Records extends Component {

  componentDidMount() {
    this.props.loadInsurance();
    this.props.getServices();
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
        <div className="page_container">
          <Topnav page="Records" />
          <div className="page_body">
            <Route
              path="/records"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}`} component={Patients} exact />
                  <Route path={`${url}/patients/:patient_id`} component={Patient} />
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

export default connect(mapStateToProps, { getServices, loadInsurance })(Records);

