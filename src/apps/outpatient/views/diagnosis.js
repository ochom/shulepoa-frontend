import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { addObservation, updateObservation } from '../actions'

export class Diagnosis extends Component {
  state = {
    showModal: false,

    selected_observation: null,
    complaint: "",
    period: "",
    period_units: "",
    pre_med_note: "",
    physical_examination_note: "",
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
      this.props.updateObservation(selected_observation.id, data);
    } else {
      this.props.addObservation(data);
    }
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { TIME_UNITS } = this.props.common.CONSTANTS;
    const { diagnosis } = this.props;
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
          <div className="card-header custom-bg-secondary py-1 px-3">
            <div
              style={{ fontSize: "1vw", float: "left" }} className="py-1 px-2">Disease diagnosis</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm bg-light text-dark py-0 px-2 mr-auto mt-1"
              onClick={this.onNewObservation}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Diagnosis</th>
                  <th>ICD 10</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {diagnosis.map((observation, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{observation.complaint}</td>
                    <td>{observation.period}</td>
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
      </>
    )
  }
}
export default connect(state => ({
  health_file: state.outpatient.selected_health_file,
  diagnosis: state.outpatient.diagnosis,
  common: state.common,
}), { addObservation, updateObservation })(Diagnosis)
