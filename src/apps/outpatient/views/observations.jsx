import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteData } from '../../common/actions'
import { addObservation, deleteObservation, updateObservation } from '../actions'

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

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewObservation = () => {
    this.setState({
      selected_observation: null,
      complaint: "",
      period: "",
      period_units: "",
      pre_med_note: "",
      physical_examination_note: "",
    }, () => this.toggleModal());
  }

  onEditObservation = (data) => {
    this.setState({
      selected_observation: data,
      complaint: data.complaint,
      period: data.period,
      period_units: data.period_units,
      pre_med_note: data.pre_med_note,
      physical_examination_note: data.physical_examination_note,
    }, () => this.toggleModal());
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
      appointment_id: this.props.appointment.id,
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
    this.toggleModal();
  }

  render() {
    const { TIME_UNITS } = this.props.common.CONSTANTS;
    const { appointment, rights } = this.props;
    const observation_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_observation ? 'Edit observation details' : 'Add observation and examination'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-5">
                <input className="form-control form-control-sm" name="complaint" required={true}
                  value={this.state.complaint} onChange={this.onChange} />
                <label>Complaint</label>
              </div>
              <div className="form-group col-3">
                <input className="form-control form-control-sm" name="period" required={true}
                  value={this.state.period} onChange={this.onChange} />
                <label>Period</label>
              </div>
              <div className="form-group col-4">
                <select className="form-control form-control-sm" name="period_units" data-value={this.state.period_units}
                  required={true} value={this.state.period_units} onChange={this.onChange}>
                  <option value=""></option>
                  {TIME_UNITS.map((unit, index) => <option key={index} value={unit}>{unit}</option>)}
                </select>
                <label>Units</label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="pre_med_note"
                  value={this.state.pre_med_note} onChange={this.onChange}></textarea>
                <label>Pre-medication Note</label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="physical_examination_note"
                  value={this.state.physical_examination_note} onChange={this.onChange}></textarea>
                <label>Physical Examination Note</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>


    return (
      <>
        {observation_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Observations &nbsp; &amp; &nbsp; Pre-medications</b></div>
            {rights.can_add_observation ?
              <button
                className="btn btn-sm "
                onClick={this.onNewObservation}><i className="fa fa-plus-circle mr-2"></i> Add
              </button> : null}
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Complaint</th>
                  <th>Period</th>
                  <th>Pre-med</th>
                  <th>P.E</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointment.observations.map((observation, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{observation.complaint}</td>
                    <td>{observation.period} {observation.period_units}</td>
                    <td>{observation.pre_med_note}</td>
                    <td>{observation.physical_examination_note}</td>
                    <td>
                      {rights.can_add_observation ? <>
                        <button className="btn btn-sm mr-2 border-none btn-success"
                          onClick={() => this.onEditObservation(observation)}><i className="fa fa-edit"></i></button>

                        <button className="btn btn-sm border-none btn-danger"
                          onClick={() => deleteData(observation.id, this.props.deleteObservation)}><i className="fa fa-trash"></i></button>
                      </> : null}
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
  appointment: state.outpatient.appointment,
  common: state.common,
  rights: state.auth.user.rights
}), { addObservation, updateObservation, deleteObservation })(Observation)
