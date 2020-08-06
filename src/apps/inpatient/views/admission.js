import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchPatients, } from '../../records/actions';
import { Link } from 'react-router-dom';
import store from '../../../reducer/store'

export class Patients extends Component {
  state = {
    patient_search_name: "",
    patient_search_phone: "",
    patient_search_idno: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  onsearchPatient = () => {
    const data = {
      "fullname": this.state.patient_search_name,
      "idno": this.state.patient_search_idno,
      "phone": this.state.patient_search_phone,
    }
    this.props.searchPatients(data);
  }

  selectPatient = (patient) => {
    store.dispatch({ type: "SELECT_PATIENT_TO_ADMIT", payload: patient });
    this.props.history.push('/inpatient/admission/patient/' + patient.id + '/admit');
  }


  render() {
    const { GENDERS } = this.props.common.CONSTANTS;

    const patient_filter_list = this.props.patients.patients_list.map((patient, index) =>
      <tr key={index}>
        <td>{patient.id}</td>
        <td>{patient.fullname}</td>
        <td>{GENDERS[patient.sex]}</td>
        <td>{patient.phone}</td>
        <td>{`${patient.county}, ${patient.country}`}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.selectPatient(patient)}><i className="fa fa-edit"></i> Admit Patient</button>
        </td>
      </tr>
    )
    return (
      <div className="col-12 mx-auto mt-3">
        <div className="card card-header bg-white py-1 px-3">
          <div className="py-1 px-2">
            <Link to="/">Home</Link>  &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/inpatient">Inpatient</Link> &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/inpatient/admission">Admission</Link>
          </div>
        </div>

        <div className="mt-3">
          <div className="card">
            <div className="card-header custom-bg-secondary py-1 px-3">
              <div
                style={{ fontSize: "1.2vw", }} className="py-1 px-2">
                <i className="fa fa-search mr-3"></i> Search patients to admit
                </div>
            </div>
            <div className="card-body p-0 pb-2">
              <div className="row col-12 mx-auto mt-3">
                <div className="form-group  col-3">
                  <label>Patient Name</label>
                  <input className="form-control form-control-sm"
                    name="patient_search_name"
                    value={this.state.patient_search_name}
                    onChange={this.onChange}
                    placeholder="Enter name" />
                </div>
                <div className="form-group  col-3">
                  <label>Mobile</label>
                  <input className="form-control form-control-sm"
                    name="patient_search_phone"
                    value={this.state.patient_search_phone}
                    onChange={this.onChange}
                    placeholder="Enter phone number" />
                </div>
                <div className="form-group col-3">
                  <label>ID Number</label>
                  <input className="form-control form-control-sm"
                    name="patient_search_idno"
                    value={this.state.patient_search_idno}
                    onChange={this.onChange}
                    placeholder="Enter ID number" />
                </div>
                <div className="form-group col-12">
                  <button
                    className="btn btn-sm btn-outline-success custom-text-primary"
                    onClick={this.onsearchPatient}><i className="fa fa-search mr-2"></i> Find Patient</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-body mt-4 p-0">
            <table className="table table-sm table-striped table-bordered">
              <caption className="px-2"><i>Search results</i></caption>
              <thead className="custom-bg-primary">
                <tr><th>#Reg.</th><th>Full name</th><th>Gender</th><th>Mobile</th><th>Address</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {patient_filter_list}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  patients: state.patients,
  common: state.common,
});

export default connect(mapStateToProps, { searchPatients, })(Patients);
