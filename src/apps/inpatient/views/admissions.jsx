import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdmissions, updateAdmission } from '../actions';
import { Link } from 'react-router-dom';

export class Admissions extends Component {
  state = {}

  componentDidMount() {
    this.props.getAdmissions();
    this.interval = setInterval(() => this.props.getAdmissions(), 30000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  checkOut = (id) => {
    this.props.updateAdmission(id, { is_checked_in: false })
  }

  render() {
    const {
      inpatient: { admissions }, records: { patients },
      hospital: { wards },
      common: { CONSTANTS: { GENDERS } }
    } = this.props;

    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-1 px-3">Admitted patients</div>
          <div className="card-body p-0 pb-2">
            {this.props.common.silent_processing ?
              <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
            }
            <table className="table table-sm table-hover table-responsive-sm">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Ward</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admissions.filter(admission => !admission.is_discharged).map((admission, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{(patients.find(p => p.id === admission.patient_id)) ? patients.find(patient => patient.id === admission.patient_id).fullname : ""}</td>
                    <td>{GENDERS[(patients.find(p => p.id === admission.patient_id)) ? patients.find(patient => patient.id === admission.patient_id).sex : 0]}</td>
                    <td>{(wards.find(ward => ward.id === admission.ward_id)) ? wards.find(ward => ward.id === admission.ward_id).name : ""}</td>
                    <td>{(patients.find(p => p.id === admission.patient_id)) ? patients.find(patient => patient.id === admission.patient_id).phone : ""}</td>
                    <td>
                      <Link to={`/inpatient/admissions/${admission.id}`}
                        className="btn btn-sm border-none btn-success"> Open file</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  inpatient: state.inpatient,
  hospital: state.hospital,
  records: state.records,
  common: state.common,
}), { getAdmissions, updateAdmission })(Admissions)
