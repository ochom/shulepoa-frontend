import React, { Component } from 'react'
import { connect } from 'react-redux'
import person_icon from '../../../images/person_icon.png'
import { getLogbook } from '../actions'

export class LogBook extends Component {

  componentDidMount() {
    const { match: { params: { pk } } } = this.props
    console.log(pk)
    this.props.getLogbook(pk)
  }

  calculateTT1 = () => {
    window.looper = setInterval(() => {
      var startDate = new Date(this.props.logbook.created);
      var currentDate = new Date();
      var diff = currentDate - startDate;
      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var m = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      var s = Math.floor(diff % (1000 * 60) / (1000));

      h = (h < 10) ? '0' + h : h;
      m = (m < 10) ? '0' + m : m;
      s = (s < 10) ? '0' + s : s;
      var timeElapse = d + ':' + h + ':' + m + ':' + s;
      return timeElapse;
    }, 1000);
  }

  calculateTT2 = () => {
    var startDate = new Date(this.props.logbook.created);
    var currentDate = new Date(this.props.logbook.analysed_at);
    var diff = currentDate - startDate;
    var d = Math.floor(diff / (1000 * 60 * 60 * 24));
    var h = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var m = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    var s = Math.floor(diff % (1000 * 60) / (1000));

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    var timeElapse = d + ':' + h + ':' + m + ':' + s;
    return timeElapse;
  }

  componentWillUnmount() {
    clearInterval(window.looper)
  }

  render() {
    const { constants: { GENDERS, MARITAL_STATUSES }, logbook, records: { patients }, users } = this.props;
    if (!logbook) {
      return (<div className="col-md-8 mx-auto alert alert-secondary">Loading...</div>)
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
                  <span className="m-0">Name:</span>
                  <span style={{ float: "right" }}>{(patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).fullname : ""}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Sex:</span>
                  <span style={{ float: "right" }}>{GENDERS[(patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).sex : 0]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">DoB:</span>
                  <span style={{ float: "right" }}>{new Date((patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).dob : 0).toDateString("en-UK")}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Marriage:</span>
                  <span style={{ float: "right" }}>{MARITAL_STATUSES[(patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).marital_status : 0]}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Mobile:</span>
                  <span style={{ float: "right" }}>{(patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).phone : ""}</span>
                </li>
                <li className="list-group-item">
                  <span className="m-0">Address:</span>
                  <span style={{ float: "right" }}>{`${(patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).county : ""}, ${(patients.length > 0 && patients.find(patient => patient.id === logbook.patient_id)) ? patients.find(patient => patient.id === logbook.patient_id).country : ""}`}</span>
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
                        <span style={{ float: "right" }}>{new Date(logbook.created).toDateString("en-UK")}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Investigation:</span>
                        <span style={{ float: "right" }}>{logbook.investigation}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Sampled By:</span>
                        <span style={{ float: "right" }}>
                          {(users.length > 0 && users.find(u => u.id === logbook.created_by)) ? users.find(u => u.id === logbook.created_by).username : "---"}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Sampling Notes:</span><br />
                        <span style={{ float: "right", marginLeft: "10vw" }}>{logbook.sampling_comment}</span>
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
                        <span style={{ float: "right" }}>{!logbook.is_analysed ? this.calculateTT1() : this.calculateTT2()}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Analysed By:</span>
                        <span style={{ float: "right" }}>{(users.length > 0 && users.find(u => u.id === logbook.analysed_by)) ? users.find(u => u.id === logbook.analysed_by).username : "---"}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="m-0">Analysis Notes:</span><br />
                        <span style={{ float: "right", marginLeft: "10vw" }}>{logbook.is_analysed ? logbook.analysis_comment : "---"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }
}

export default connect(state => ({
  records: state.records,
  logbook: state.radiology.logbook,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  users: state.hospital.users
}), { getLogbook })(LogBook)
