import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addVital, deleteVital, getVitals, updateVital } from '../actions'

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

  componentDidMount = () => {
    this.props.getVitals();
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

  onDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <div className="card">
              <div className="card-header">Delete</div>
              <div className="card-body">
                <p>You want to delete this file?</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-danger"
                  onClick={() => {
                    this.props.deleteVital(id);
                    onClose();
                  }}>Yes, Delete it!
                </button>
                <button className="btn btn-sm btn-secondary ml-2" onClick={onClose}>No</button>
              </div>
            </div>
          </div>
        );
      }
    });
  }


  render() {
    const { appointment, vitals } = this.props;
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
                <label>BP Systolic</label>
                <input className="form-control form-control-sm"
                  name="bp_systolic" onChange={this.onChange} value={this.state.bp_systolic}
                  placeholder="100-130" />
              </div>
              <div className="form-group col-md-4">
                <label>BP Diastolic</label>
                <input className="form-control form-control-sm"
                  name="bp_diastolic" onChange={this.onChange} value={this.state.bp_diastolic}
                  placeholder="60-85" />
              </div>
              <div className="form-group col-md-4">
                <label>Pulse (Heart Rate)</label>
                <input className="form-control form-control-sm"
                  name="pulse" onChange={this.onChange} value={this.state.pulse}
                  placeholder="60-77" />
              </div>
            </div>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Physical Vitals</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-md-4">
                <label>Temperature <small>(<sup>o</sup>C)</small></label>
                <input className="form-control form-control-sm" required={true}
                  name="temperature" onChange={this.onChange} value={this.state.temperature}
                  placeholder="0.0" />
              </div>
              <div className="form-group col-md-4">
                <label>Mass <small>(Kg)</small> </label>
                <input className="form-control form-control-sm"
                  name="mass" onChange={this.onChange} value={this.state.mass}
                  placeholder="0.0" />
              </div>
              <div className="form-group col-md-4">
                <label>Height (m)</label>
                <input className="form-control form-control-sm"
                  name="height" onChange={this.onChange} value={this.state.height}
                  placeholder="0.0" />
              </div>
            </div>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Nursing/Vitals Notes</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <label>Nursing notes</label>
                <textarea className="form-control form-control-sm"
                  name="triage_note" onChange={this.onChange} value={this.state.triage_note}
                  placeholder="Other nusing observations..." >
                </textarea>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</Button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >
    return (
      <>
        {vital_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Vitals</div>
            <button
              className="btn btn-sm "
              onClick={this.onNewVital}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <th>BP</th>
                  <th>Pulse</th>
                  <th>Temp.</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>MBI</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {vitals.filter(vital => vital.appointment_id === appointment.id).map((vital, index) =>
                  <tr key={index}>
                    <td>{vital.bp_systolic}/{vital.bp_diastolic}</td>
                    <td>{vital.pulse}</td>
                    <td>{vital.temperature} <sup>0</sup>C</td>
                    <td>{vital.height}m</td>
                    <td>{vital.mass}Kg</td>
                    <td>{this.calculateBMI(vital)}</td>
                    <td className="text-center">
                      <button className="btn btn-sm mr-2 border-none btn-success"
                        onClick={() => this.onEditVital(vital)}><i className="fa fa-edit"></i></button>
                      <button className="btn btn-sm border-none btn-danger"
                        onClick={() => this.onDelete(vital.id)}><i className="fa fa-trash"></i></button>
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
  vitals: state.outpatient.vitals,
  common: state.common,
}), { getVitals, addVital, updateVital, deleteVital })(Vital)
