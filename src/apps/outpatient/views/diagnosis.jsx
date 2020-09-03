import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addDiagnosis, deleteDiagnosis, getDiagnosis, updateDiagnosis } from '../actions'

export class Diagnosis extends Component {
  state = {
    showModal: false,
    search: "",
    search_result: [],

    selected_diagnosis: null,
    disease: "",
    icd_10: "",
  }

  componentDidMount() {
    this.props.getDiagnosis()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onSearch = (e) => {
    var search = e.target.value;
    var search_result = this.props.common.icd_10.length > 0 ?
      this.props.common.icd_10.filter(icd => icd.desc.includes(search.toLowerCase())).slice(0, 7) :
      []
    this.setState({ search_result: search_result })
  }

  onNewDiagnosis = () => {
    this.setState({
      search_result: [],
      selected_diagnosis: null,
      disease: "",
      icd_10: "",
    }, () => this.toggleModal());
  }

  onEditDiagnosis = (data) => {
    this.setState({
      search_result: [],
      selected_diagnosis: data,
      disease: data.disease,
      icd_10: data.icd_10,
    }, () => this.toggleModal());
  }

  selectDisease = (icd) => this.setState({
    disease: icd.desc, icd_10: icd.code, search_result: []
  })

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_diagnosis,
      disease,
      icd_10 } = this.state;

    const data = {
      appointment_id: this.props.appointment.id,
      disease,
      icd_10
    }
    if (selected_diagnosis) {
      this.props.updateDiagnosis(selected_diagnosis.id, data);
    } else {
      this.props.addDiagnosis(data);
    }
    this.toggleModal();
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
                    this.props.deleteDiagnosis(id);
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
    const { diagnosis, appointment } = this.props;
    const diagnosis_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_diagnosis ? 'Edit diagnosis' : 'Add diagnosis'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <label>Search</label>
                <input className="form-control form-control-sm" name="search"
                  onChange={this.onSearch} placeholder="Search..." />
                <ul className="list-group">
                  {this.state.search_result.map((icd, index) =>
                    <button className="list-group-item border-bottom" key={index} value={icd.code} onClick={() => this.selectDisease(icd)}>{icd.desc}</button>
                  )}
                </ul>
              </div>
              <div className="form-group col-12">
                <label>Disease name</label>
                <input className="form-control form-control-sm" name="disease" required={true}
                  value={this.state.disease} onChange={this.onChange} />
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
        {diagnosis_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Disease diagnosis</b></div>
            <button
              className="btn btn-sm "
              onClick={this.onNewDiagnosis}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered table-responsive-sm">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Diagnosis</th>
                  <th className="text-center">ICD 10</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {diagnosis.filter(diagnose => diagnose.appointment_id === appointment.id).map((diagnose, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{diagnose.disease}</td>
                    <td>{diagnose.icd_10}</td>
                    <td className="text-center">
                      <button className="btn btn-sm mr-2 border-none btn-success"
                        onClick={() => this.onEditDiagnosis(diagnose)}><i className="fa fa-edit"></i></button>

                      <button className="btn btn-sm border-none btn-danger"
                        onClick={() => this.onDelete(diagnose.id)}><i className="fa fa-trash"></i></button>
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
  diagnosis: state.outpatient.diagnosis,
  common: state.common,
}), { addDiagnosis, updateDiagnosis, getDiagnosis, deleteDiagnosis })(Diagnosis)
