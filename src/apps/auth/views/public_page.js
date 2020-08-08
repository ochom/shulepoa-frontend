import React, { Component } from 'react'
import sal from 'sal.js'
import { connect } from 'react-redux';
import { logout } from '../actions'
import Sidenav from '../../common/sidenav';
import { Redirect } from 'react-router-dom';

export class PublicPage extends Component {

  componentDidMount() {
    sal();
    console.log(this.props);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) {
      return <Redirect to={{ pathname: '/auth', state: { from: this.props.location } }} />
    }
    return (
      <>
        <Sidenav menus={null} />
        <div className="blur"></div>
        <div className="background_cover">
          <div className="preview">
            <h1 className="text-center text-success"><b>Why Am I Here ?</b></h1>
            <h3 className="text-center text-primary mt-4">
              Well you are here because you registered as a user in this hospital
            but your application has not been approve by the Administrator</h3>
          </div >
        </div>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(PublicPage)