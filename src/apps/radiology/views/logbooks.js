import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLogBooks } from '../actions'
import store from '../../../reducer/store'


export class LogBooks extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,
    verification_comment: "",

  }

  componentDidMount() {
    this.props.getLogBooks();
  }

  componentWillUnmount() {
    clearInterval();
  }

  onViewLogbook = (data) => {
    store.dispatch({ type: 'SELECT_RAD_LOGBOOK', payload: data })
    this.props.history.push('/radiology/logbooks/' + data.id);
  }



  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { GENDERS } = this.props.constants;
    const { logbooks } = this.props.radiology;
    const queue_list = logbooks.map((logbook, index) =>
      <tr key={index}>
        <td>{logbook.id}</td>
        <td>{logbook.patient_details.fullname}</td>
        <td>{GENDERS[logbook.patient_details.sex]}</td>
        <td>{logbook.investigation}</td>
        <td>{logbook.result ? logbook.result : "---"}</td>
        <td>{logbook.is_analysed ? "Yes" : "NO"}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onViewLogbook(logbook)}><i className="fa fa-book"></i> Open</button></td>
      </tr>
    );


    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-1 px-3">Radilogy Logs</div>
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
                  <th>Analyzed</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {queue_list}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  radiology: state.radiology,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getLogBooks })(LogBooks)
