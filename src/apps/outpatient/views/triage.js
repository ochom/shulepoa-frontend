import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { loadTriageQueue, addVitals } from '../actions'

export class Triage extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,


    patient: null,
    health_file: null,
    bp_systolic: "",
    bp_diastolic: "",
    hypertensive: "",
    pulse: "",
    mass: "",
    height: "",
    bmi: "",
    bmi_index: "",
    temperature: "",
    triage_note: "",

  }

  componentDidMount() {
    this.props.loadTriageQueue();
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onEditVitals = (data) => this.setState({
    showModal: true,
    hypertension: 'secondary',
    bmi: 'secondary',

    selected_queue_data: data,
    patient: data.patient_details.id,
    health_file: data.id,
    bp_systolic: "",
    bp_diastolic: "",
    pulse: "",
    mass: "",
    height: "",
    temperature: "",
    triage_note: "",

  })



  onChange = (e) => this.setState({ [e.target.name]: e.target.value }, () => this.calcBMI_HP());

  calcBMI_HP = () => {
    const { mass, height, bp_systolic, bp_diastolic } = this.state;
    // calculate hypertension
    var hypertension_state = null;
    if ((bp_systolic >= 100 && bp_systolic < 130) && (bp_diastolic >= 60 && bp_diastolic < 85)) {
      hypertension_state = 'success'
    } else if ((bp_systolic >= 130 && bp_systolic < 140) && (bp_diastolic >= 85 && bp_diastolic < 90)) {
      hypertension_state = 'info'
    } else if ((bp_systolic >= 140 && bp_systolic < 150) && (bp_diastolic >= 90 && bp_diastolic < 100)) {
      hypertension_state = 'primary'
    } else if ((bp_systolic >= 150 && bp_systolic < 160) && (bp_diastolic >= 100 && bp_diastolic < 110)) {
      hypertension_state = 'warning'
    } else if (bp_systolic >= 180 && bp_diastolic >= 110) {
      hypertension_state = 'danger'
    } else {
      hypertension_state = 'danger'
    }

    // calculate bmi
    var bmi = (mass * 1.0 / (height * height)).toFixed(2);
    var bmi_state = null;
    if (bmi < 18.5) {
      bmi_state = 'warning'
    } else if (bmi >= 18.5 && bmi < 25.0) {
      bmi_state = 'success'
    } else if (bmi >= 25.0 && bmi < 30.0) {
      bmi_state = 'warning'
    } else {
      bmi_state = 'danger'
    }
    this.setState({ hypertension: hypertension_state, bmi: bmi_state });
  }

  onSubmitVitals = (e) => {
    e.preventDefault();
    const {
      patient,
      health_file,
      bp_systolic,
      bp_diastolic,
      pulse,
      mass,
      height,
      temperature,
      triage_note, } = this.state;

    const data = {
      patient,
      health_file,
      bp_systolic,
      bp_diastolic,
      pulse,
      mass,
      height,
      temperature,
      triage_note,
    }
    this.props.addVitals(data);
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { triage_queue } = this.props.outpatient;
    const queue_list = triage_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient_details.fullname}</td>
        <td>{queue.patient_details.id}</td>
        <td>{queue.patient_details.phone}</td>
        <td>{new Date(queue.created_at).toLocaleString('en-UK')}</td>
        <td>In line</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onEditVitals(queue)}><i className="fa fa-edit"></i> Edit</button></td>
      </tr>
    );

    const edit_vitals_view =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>Create patient vitals</ModalHeader>
        <form onSubmit={this.onSubmitVitals}>
          <ModalBody>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Hypertension Screening/Blood Pressure</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-3">
                <label>BP Systolic</label>
                <input className="form-control form-control-sm"
                  name="bp_systolic" onChange={this.onChange} value={this.state.bp_systolic}
                  placeholder="100-130" />
              </div>
              <div className="form-group col-3">
                <label>BP Diastolic</label>
                <input className="form-control form-control-sm"
                  name="bp_diastolic" onChange={this.onChange} value={this.state.bp_diastolic}
                  placeholder="60-85" />
              </div>
              <div className="form-group col-3">
                <label>Pulse (Heart Rate)</label>
                <input className="form-control form-control-sm"
                  name="pulse" onChange={this.onChange} value={this.state.pulse}
                  placeholder="60-77" />
              </div>
              <div className="form-group col-3 mx-auto">
                <label>Hypertension Meter</label>
                <div className={`form-control form-control-sm bg-${this.state.hypertension}`}></div>
              </div>
            </div>
            <div className="cu-bg-primary py-1 px-3 my-2 rounded">Physical Vitals</div>
            <div className="row col-12 mx-auto">
              <div className="form-group col-3">
                <label>Temperature <small>(<sup>o</sup>C)</small></label>
                <input className="form-control form-control-sm" required={true}
                  name="temperature" onChange={this.onChange} value={this.state.temperature}
                  placeholder="0.0" />
              </div>
              <div className="form-group col-3">
                <label>Mass <small>(Kg)</small> </label>
                <input className="form-control form-control-sm"
                  name="mass" onChange={this.onChange} value={this.state.mass}
                  placeholder="0.0" />
              </div>
              <div className="form-group col-3">
                <label>Height (m)</label>
                <input className="form-control form-control-sm"
                  name="height" onChange={this.onChange} value={this.state.height}
                  placeholder="0.0" />
              </div>
              <div className="form-group col-3 mx-auto">
                <label>BMI Meter</label>
                <div className={`form-control form-control-sm bg-${this.state.bmi}`}></div>
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
              onSubmit={this.onSubmitVitals}>
              <i className="fa fa-check"></i> Save</Button>{' '}
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >



    return (
      <div className="col-md-10 mx-auto mt-3">
        {edit_vitals_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Triage Queue</div>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>Patient's Name</th>
                  <th># Reg.</th>
                  <th>Mobile</th>
                  <th>Queued at</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {queue_list}
              </tbody>
            </table>
          </div>
        </div>

      </div >
    )
  }
}

export default connect(state => ({
  outpatient: state.outpatient,
}), { loadTriageQueue, addVitals })(Triage)
