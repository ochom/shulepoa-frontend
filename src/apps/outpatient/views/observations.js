import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getObservations, addObservation, updateObservation, deleteObservation } from '../actions'

export class Observation extends Component {
  state = {
    showModal: false,

    selected_observation: null,
    complaint: "",
    period: "",
    period_units: "",
    pre_med_note: "",
    physical_examination_note: "",
  }

  componentDidMount = () => {
    this.props.getObservations(this.props.health_file.id);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewObservation = () => {
    this.setState({
      showModal: !this.state.showModal,
      selected_observation: null,
      complaint: "",
      period: "",
      period_units: "",
      pre_med_note: "",
      physical_examination_note: "",
    });
  }

  onEditObservation = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      selected_observation: data,
      complaint: data.complaint,
      period: data.period,
      period_units: data.period_units,
      pre_med_note: data.pre_med_note,
      physical_examination_note: data.physical_examination_note,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_observation,
      complaint,
      period,
      period_units,
      pre_med_note,
      physical_examination_note } = this.state;

    const data = {
      health_file: this.props.health_file.id,
      complaint,
      period,
      period_units,
      pre_med_note,
      physical_examination_note
    }
    if (selected_observation) {
      this.props.updateObservation(this.props.health_file.id, selected_observation.id, data);
    } else {
      this.props.addObservation(this.props.health_file.id, data);
    }
    this.setState({ showModal: !this.state.showModal });
  }

  onDelete = (data) => {
    this.props.deleteObservation(this.props.health_file.id, data.id);
  }

  render() {
    const { TIME_UNITS } = this.props.common.CONSTANTS;
    const { health_file, observations } = this.props;
    const observation_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_observation ? 'Edit observation details' : 'Add observation and examination'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Complaint</label>
                <input className="form-control form-control-sm" name="complaint" required={true}
                  value={this.state.complaint} onChange={this.onChange} placeholder="Complaint..." />
              </div>
              <div className="form-group col-3">
                <label>Period</label>
                <input className="form-control form-control-sm" name="period" required={true}
                  value={this.state.period} onChange={this.onChange} placeholder="0" />
              </div>
              <div className="form-group col-4">
                <label>Units</label>
                <select className="form-control form-control-sm" name="period_units" required={true}
                  value={this.state.period_units} onChange={this.onChange} >
                  <option value="">Select</option>
                  {TIME_UNITS.map((unit, index) => <option key={index} value={unit}>{unit}</option>)}
                </select>
              </div>
              <div className="form-group col-12">
                <label>Pre-medication Note</label>
                <textarea className="form-control form-control-sm" name="pre_med_note"
                  value={this.state.pre_med_note} onChange={this.onChange} placeholder="Pre Meds..."></textarea>
              </div>
              <div className="form-group col-12">
                <label>Physical Examination Note</label>
                <textarea className="form-control form-control-sm" name="physical_examination_note"
                  value={this.state.physical_examination_note} onChange={this.onChange} placeholder="Any physical Examination..."></textarea>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >


    return (
      <>
        {observation_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Observations &nbsp; &amp; &nbsp; Pre-medications</b></div>
            <button
              className="btn btn-sm "
              onClick={this.onNewObservation}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Complaint</th>
                  <th>Period</th>
                  <th>Pre-med</th>
                  <th>P.E</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {observations.map((observation, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{observation.complaint}</td>
                    <td>{observation.period} {observation.period_units}</td>
                    <td>{observation.pre_med_note}</td>
                    <td>{observation.physical_examination_note}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditObservation(observation)}><i className="fa fa-edit"></i></button>
                      {` | `}
                      <button className="btn btn-sm p-0 border-none text-danger"
                        onClick={() => this.onDelete(observation)}><i className="fa fa-close"></i></button>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Triage Vitals</b></div>
          </div>
          <div className="card-body p-0">
            {health_file.file_vitals.length > 0 ? <ul className="list-group">
              <li className="list-group-item">
                <span className="m-0">Blood Pressure:</span>
                <span style={{ float: "right" }}>{`${health_file.file_vitals[0].bp_systolic}/${health_file.file_vitals[0].bp_diastolic}`} bpm</span>
              </li>
              <li className="list-group-item">
                <span className="m-0">Pulse:</span>
                <span style={{ float: "right" }}>{health_file.file_vitals[0].pulse} bpm</span>
              </li>
              <li className="list-group-item">
                <span className="m-0">Temperature:</span>
                <span style={{ float: "right" }}>{health_file.file_vitals[0].temperature} <sup>o</sup>C</span>
              </li>
              <li className="list-group-item">
                <span className="m-0">Weight:</span>
                <span style={{ float: "right" }}>{health_file.file_vitals[0].mass} Kgs</span>
              </li>
              <li className="list-group-item">
                <span className="m-0">Height:</span>
                <span style={{ float: "right" }}>{health_file.file_vitals[0].height} m</span>
              </li>
            </ul>
              : null}
          </div>
        </div>
      </>
    )
  }
}
export default connect(state => ({
  health_file: state.outpatient.selected_health_file,
  observations: state.outpatient.observations,
  common: state.common,
}), { getObservations, addObservation, updateObservation, deleteObservation })(Observation)
