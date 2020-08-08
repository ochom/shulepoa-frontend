import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import person_icon from '../../../images/person_icon.png'

export class LogBook extends Component {
  state = {
    tt: "---",
  }

  componentDidMount() {
    const logbook = this.props.logbook;
    if (logbook) {
      if (logbook.sampled_at && logbook.verified_at) {
        var startTime = new Date(logbook.sampled_at);
        var endTime = new Date(logbook.verified_at);
        var diff = endTime - startTime;
        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var m = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
        var s = Math.floor(diff % (1000 * 60) / (1000));

        h = (h < 10) ? '0' + h : h;
        m = (m < 10) ? '0' + m : m;
        s = (s < 10) ? '0' + s : s;
        var timeElapse = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
        this.setState({ tt: timeElapse });
      }
    }
  }
  render() {
    const { GENDERS, MARITAL_STATUSES } = this.props.constants;
    const { logbook } = this.props;
    if (!logbook) {
      return (<Redirect to="/radiology/logbooks" />)
    }
    return (
      <div className="row col-12 mx-auto mt-3">
        <div className="row col-12 mx-auto mt-2" style={{ minHeight: "80vh" }}>
          <div className="col-3">
            <div className="patient_profile row border border-light rounded ">
              <div className="row col-12 mx-auto justify-content-center"
                style={{ marginTop: "2vw", zIndex: "1" }}>
                <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                <p className="cu-text-primary col-12 text-center text-white mt-2">Patient Profile</p>
              </div>
              <ul className="w-100 mx-auto list-group mt-2">
                <li className="list-group-item">
                  <span className="m-0">Name:</span> <span style={{ float: "right" }}>{logbook.patient_details.fullname}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Sex:</span> <span style={{ float: "right" }}>{GENDERS[logbook.patient_details.sex]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">DoB:</span> <span style={{ float: "right" }}>{new Date(logbook.patient_details.dob).toDateString()}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Marriage:</span> <span style={{ float: "right" }}>{MARITAL_STATUSES[logbook.patient_details.marital_status]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Mobile:</span> <span style={{ float: "right" }}>{logbook.patient_details.phone}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Address:</span> <span style={{ float: "right" }}>{`${logbook.patient_details.county}, ${logbook.patient_details.country}`}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-7">
            <div style={{ maxHeight: "75vh", overflowY: "auto" }} className="row bg-transparent pb-3 rounded ">
              <div className="col-12">
                <div className="card">
                  <div className="card-header cu-bg-secondary py-1 px-3">
                    <div className="py-1 px-2"><b>Logbook Details</b></div>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span className="m-0">Logbook Number:</span>
                        <span style={{ float: "right" }}>{logbook.id}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Date:</span>
                        <span style={{ float: "right" }}>{new Date(logbook.sampled_at).toDateString()}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Investigation:</span>
                        <span style={{ float: "right" }}>{logbook.investigation}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Received By:</span>
                        <span style={{ float: "right" }}>{logbook.sampled_by_user.username}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="card">
                  <div className="card-header cu-bg-secondary py-1 px-3">
                    <div className="py-1 px-2"><b>Result Data</b></div>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span className="m-0">Result</span>
                        <span style={{ float: "right" }}>{logbook.is_analysed ? logbook.result : "---"}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Turn around:</span>
                        <span style={{ float: "right" }}>{this.state.tt}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Analysed By:</span>
                        <span style={{ float: "right" }}>{logbook.is_analysed ? logbook.analysed_by_user.username : "---"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  logbook: state.radiology.selected_logbook,
  service_list: state.hospital.service_list,
  constants: state.common.CONSTANTS,
}))(LogBook)
