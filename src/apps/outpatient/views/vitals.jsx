import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteData } from '../../common/actions'
import { addVital, deleteVital, updateVital } from '../actions'

export class Vital extends Component {
  state = {
    showModal: false,

    selected_vital: null,
    bp_systolic: "",
    bp_diastolic: "",
    pulse: "",
    mass: "",
    height: "",
    temperature: "",
    triage_note: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewVital = () => {
    this.setState({
      selected_vital: null,
      bp_systolic: "",
      bp_diastolic: "",
      pulse: "",
      mass: "",
      height: "",
      temperature: "",
      triage_note: "",
    }, () => this.toggleModal());
  }

  onEditVital = (data) => {
    this.setState({
      selected_vital: data,
      bp_systolic: data.bp_systolic,
      bp_diastolic: data.bp_diastolic,
      pulse: data.pulse,
      mass: data.mass,
      height: data.height,
      temperature: data.temperature,
      triage_note: data.triage_note,
    }, () => this.toggleModal());
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_vital,
      bp_systolic,
      bp_diastolic,
      pulse,
      mass,
      height,
      temperature,
      triage_note, } = this.state;

    const data = {
      appointment_id: this.props.appointment.id,
      bp_systolic,
      bp_diastolic,
      pulse,
      mass,
      height,
      temperature,
      triage_note,
    }
    if (selected_vital) {
      this.props.updateVital(selected_vital.id, data);
    } else {
      this.props.addVital(data);
    }
    this.toggleModal()
  }

  calculateBMI = (vital) => {
    return (vital.mass * 1.0 / (vital.height * vital.height)).toFixed(2)
  }

  render() {
    const { appointment, rights } = this.props;
    const vital_view =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_vital ? 'Edit vitals' : 'Add vitals'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Hypertension Screening/Blood Pressure</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="50" max="200"
                  required={true}
                  name="bp_systolic"
                  onChange={this.onChange}
                  value={this.state.bp_systolic}
                />
                <label>BP Systolic</label>
              </div>
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="50" max="150"
                  required={true}
                  name="bp_diastolic" onChange={this.onChange} value={this.state.bp_diastolic}
                />
                <label>BP Diastolic</label>
              </div>
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="50" max="200"
                  required={true}
                  name="pulse" onChange={this.onChange} value={this.state.pulse}
                />
                <label>Pulse (Heart Rate)</label>
              </div>
            </div>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Vitals</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="20" max="60" step=".1"
                  required={true}
                  name="temperature" onChange={this.onChange} value={this.state.temperature}
                />
                <label>Temperature <small>(<sup>o</sup>C)</small></label>
              </div>
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="1" max="500" step=".01"
                  name="mass" onChange={this.onChange} value={this.state.mass}
                />
                <label>Mass <small>(Kg)</small> </label>
              </div>
              <div className="form-group col-md-4">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  min="0.2" max="3" step=".01"
                  name="height" onChange={this.onChange} value={this.state.height}
                />
                <label>Height (m)</label>
              </div>
            </div>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Notes</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm"
                  name="triage_note" onChange={this.onChange} value={this.state.triage_note}>
                </textarea>
                <label>Notes</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</Button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    return (
      <>
        {vital_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Vitals</div>
            {rights.can_add_vitals ?
              <button
                className="btn btn-sm "
                onClick={this.onNewVital}><i className="fa fa-plus-circle mr-2"></i> Add
              </button> : null}
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <th>BP(Sys/Dia)</th>
                  <th>Pulse</th>
                  <th>Temp.</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>MBI</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointment.vitals.map((vital, index) =>
                  <tr key={index}>
                    <td>{vital.bp_systolic}/{vital.bp_diastolic}bpm</td>
                    <td>{vital.pulse}bpm</td>
                    <td>{vital.temperature} <sup>0</sup>C</td>
                    <td>{vital.height}m</td>
                    <td>{vital.mass}Kg</td>
                    <td>{this.calculateBMI(vital)}</td>
                    <td className="text-center">
                      {rights.can_add_vitals ? <>
                        <button className="btn btn-sm mr-2 border-none btn-success"
                          onClick={() => this.onEditVital(vital)}><i className="fa fa-edit"></i></button>
                        <button className="btn btn-sm border-none btn-danger"
                          onClick={() => deleteData(vital.id, this.props.deleteVital)}><i className="fa fa-trash"></i></button>
                      </> : null}
                    </td>
                  </tr>
                )}
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
  vitals: state.outpatient.vitals,
  common: state.common,
  rights: state.auth.user.rights
}), { addVital, updateVital, deleteVital })(Vital)
