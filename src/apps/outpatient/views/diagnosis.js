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
    const { icd_10 } = this.props.common.CONSTANTS;
    const { diagnosis } = this.props;
    const observation_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_observation ? 'Edit diagnosis' : 'Add diagnosis'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <label>Disease name</label>
                <select className="form-control form-control-sm" name="search" required={true}
                  value={this.state.search} onChange={this.onChange} placeholder="Search..." >
                  {icd_10.map((disease, index) =>
                    <option key={index} value={disease.code}>{disease.desc}</option>
                  )}
                </select>
              </div>
              <div className="form-group col-12">
                <label>Disease name</label>
                <input className="form-control form-control-sm" name="disease" required={true}
                  value={this.state.disease} onChange={this.onChange} placeholder="Search..." />
              </div>
              <div className="form-group col-12">
                <label>ICD 10</label>
                <input className="form-control form-control-sm" name="icd_10" required={true}
                  value={this.state.icd_10} onChange={this.onChange} placeholder="0" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >


    return (
      <>
        {observation_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Disease diagnosis</b></div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm "
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
