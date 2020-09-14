import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { loadPaymentQueue, savePayment } from '../actions';
import { getHospital } from '../../hospital/actions'
import { PrintPDF } from '../../common/actions';

export class CashPoint extends Component {
  state = {
    showModal: false,
    confDialog: false,
    stmModal: false,
    selected_queue: null,
    cart_items: [],
    total_bill: 0,
    receipt: false,
    payment_method: "",
    transaction_code: "",
  }

  componentDidMount() {
    this.props.getHospital()
    this.props.loadPaymentQueue();
    setInterval(() => this.props.loadPaymentQueue(), 30000);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  toggleStatementModal = () => this.setState({ stmModal: !this.state.stmModal })

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  componentDidUpdate(nextProps) {
    if (nextProps.revenue !== this.props.revenue) {
      if (nextProps.revenue.payment_saved && this.state.cart_items.length > 0) {
        //Show printable statement
        this.toggleStatementModal()
      }
    }
  }

  onEditPayment = (data) => {
    this.setState({
      selected_queue: data,
      cart_items: [],
      total_bill: 0,
      payment_method: "",
      transaction_code: "",
    }, () => this.toggleModal())
  }

  onCheckChange = (data) => {
    var cart_items = this.state.cart_items.filter(item => item.id === data.id)
    if (cart_items.length === 1) {
      this.setState({ cart_items: this.state.cart_items.filter(item => item.id !== data.id) }, () => this.calculateBill());
    } else {
      this.setState({ cart_items: [...this.state.cart_items, data] }, () => this.calculateBill());
    }
  }

  calculateBill() {
    var cart_items = this.state.cart_items;
    var total_amount = 0;
    for (var i = 0; i < cart_items.length; i++) {
      total_amount += parseInt(cart_items[i].cost);
    }
    this.setState({ total_bill: total_amount });
  }

  submit = (payment_method) => {
    this.setState({ payment_method: payment_method }, () => {
      var { cart_items, } = this.state;
      if (cart_items.length === 0) { return }
      this.toggleConfirmDialog()
      this.toggleModal()
    })
  };

  toggleConfirmDialog = () => this.setState({ confDialog: !this.state.confDialog })

  onSavePayment = (e) => {
    e.preventDefault()
    const {
      cart_items,
      payment_method,
      transaction_code,
    } = this.state;

    const data = {
      cart_items,
      payment_method,
      transaction_code,
    }

    if (cart_items.length > 0) {
      this.props.savePayment(data);
      this.toggleConfirmDialog();
    }
  }

  printReceipt = () => {
    const html = document.getElementById('print_area');
    PrintPDF(html, "Payment Statement")
    this.toggleStatementModal()
  }

  render() {
    const { revenue: { payment_queue }, hospital } = this.props;
    const { selected_queue, payment_method, cart_items } = this.state;

    const payment_modal =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {'Make payments'}
        </ModalHeader>
        <ModalBody>
          <table className="table table-sm table-responsive-sm">
            <tbody>
              {selected_queue ? selected_queue.service_requests.map((service_req, index) =>
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{service_req.service_name}</td>
                  <td>{service_req.amount}</td>
                  <td><input type="checkbox" onClick={() => this.onCheckChange(service_req)} /></td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </ModalBody >
        <ModalFooter>
          <div className="row col-12 py-2 mx-auto">
            <div className="col-8">Total Payable Amount: </div><div className="col-4 text-right"><b>{this.state.total_bill}</b></div>
          </div>
          <Button type="submit" color="primary" size="md"
            onClick={() => this.submit("cash")}><i className="fa fa-money"></i> Cash</Button>
          <Button type="submit" color="success" size="md"
            onClick={() => this.submit("mobile")}><i className="fa fa-mobile"></i> M-PESA</Button>
          <Button type="submit" color="secondary" size="md"
            onClick={() => this.submit("visa")}><i className="fa fa-credit-card"></i> C. Card</Button>
          {(selected_queue && (selected_queue.patient.insurance).length > 0) ?
            <Button type="submit" color="warning" size="md"
              onClick={() => this.submit("insurance")}><i className="fa fa-briefcase"></i> Insurance</Button> : null}
        </ModalFooter>
      </Modal >

    const confirm_dialog =
      <Modal isOpen={this.state.confDialog}>
        <ModalHeader className="bg-success text-light">Confirm payment</ModalHeader>
        <form onSubmit={this.onSavePayment}>
          <ModalBody>
            {(payment_method === "mobile" || payment_method === "visa") ?
              <>
                <p>Enter the transaction code here !</p>
                <input className="form-control" name="transaction_code"
                  placeholder="Transaction ID" value={this.state.transaction_code}
                  required={true}
                  onChange={this.onChange} />
              </> :
              <p>Do you want to confirm receiving this payment?</p>
            }
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-success mr-3"
              onSubmit={this.onSavePayment}>Yes</button>
            <Button onClick={this.toggleConfirmDialog} color="secondary">No</Button>
          </ModalFooter>
        </form>
      </Modal >

    const statement_modal =
      <Modal isOpen={this.state.stmModal} size="lg">
        <ModalHeader className="bg-secondary text-light"
          toggle={this.toggleStatementModal}>Payment statement</ModalHeader>
        <ModalBody>
          <div id="print_area" className="row col-12 mx-auto">
            <div className="col-12">
              <h3 className="col-12 p-0 m-0 text-center">{hospital ? `${hospital.hospital_name}` : ""}</h3>
              {/* <h6 className="col-12 p-0 m-0 text-center">{hospital ? `MFL ${hospital.mfl_code}` : ""}</h6> */}
              <h6 className="col-12 p-0 m-0 text-center">{hospital ? `${hospital.postal_address}, ${hospital.physical_address}` : ""}</h6>
              {/* <h6 className="col-12 p-0 m-0 text-center">{hospital ? `${hospital.email}. ${hospital.phone}` : ""}</h6> */}
              <h5 className="col-12 p-0 m-0 text-center mt-3"><u>{`Payment Statement`}</u></h5>
            </div>
            <div className="col-6 mt-3">
              <p className="p-0 m-0">Amount:  <b>{hospital ? `${hospital.currency} ${this.state.total_bill}` : ""}</b></p>
              <p className="p-0 m-0">Payment Method:  <b>{this.state.payment_method}</b></p>
              <p className="p-0 m-0">Date: <b>{new Date().toLocaleString('en-uk')}</b></p>
            </div>
            <div className="col-6 text-right mt-3">
              <p className="p-0 m-0">Client: <b>{selected_queue ? selected_queue.patient.fullname : ""}</b></p>
            </div>
            <div className="col-12 mx-auto mt-3">
              <b>Items</b>
              <table className="table table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cart_items.map((item, index) =>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.service_name}</td>
                      <td className="text-right">{item.cost}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.printReceipt} color="primary"><i className="fa fa-print"></i> Print</Button>
          <Button onClick={this.toggleStatementModal} color="secondary"><i className="fa fa-close"></i> Cancel</Button>
        </ModalFooter>
      </Modal >

    return (
      <div className="col-md-10 mx-auto mt-3">
        {payment_modal}
        {confirm_dialog}
        {statement_modal}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div>Payment Queue</div>
          </div>
          <div className="card-body p-0 pb-2">
            {this.props.common.silent_processing ?
              <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
            }
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>ID No.</th>
                  <th>Mobile</th>
                  <th>Total Bill</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {payment_queue.map((queue, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{queue.patient.fullname}</td>
                    <td>{queue.patient.id_no}</td>
                    <td>{queue.patient.phone}</td>
                    <td>{queue.total_bill}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 px-2 border-none rounded btn-primary"
                        onClick={() => this.onEditPayment(queue)}>Make Payments</button></td>
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
}), { getHospital, loadPaymentQueue, savePayment })(CashPoint)
