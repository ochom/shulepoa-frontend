import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import xlsx from 'xlsx'
import { deleteData } from '../../common/actions'
import { addPayment, deletePayment, getInvoice, updatePayment, uploadInvoice, updateInvoice } from '../actions'
import Items from './items'
import { DateInput } from '../../common/layouts'

function invoiceToExcel(invoice) {
  let workbook = xlsx.utils.book_new();
  let invoice_details = [
    ["INVOICE", "CLIENT", "ID NUMBER", "PHONE"],
    [invoice.id, invoice.patient.fullname, invoice.patient.id_no, invoice.patient.phone]
  ]

  let payments = []
  invoice.payments.forEach(payment => {
    const { id, date_paid, account_name, amount_paid } = payment
    payments.push({
      id,
      date: new Date(date_paid),
      account: account_name, amount: amount_paid
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


export class Invoice extends Component {
  state = {
    showModal: false,
    showModal2: false,
    selected_payment: null,
    amount_paid: 0,
    account_name: "",
    date_paid: "",
    notes: "",

    uploaded_data: null,

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
    return total.toFixed(2);
  }

  calculatePaid = () => {
    const { invoice: { payments } } = this.props
    let total = 0;
    payments.forEach(payment => {
      total += +payment.amount_paid
    })
    return total.toFixed(2)
  }

  calculateBalance = () => {
    return (this.calculateTotal() - this.calculatePaid()).toFixed(2)
  }

  uploadExcelFile = () => {
    var file = null;
    var input = document.createElement('input')
    input.setAttribute("type", "file")
    input.setAttribute("accept", ".xls, .xlsx")
    input.onchange = (e) => {
      var uploaded_data = {}
      file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.addEventListener('load', (e) => {
        const bstr = e.target.result;
        const wb = xlsx.read(bstr, { type: 'binary' });
        let ws = wb.Sheets["Invoice Details"];
        let data = xlsx.utils.sheet_to_json(ws)[0];
        uploaded_data["id"] = data.INVOICE
        uploaded_data["client"] = data.CLIENT

        ws = wb.Sheets["Items"];
        data = xlsx.utils.sheet_to_json(ws);
        let items = []
        data.forEach(item => {
          items.push({ "id": item.id, quantity: item.quantity, price: item.price, cost: item.cost })
        })
        uploaded_data["items"] = items

        this.setState({ showModal2: true, uploaded_data: uploaded_data })
      })
    }
    input.click()
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  toggleModal2 = () => this.setState({ showModal2: !this.state.showModal2 })

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

  uploadedCost = () => {
    let total = 0;
    this.state.uploaded_data.items.forEach(item => {
      total += parseInt(item.cost)
    })
    return total.toFixed(2)
  }

  onSubmitUpload = () => {
    const { uploaded_data } = this.state
    let data = {
      service_requests: uploaded_data.items
    }
    this.props.uploadInvoice(uploaded_data.id, data)
  }

  markAs = (status) => {
    const { invoice } = this.props
    this.props.updateInvoice(invoice.id, { status: status })
  }

  render() {
    const { invoice,
      common: { CONSTANTS: { GENDERS, MARITAL_STATUSES } } } = this.props
    const { uploaded_data } = this.state

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
                  name="notes" value={this.state.notes} onChange={this.onChange}></textarea>
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


    const upload_modal =
      uploaded_data ?
        <Modal isOpen={this.state.showModal2}>
          <ModalHeader toggle={this.toggleModal2} className="cu-bg-primary">Uploaded Invoice</ModalHeader>
          <ModalBody className="p-0">
            <ul className="list-group">
              <li className="list-group-item">
                <span>INVOICE</span>
                <span>{uploaded_data.id}</span>
              </li>
              <li className="list-group-item">
                <span>PATIENT</span>
                <span>{uploaded_data.client}</span>
              </li>
              <li className="list-group-item">
                <span>ITEMS</span>
                <span>{uploaded_data.items.length}</span>
              </li>
              <li className="list-group-item">
                <span>TOTAL COST</span>
                <span>{this.uploadedCost()}</span>
              </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-sm btn-success"
              onClick={this.onSubmitUpload}>
              <i className="fa fa-check"></i> Submit Edit</button>
            <button className="btn btn-sm btn-secondary"
              onClick={this.toggleModal2}><i className="fa fa-close"></i>  Cancel</button>
          </ModalFooter>
        </Modal> :
        null

    return (
      <div>
        {
          invoice ?
            <>
              {payment_modal}
              {upload_modal}
              < div className="row col-12 mx-auto mt-2">

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
                    {invoice.status === "DRAFT" ?
                      <button className="btn btn-warning m-1"
                        onClick={() => this.markAs("BILLED")}>Mark as Billed</button> :
                      <button className="btn btn-warning m-1"
                        onClick={() => this.markAs("DRAFT")}>Mark as Draft</button>
                    }
                    {invoice.status === "CLEARED" ?
                      <button className="btn btn-danger m-1"
                        onClick={() => this.markAs("DRAFT")}>Mark as pending</button> :
                      <button className="btn btn-danger m-1"
                        onClick={() => this.markAs("CLEARED")}>Mark as cleared</button>
                    }
                    <a href={`http://localhost:8000/api/revenue/upload-download/${invoice.id}/`}
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
            </>
            : null}
      </div>
    )
  }
}

export default connect(state => ({
  invoice: state.revenue.invoice,
  common: state.common
}), { getInvoice, updatePayment, addPayment, updateInvoice, deletePayment, uploadInvoice })(Invoice)