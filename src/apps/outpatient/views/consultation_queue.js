import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadAppointmentQueue } from '../actions'
import store from '../../../reducer/store'

export class AppointmentQueue extends Component {

  componentDidMount() {
    this.props.loadAppointmentQueue();
  }

  selectHealthFile = (data) => {
    store.dispatch({ type: 'SELECT_HEALTH_FILE', payload: data });
    this.props.history.push(`/outpatient/appointments/file/${data.id}`)
  }

  render() {
    const { appointment_queue } = this.props.outpatient;
    const queue_list = appointment_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient_details.fullname}</td>
        <td>{queue.patient_details.id}</td>
        <td>{queue.patient_details.phone}</td>
        <td>{new Date(queue.created_at).toLocaleString('en-UK')}</td>
        <td>{queue.is_discharged ? "YES" : "NO"}</td>
        <td className="text-center">
          <button onClick={() => this.selectHealthFile(queue)}
            className="btn btn-sm p-0 border-none text-success"><i className="fa fa-edit"></i> Open File</button>
          {` | `}
          <button onClick={() => this.selectHealthFile(queue)}
            className="btn btn-sm p-0 border-none text-danger"><i className="fa fa-close"></i> Close File</button>

        </td>
      </tr>
    );

    return (
      <div className="col-md-12 mx-auto mt-3">
        <div className="card card-header bg-white py-1 px-3">
          <div className="py-1 px-2">
            <Link to="/">Home</Link>  &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/outpatient">Outpatient</Link> &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/outpatient/appointment-queue">Appointment Queue</Link>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="custom-text-primary">
                <tr>
                  <th>Patient's Name</th>
                  <th># Reg.</th>
                  <th>Mobile</th>
                  <th>Queued at</th>
                  <th>Discharged</th>
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
  outpatient: state.outpatient,
}), { loadAppointmentQueue, })(AppointmentQueue)
