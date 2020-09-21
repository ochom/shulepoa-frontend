import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteData } from '../../common/actions';
import PaginatedTable from '../../common/pagination';
import { addDeposit, deleteDeposit, getDeposits, updateDeposit } from '../actions';

export class Deposit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      select_deposit: null,

      patient_id: "",
      amount: "",
      notes: "",
    }
  }

  componentDidMount() {
    this.props.getDeposits();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewDeposit = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_deposit: null,
      patient_id: "",
      amount: "",
      notes: "",
    })
  }

  onEditDeposit = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_deposit: data,
      patient_id: data.patient_id,
      amount: data.amount,
      notes: data.notes,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      select_deposit,
      patient_id,
      amount,
      notes,
    } = this.state;

    const data = {
      patient_id,
      amount,
      notes,
    }
    if (select_deposit) {
      this.props.updateDeposit(select_deposit.id, data);
    } else {
      this.props.addDeposit(data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const { revenue: { deposits } } = this.props;

    const columns = [
      {
        title: 'Date Paid',
        render: rowData => {
          return <span>{new Date(rowData.created).toLocaleDateString("en-uk")}</span>;
        },
      },
      {
        title: 'Patient',
        render: rowData => {
          return <span>{rowData.patient.fullname}</span>;
        },
      },
      {
        title: 'Amount',
        render: rowData => {
          return <span>{rowData.amount}</span>;
        },
      },
      {
        title: 'Notes',
        render: rowData => {
          return <span>{rowData.notes}</span>;
        },
      },
      {
        title: 'Action',
        render: rowData => {
          return <>
            <button className="btn btn-sm btn-success mr-3" onClick={() => this.onEditDeposit(rowData)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => deleteData(rowData.id, this.props.deleteDeposit)}>Delete</button>
          </>;
        },
      },
    ];

    const deposit_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_deposit ?
            <span><i className="fa fa-edit"></i> Edit Deposit Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Deposit</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="patient_id" onChange={this.onChange} value={this.state.patient_id} required={true}
                />
                <label>Patient Number<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="amount" onChange={this.onChange} value={this.state.amount} required={true}
                />
                <label>Amount<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm"
                  name="notes" onChange={this.onChange} value={this.state.notes} required={true}
                ></textarea>
                <label>Notes<sup>*</sup></label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-md-10 mx-auto mt-3" >
        {deposit_details}
        <div className="card">
          <div className="card-header">
            <div>Client Deposits</div>
            <button
              className="btn btn-sm py-1 px-2 mr-auto"
              onClick={this.onNewDeposit}><i className="fa fa-plus-circle mr-2"></i> Add Deposit
              </button>
          </div>
          <div className="card-body p-0">
            <PaginatedTable cols={columns} rows={deposits} />
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  revenue: state.revenue,
});

export default connect(mapStateToProps, { getDeposits, addDeposit, updateDeposit, deleteDeposit })(Deposit);
