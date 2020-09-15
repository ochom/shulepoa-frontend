import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLogbooks } from '../actions'


export class LogBooks extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,
    verification_comment: "",

  }

  componentDidMount() {
    this.props.getLogbooks();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { constants: { GENDERS }, logbooks, records: { patients } } = this.props;
    return (
      <div className="col-12 mx-auto mt-2">
        <div className="card">
          <div className="card-header py-1 px-3">Logbooks</div>
          <div className="card-body p-0">
            {this.props.common.silent_processing ?
              <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
            }
            <table className="table table-sm table-striped table-bordered">
              <thead className="">
                <tr>
                  <th>#Log</th>
                  <th>Patient's Name</th>
                  <th>Sex</th>
                  <th>Test</th>
                  <th>Result</th>
                  <th className="text-center">Analyzed</th>
                  <th className="text-center">Verified</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {logbooks.map((logbook, index) =>
                  <tr key={index}>
                    <td>{logbook.id}</td>
                    <td>{patients.length > 0 ? patients.find(p => p.id === logbook.patient_id).fullname : ""}</td>
                    <td>{GENDERS[patients.length > 0 ? patients.find(p => p.id === logbook.patient_id).sex : 0]}</td>
                    <td>{logbook.investigation}</td>
                    <td>{logbook.result ? logbook.result : <i className="fa fa-minus text-danger"></i>}</td>
                    <td className="text-center">{logbook.is_analysed ? <i className="fa fa-check text-danger"></i> : <i className="fa fa-minus text-secondary"></i>}</td>
                    <td className="text-center">{logbook.is_verified ? <i className="fa fa-check text-success"></i> : <i className="fa fa-minus text-primary"></i>}</td>
                    <td>
                      <Link className="btn btn-sm btn-primary" to={`/laboratory/logbooks/${logbook.id}`}
                      ><i className="fa fa-book"></i> Open</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  logbooks: state.laboratory.logbooks,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  records: state.records,
  common: state.common,
}), { getLogbooks })(LogBooks)
