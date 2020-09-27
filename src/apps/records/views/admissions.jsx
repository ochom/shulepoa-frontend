import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAdmission, getAdmissions } from '../../inpatient/actions';
import { getPatient } from '../actions';
import { Link } from 'react-router-dom';


export class Admissions extends Component {

  componentDidMount() {
    this.props.getAdmissions()
  }

  render() {
    const { inpatient: { admissions }, patient_id } = this.props

    return (
      <>
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Admissions</div>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <td>Ward</td>
                  <td>Date</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {admissions.filter(app => app.patient_id === parseInt(patient_id)).map((app, index) =>
                  <tr key={index}>
                    <td>{app.ward.name}</td>
                    <td>{new Date(app.created).toLocaleDateString("en-UK")}</td>
                    <td><Link to={`/inpatient/admissions/${app.id}`}
                      className="btn btn-sm btn-primary">View</Link></td>
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

const mapStateToProps = (state) => ({
  inpatient: state.inpatient,
  wards: state.hospital.wards
});

export default connect(mapStateToProps,
  { getPatient, addAdmission, getAdmissions }
)(Admissions);
