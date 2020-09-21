import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdmissions, updateAdmission } from '../actions';
import { Link } from 'react-router-dom';
import PaginatedTable from '../../common/pagination';

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
      inpatient: { admissions },
      common: { CONSTANTS: { GENDERS } }
    } = this.props;

    const columns = [
      {
        title: '#Reg',
        render: rowData => {
          return <span>{rowData.patient.id}</span>;
        }
      },
      {
        title: 'Name',
        render: rowData => {
          return <span>{rowData.patient.fullname}</span>;
        }
      },
      {
        title: 'Sex',
        render: rowData => {
          return <span>{GENDERS[rowData.patient.sex]}</span>;
        }
      },
      {
        title: 'ID Number',
        render: rowData => {
          return <span>{rowData.patient.id_no}</span>;
        }
      },
      {
        title: 'Ward',
        render: rowData => {
          return <span>{rowData.ward.name}</span>;
        }
      },
      {
        title: 'Action',
        render: rowData => {
          return <Link to={`/inpatient/admissions/${rowData.id}`}
            className="btn btn-sm border-none btn-success"> Open file</Link>

        }
      },
    ]

    const rows = admissions.filter(admission => !admission.is_discharged)

    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-1 px-3">Admitted patients</div>
          <div className="card-body p-0 pb-2">
            <PaginatedTable cols={columns} rows={rows} />
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
