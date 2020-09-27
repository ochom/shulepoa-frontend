import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getHospital } from '../../hospital/actions';
import { getPaymentQueue, savePayment } from '../actions';

export class CashPoint extends Component {
  state = {
    showModal: false,
    confDialog: false,
    stmModal: false,
    selected_invoice: null,
    is_checked: true,
    cart_items: [],
    total_bill: 0,
    receipt: false,
    payment_method: "",
    transaction_code: "",
  }

  componentDidMount() {
    this.props.getHospital()
    this.props.getPaymentQueue();
    window.interval = setInterval(() => this.props.getPaymentQueue(), 30000);
  }

  componentWillUnmount() {
    clearInterval(window.interval)
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  toggleStatementModal = () => this.setState({ stmModal: !this.state.stmModal })

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onCheckChanged = () => this.setState({ is_checked: !this.state.is_checked })

  componentDidUpdate(nextProps) {
    if (nextProps.revenue !== this.props.revenue) {
      if (nextProps.revenue.payment_saved && this.state.cart_items.length > 0) {
        //Show printable statement
        this.toggleStatementModal()
      }
    }
  }

  onEditPayment = (invoice) => {
    invoice.service_requests.forEach(req => {
      req.is_checked = true
    })

    this.setState({
      selected_invoice: invoice,
      total_bill: 0,
      payment_method: "",
      transaction_code: "",
    }, () => this.toggleModal())
  }

  onCheckChange = (request) => {
    var invoice = this.state.selected_invoice
    var service_requests = invoice.service_requests;
    var index = service_requests.findIndex(r => r.id === request.id)
    service_requests[index].is_checked = !service_requests[index].is_checked
    invoice['service_requests'] = service_requests;
    this.setState({ selected_invoice: invoice })
  }

  calculateBill = () => {
    var items = this.state.selected_invoice.service_requests;
    var total = 0;
    items.forEach(item => {
      if (item.is_checked && !item.is_approved) {
        total += parseFloat(item.cost)
      }
    })
    return total.toFixed(2);
  }

  onSubmit = (payment_method) => {
    var items = this.state.selected_invoice.service_requests.filter(r => r.is_checked).length
    if (items === 0) { return }
    this.setState({ payment_method: payment_method }, () => {
      this.toggleConfirmDialog()
      this.toggleModal()
    })
  };

  toggleConfirmDialog = () => this.setState({ confDialog: !this.state.confDialog })

  onSavePayment = (e) => {
    e.preventDefault()
    const {
      selected_invoice,
      payment_method,
      transaction_code,
    } = this.state;

    const data = {
      invoice_id: selected_invoice.id,
      service_requests: selected_invoice.service_requests.filter(r => r.is_checked),
      payment_method,
      transaction_code,
    }
    this.props.savePayment(data);
    this.toggleConfirmDialog();
  }

  calalucateTotal = (invoice) => {
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

  render() {
    const { revenue: { payment_queue } } = this.props;
    const { selected_invoice, payment_method } = this.state;

    const payment_modal =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>
          {'Make payments'}
        </ModalHeader>
        {selected_invoice ?
          <>
            <ModalBody className="p-0">
              <table className="table table-sm table-responsive-sm">
                <tbody>
                  {selected_invoice.service_requests.filter(r => !r.is_approved).map((request, index) =>
                    <tr key={index}>
                      <td className="py-2 px-3">{request.service_name}</td>
                      <td className="py-2 px-3 text-right">{request.cost}</td>
                      <td className="py-2 px-3 text-right">
                        <div className="switch">
                          <input type="checkbox"
                            checked={request.is_checked}
                            onChange={() => this.onCheckChange(request)} />
                          <span className="slider round"></span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter className="p-0 pb-3">
              <div className="row col-12 py-2 mx-auto">
                <div className="col-8">Total Payable Amount: </div>
                <div className="col-4 text-right"><b>{this.calculateBill()}</b></div>
              </div>
              <div className="row col-12 mx-auto justify-content-center">
                <button className="btn btn-primary mr-2"
                  onClick={() => this.onSubmit("cash")}>
                  <i className="fa fa-money"></i> Cash</button>
                <button className="btn btn-success mr-2"
                  onClick={() => this.onSubmit("mobile")}>
                  <i className="fa fa-mobile"></i> M-PESA</button>
                <button className="btn btn-info mr-2"
                  onClick={() => this.onSubmit("visa")}>
                  <i className="fa fa-credit-card"></i> C. Card</button>
                {(selected_invoice && selected_invoice.patient.insurance.length > 0) ?
                  <button className="btn btn-secondary"
                    onClick={() => this.onSubmit("insurance")}>
                    <i className="fa fa-briefcase"></i> Insurance</button> : null
                }
              </div>
            </ModalFooter>
          </> :
          null}
      </Modal>

    const confirm_dialog =
      <Modal isOpen={this.state.confDialog}>
        <ModalHeader className="bg-success text-light">Confirm payment</ModalHeader>
        <form onSubmit={this.onSavePayment}>
          <ModalBody>
            {
              payment_method === "mobile" ?
                <>
                  <p>Enter client phone number</p>
                  <input className="form-control" name="transaction_code"
                    placeholder="712345678" value={this.state.transaction_code}
                    required={true}
                    onChange={this.onChange} />
                </> :
                payment_method === "visa" ?
                  <>
                    <p>Enter transaction code</p>
                    <input className="form-control" name="transaction_code"
                      placeholder="Transaction ID" value={this.state.transaction_code}
                      required={true}
                      onChange={this.onChange} />
                  </> :
                  payment_method === "cash" ?
                    <p>Do you want to confirm receiving this payment?</p> :
                    <p>All selected items will be paid by insurance</p>
            }
          </ModalBody>
          <ModalFooter>
            {(payment_method === "mobile" || payment_method === "visa") ?
              <button type="submit" className="btn btn-sm btn-success mr-3"
                onSubmit={this.onSavePayment}>
                <i className="fa fa-check"></i> Submit</button> :
              <button type="submit" className="btn btn-sm btn-success mr-3"
                onSubmit={this.onSavePayment}>
                <i className="fa fa-check"></i> Yes, Continue</button>
            }
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleConfirmDialog}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div className="col-md-10 mx-auto mt-3">
        {payment_modal}
        {confirm_dialog}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div>Payment Queue</div>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#Number</th>
                  <th>Bill Date</th>
                  <th>Status</th>
                  <th>Patient</th>
                  <th>Total</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payment_queue.map((invoice, index) =>
                  <tr key={index}>
                    <td>INV#{invoice.id}</td>
                    <td>{new Date(invoice.created).toLocaleDateString("en-uk")}</td>
                    <td>{`Pending`}</td>
                    <td>{invoice.patient.fullname}</td>
                    <td>{this.calalucateTotal(invoice)}</td>
                    <td>{this.calculateBalance(invoice)}</td>
                    <td>
                      <button className="btn btn-sm btn-primary mr-2"
                        onClick={() => this.onEditPayment(invoice)}>Pay Now</button>
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
  revenue: state.revenue,
  common: state.common,
  hospital: state.hospital.hospital_profile
}), { getHospital, getPaymentQueue, savePayment })(CashPoint)
