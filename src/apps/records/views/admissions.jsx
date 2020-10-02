import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class Admissions extends Component {

  render() {
    const { patient: { admissions } } = this.props
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
                {admissions.map((admission, index) =>
                  <tr key={index}>
                    <td>{admission.ward.name}</td>
                    <td>{new Date(admission.created).toLocaleDateString("en-UK")}</td>
                    <td><Link to={`/inpatient/admissions/${admission.id}`}
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
  patient: state.records.patient,
});

export default connect(mapStateToProps)(Admissions);
