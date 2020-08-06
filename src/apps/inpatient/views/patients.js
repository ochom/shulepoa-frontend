import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadWards, addWard, updateWard } from '../actions'
import store from '../../../reducer/store';

export class Wards extends Component {
  state = {
    showModal: false,
    selected_ward: null,
    search_name: "",
    search_idno: "",
    search_ward: "",
    search_Result: [],
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onsearchPatient = () => {
    const { search_name, search_idno, search_ward } = this.state
    const result = this.props.inpatient.inpatient_files.filter(file =>
      ((file.patient_details.fullname.toLowerCase().includes(search_name.toLocaleLowerCase()) ||
        file.patient_details.idno.includes(search_idno) ||
        file.ward === parseInt(search_ward)
      ))
    )
    this.setState({ search_Result: result });
  }

  onSelectFile = (file) => {
    store.dispatch({ type: "SELECT_INPATIENT_FILE", payload: file });
    this.props.history.push("/inpatient/patients/file/" + file.id)
  }

  render() {
    const { ward_list } = this.props.inpatient;
    const { CONSTANTS } = this.props.common;

    const patient_list_view = this.state.search_Result.map((file, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{file.patient_details.fullname}</td>
        <td>{CONSTANTS.GENDERS[file.patient_details.sex]}</td>
        <td>{new Date(file.patient_details.dob).toLocaleDateString("en-UK")}</td>
        <td>{new Date(file.admitted_at).toLocaleDateString("en-UK")}</td>
        <td>{ward_list.filter(ward => ward.id === file.ward)[0].name}</td>
        <td>{file.bed}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-primary"
            onClick={() => this.onSelectFile(file)}><i className="fa fa-edit"></i> Open file</button>
        </td>
      </tr >)
    return (
      <div className="col-12 mx-auto mt-3">
        <div className="card card-header bg-white py-1 px-3">
          <div className="py-1 px-2">
            <Link to="/">Home</Link>  &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/inpatient">Inpatient</Link> &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/inpatient/patients">Patients</Link>
          </div>
        </div>
        <div className="card mt-2">
          <div className="card-header custom-bg-primary py-1 px-3">
            <div
              style={{ fontSize: "1.2vw", }} className="py-1 px-2">
              <i className="fa fa-search mr-3"></i> Search admited patients
                </div>
          </div>
          <div className="card-body p-0 pb-2">
            <div className="row col-12 mx-auto mt-3">
              <div className="form-group  col-3">
                <label>Patient Name</label>
                <input className="form-control form-control-sm"
                  name="search_name"
                  value={this.state.search_name}
                  onChange={this.onChange}
                  placeholder="Enter name" />
              </div>
              <div className="form-group col-3">
                <label>ID Number</label>
                <input className="form-control form-control-sm"
                  name="search_idno"
                  value={this.state.search_idno}
                  onChange={this.onChange}
                  placeholder="Enter ID number" />
              </div>
              <div className="form-group  col-3">
                <label>Ward</label>
                <select className="form-control form-control-sm"
                  name="search_ward"
                  value={this.state.search_ward}
                  onChange={this.onChange}>
                  <option value="">Select</option>
                  {ward_list.map((ward, index) => <option key={index} value={ward.id}>{ward.name}</option>)}
                </select>
              </div>
              <div className="form-group col-12">
                <button
                  className="btn btn-sm btn-outline-success custom-text-primary"
                  onClick={this.onsearchPatient}><i className="fa fa-search mr-2"></i> Find Patient</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-body p-0 mt-2">
          <table className="table table-sm table-bordered m-0">
            <caption><i>Search result</i></caption>
            <thead className="custom-bg-secondary">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Sex</th>
                <th>DoB</th>
                <th>DoA</th>
                <th>Ward</th>
                <th>Bed</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {patient_list_view}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  inpatient: state.inpatient,
  common: state.common
}), { loadWards, addWard, updateWard })(Wards)