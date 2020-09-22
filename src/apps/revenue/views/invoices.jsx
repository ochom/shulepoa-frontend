import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHospital } from '../../hospital/actions';
import { addInvoice, getInvoices, updateInvoice } from '../actions';
import PaginatedTable from '../../common/pagination';
import { ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

class Invoices extends Component {
  state = {
    status: "ALL",
    showModal: false,
    showModal2: false,
    selected_invoice: null,
  }

  componentDidMount() {
    this.props.getInvoices()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  toggleModal2 = () => this.setState({ showModal2: !this.state.showModal2 })

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  calculateTotal = (invoice) => {
    var total = 0;
    invoice.service_requests.forEach(request => {
      total += +request.cost
    })
    return total;
  }

  calculateBalance = (invoice) => {
    var total = 0;
    invoice.service_requests.forEach(request => {
      if (!request.is_paid) {
        total += +request.cost
      }
    })
    return total;
  }

  onBillNow = (invoice) => {
    this.setState({ selected_invoice: invoice })
    this.toggleModal()
  }

  onSubmitBilling = () => {
    const { selected_invoice } = this.state
    var data = { status: "BILLED" }
    this.props.updateInvoice(selected_invoice.id, data)
    this.toggleModal()
  }

  onRecordPayment = (invoice) => {
    this.setState({ selected_invoice: invoice })
    this.toggleModal2()
  }

  render() {
    const { revenue: { invoices } } = this.props;
    const { selected_invoice } = this.state
    const rows = invoices.filter(inv => this.state.status !== "ALL" ? inv.status === this.state.status : inv.id > 0)

    const columns = [
      {
        title: '#Number',
        render: rowData => {
          return <span>INV#{rowData.id}</span>;
        },
      },
      {
        title: "Bill Date",
        render: rowData => {
          return <span>{new Date(rowData.created).toLocaleDateString("en-uk")}</span>
        }
      },
      {
        title: 'Status',
        render: rowData => {
          return <span><i className="bg-secondary rounded text-light px-2 disabled">{rowData.status}</i></span>;
        },
      },
      {
        title: 'Patient',
        render: rowData => {
          return <span>{rowData.patient.fullname}</span>;
        },
      },
      {
        title: 'Total',
        render: rowData => {
          return <span>{this.calculateTotal(rowData)}</span>;
        },
      },
      {
        title: 'Balance',
        render: rowData => {
          return <span>{this.calculateBalance(rowData)}</span>;
        },
      },
      {
        title: 'Action',
        render: rowData => {
          return <Link to={`/revenue/invoices/${rowData.id}`} className="btn btn-sm btn-success">Open</Link>
        },
      },
    ];

    const bill_modal = selected_invoice ?
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          Confirm Billing
        </ModalHeader>
        <ModalBody>
          <b>NOTE:</b>
          <p>
            This invoice will be billed to the client as it is.
            If you wish to edit the invoice, <b>Export it to Excel</b>
          </p>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-sm btn-success"
            onClick={this.onSubmitBilling}><i className="fa fa-check"></i> Continue</button>
          <button type="button" className="btn btn-sm btn-danger"
            onClick={this.toggleModal}><i className="fa fa-file-excel-o"></i> Export</button>
          <button type="button" className="btn btn-sm btn-secondary"
            onClick={this.toggleModal}><i className="fa fa-close"></i> Cancel</button>
        </ModalFooter>
      </Modal >
      : null

    const payment_modal = selected_invoice ?
      <Modal isOpen={this.state.showModal2}>
        <ModalHeader toggle={this.toggleModal2}>
          Record Payment
        </ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-sm btn-success"
            onClick={this.onSubmitPayment}><i className="fa fa-check"></i> Save payment</button>
          <button type="button" className="btn btn-sm btn-secondary"
            onClick={this.toggleModal2}><i className="fa fa-close"></i> Cancel</button>
        </ModalFooter>
      </Modal >
      : null

    return (
      <div className="col-md-10 mx-auto mt-3">
        {bill_modal}
        {payment_modal}
        <div className="row col-12 mx-auto">
          <span>Showing: </span>
          <div className="col-md-3">
            <select name="status" className="form-control form-control-sm"
              value={this.state.status}
              onChange={this.onChange}>
              <option value="ALL">All Invoices</option>
              <option value="DRAFT">Draft Invoices</option>
              <option value="BILLED">Billed Invoices</option>
              <option value="PAID">Paid Invoices</option>
            </select>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div>Invoices</div>
          </div>
          <div className="card-body p-0">
            <div className="card-body p-0 pb-2">
              <PaginatedTable cols={columns} rows={rows} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  revenue: state.revenue,
  common: state.common,
  hospital: state.hospital.hospital_profile
}), { getHospital, getInvoices, addInvoice, updateInvoice })(Invoices)
