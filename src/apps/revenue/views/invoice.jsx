import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import xlsx from 'xlsx'
import { deleteData } from '../../common/actions'
import { addPayment, deletePayment, getInvoice, updatePayment } from '../actions'
import Items from './items'
import { DateInput } from '../../common/layouts'

function invoiceToExcel(invoice) {
  let workbook = xlsx.utils.book_new();
  let invoice_details = [
    ["INVOICE", invoice.id],
    ["CLIENT", invoice.patient.fullname],
    ["ID NUMBER", invoice.patient.id_no],
    ["PHONE", invoice.patient.phone]
  ]

  let payments = []
  invoice.payments.forEach(payment => {
    const { id, date_paid, account_name, amount } = payment
    payments.push({
      id,
      date: new Date(date_paid),
      account: account_name, amount
    })
  });

  let items = []
  invoice.service_requests.forEach(req => {
    var { id, created, service_name, quantity, price, cost } = req
    items.push({
      id,
      created: new Date(created),
      item: service_name,
      quantity,
      price,
      cost
    })
  })


  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(invoice_details), "Invoice Details");
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(payments), "Payments");
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(items), "Items");
  xlsx.writeFile(workbook, "result.xlsx");
}

function importExcel() {
  var file = null;
  var input = document.createElement('input')
  input.setAttribute("type", "file")
  input.setAttribute("accept", ".xls, .xlsx")
  input.onchange = (e) => {
    file = e.target.files[0]
  }
  input.click()
}

export class Invoice extends Component {
  state = {
    showModal: false,
    selected_payment: null,
    amount_paid: 0,
    account_name: "",
    date_paid: "",
    notes: ""
  }

  componentDidMount() {
    const { match: { params: { invoice_id } } } = this.props
    this.props.getInvoice(invoice_id)
  }

  calculateTotal = () => {
    const { invoice } = this.props
    var total = 0;
    invoice.service_requests.forEach(request => {
      total += +request.cost
    })
    return total;
  }

  calculatePaid = () => {
    return 0
  }

  calculateBalance = () => {
    return 0
  }

  uploadExcelFile = () => {
    let file = importExcel();
    console.log(file)
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onNewPayment = () => {
    this.setState({
      showModal: true,
      selected_payment: null,
      amount_paid: 0,
      account_name: "",
      date_paid: "",
      notes: ""
    })
  }

  onEditPayment = (payment) => {
    this.setState({
      showModal: true,
      selected_payment: payment,
      amount_paid: payment.amount_paid,
      account_name: payment.account_name,
      date_paid: payment.date_paid,
      notes: payment.notes
    })
  }

  onSubmitPayment = (e) => {
    e.preventDefault()
    const {
      selected_payment,
      amount_paid,
      account_name,
      date_paid,
      notes } = this.state
    var data = {
      invoice: this.props.invoice.id,
      amount_paid,
      account_name,
      date_paid,
      notes
    }
    if (selected_payment) {
      this.props.updatePayment(selected_payment.id, data)
    } else {
      this.props.addPayment(data)
    }
    this.toggleModal()
  }

  render() {
    const { invoice,
      common: { CONSTANTS: { GENDERS, MARITAL_STATUSES } } } = this.props

    const payment_modal =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>Add Payment</ModalHeader>
        <form onSubmit={this.onSubmitPayment}>
          <ModalBody>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm"
                  name="account_name" value={this.state.account_name} onChange={this.onChange} />
                <label>Account Name</label>
              </div>
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm"
                  name="amount_paid" value={this.state.amount_paid} onChange={this.onChange} />
                <label>Amount Paid</label>
              </div>
              <div className="form-group col-12">
                <DateInput
                  name="date_paid"
                  value={this.state.date_paid}
                  onChange={this.onChange}
                  required={true} />
                <label>Date Paid</label>
              </div>
              <div className="form-group col-12">
                <textarea type="text" className="form-control form-control-sm"
                  name="notes" value={this.state.notes} onChange={this.onChange} ></textarea>
                <label>Payment Notes</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmitPayment}>
              <i className="fa fa-check"></i> Submit payment</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}><i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div>
        {invoice ?
          <>
            {payment_modal}
            <div className="row col-12 mx-auto mt-2">

              <div className="col-sm-3 mt-3">
                <div className="patient_profile p-0 border border-light rounded ">
                  <div className="row mx-auto justify-content-center mt-4">
                    <div className="image"></div>
                    <p>Patient Profile</p>
                  </div>
                  <ul className="w-100 mx-auto list-group mt-2">
                    <li className="list-group-item">
                      <span className="m-0">Name:</span>
                      <span>{invoice.patient.fullname}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Sex:</span>
                      <span>{GENDERS[invoice.patient.sex]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">DoB:</span>
                      <span>{new Date(invoice.patient.dob).toDateString("en-UK")}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Marriage:</span>
                      <span>{MARITAL_STATUSES[invoice.patient.marital_status]}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Mobile:</span>
                      <span>{invoice.patient.phone}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Address:</span>
                      <span>{`${invoice.patient.county}, ${invoice.patient.country}`}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-9 mt-3">

                <div className="card">
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span>INVOICE NUMBER</span>
                        <span>{invoice.id}</span>
                      </li>
                      <li className="list-group-item">
                        <span>TOTAL BILL</span>
                        <span>{this.calculateTotal()}</span>
                      </li>
                      <li className="list-group-item">
                        <span>PAID</span>
                        <span>{this.calculatePaid()}</span>
                      </li>
                      <li className="list-group-item">
                        <span>BALANCE</span>
                        <span>{this.calculateBalance()}</span>
                      </li>
                      <li className="list-group-item">
                        <span>STATUS</span>
                        <span>{invoice.status}</span>
                      </li>
                      <li className="list-group-item">
                        <span>DATE CREATED</span>
                        <span>{new Date(invoice.created).toLocaleDateString('en-uk')}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="py-3">
                  <button className="btn btn-success m-1"
                    onClick={() => invoiceToExcel(invoice)}>
                    <i className="fa fa-file-excel-o"></i> Export to Excel</button>
                  <button className="btn btn-primary m-1"
                    onClick={this.uploadExcelFile}><i className="fa fa-cloud-upload"></i> Upload from Excel</button>
                  <button className="btn btn-warning m-1">Mark as Billed</button>
                  <button className="btn btn-danger m-1">Mark as cleared</button>
                  <a href={`http://localhost:8000/api/revenue/download-invoice/${invoice.id}`} target="_blank"
                    className="btn btn-dark m-1" download>
                    <i className="fa fa-cloud-download"></i> Download PDF</a>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <div>Invoice Payment Records</div>
                    <button className="btn"
                      onClick={this.onNewPayment}><i className="fa fa-plus-circle"></i> Add payment</button>
                  </div>
                  <div className="card-body p-0">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date paid</th>
                          <th>Account Name</th>
                          <th>Amount</th>
                          <th>Notes</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.payments.map((payment, index) =>
                          <tr key={index}>
                            <td>{new Date(payment.date_paid).toLocaleDateString('en-uk')}</td>
                            <td>{payment.account_name}</td>
                            <td>{payment.amount_paid}</td>
                            <td>{payment.notes}</td>
                            <td>
                              <button className="btn btn-sm btn-success mr-2"
                                onClick={() => this.onEditPayment(payment)}>Edit</button>
                              <button className="btn btn-sm btn-danger"
                                onClick={() => deleteData(payment.id, this.props.deletePayment)}>Delete</button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              <div className="col-12 mt-3">
                <div className="card">
                  <div className="card-header bg-secondary">Invoiced Items</div>
                  <div className="card-body p-0">
                    <Items data={invoice.service_requests} />
                  </div>
                </div>
              </div>
            </div>
          </ >
          : null}
      </div>
    )
  }
}

export default connect(state => ({
  invoice: state.revenue.invoice,
  common: state.common
}), { getInvoice, updatePayment, addPayment, deletePayment })(Invoice)