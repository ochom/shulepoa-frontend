import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { loadPaymentQueue, savePayment } from '../actions'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class CashPoint extends Component {
  state = {
    showModal: false,
    selected_payment_data: null,
    cart_items: [],
    total_bill: 0,
    receipt: false,
  }

  componentDidMount() {
    this.props.loadPaymentQueue();
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onEditPayment = (data) => {
    this.setState({
      showModal: true,
      selected_payment_data: data,
      cart_items: [],
      receipt: false,
    })
  }

  // seth, teddy, raso

  onCheckChange = (data) => {
    var cart_items = this.state.cart_items.filter(item => item.id === data.id)
    if (cart_items.length > 0) {
      this.setState({ cart_items: this.state.cart_items.filter(item => item.id !== data.id) }, () => this.calculateBill());
    } else {
      this.setState({ cart_items: [...this.state.cart_items, data] }, () => this.calculateBill());
    }
  }

  calculateBill() {
    var cart_items = this.state.cart_items;
    var total_amount = 0;
    for (var i = 0; i < cart_items.length; i++) {
      total_amount = parseInt(cart_items[i].amount);
    }
    this.setState({ total_bill: total_amount });
  }


  onSavePayment = () => {
    const {
      selected_payment_data,
      cart_items, } = this.state;

    const data = {
      cart_items
    }

    if (cart_items.length > 0) {
      this.props.savePayment(selected_payment_data.patient.id, data);
      this.setState({ receipt: true });
    }
  }

  printReceipt = () => {
    const input = document.getElementById('receipt_div');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 70;
        // var pageHeight = 290;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        // var heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a6')
        var position = 0;
        // var heightLeft = imgHeight;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        pdf.save("receipt.pdf");
        this.setState({ showModal: !this.state.showModal, receipt: false });
      });
  }

  render() {
    const { payment_queue } = this.props.revenue;
    const { selected_payment_data } = this.state;
    const queue_list = payment_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient.fullname}</td>
        <td>{queue.patient.id}</td>
        <td>{queue.patient.phone}</td>
        <td>{queue.total_bill}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onEditPayment(queue)}><i className="fa fa-edit"></i> Make Payments</button></td>
      </tr>
    );

    const edit_vitals_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.receipt ? 'Print Receipt' : 'Requested Services'}
        </ModalHeader>
        <ModalBody>
          {!this.state.receipt ?
            <div className="col-12 mx-auto">
              <table className="table table-sm stripped">
                <tbody>
                  {selected_payment_data ? selected_payment_data.service_requests.map((service_req, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{service_req.service_name}</td>
                      <td>{service_req.amount}</td>
                      <td><input type="checkbox" onClick={() => this.onCheckChange(service_req)} /></td>
                    </tr>) : null}
                </tbody>
              </table>
              <div>
                <span>Total Payable Amount: </span><b>{this.state.total_bill}</b>
              </div>
            </div>
            : <div className="col-12 mx-auto" id="receipt_div">
              <h5 className="text-center mt-3 pt-5">Payment Receipt</h5>
              <p className="p-0 m-0">Ochom Richard</p>
              <p className="p-0 m-0">{new Date().toLocaleString("en-UK")}</p>
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cart_items.map((item, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.service_name}</td>
                      <td>{item.amount}</td>
                    </tr>)
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="2">Total Amount</th>
                    <th>{`${this.state.total_bill}.00`}</th>
                  </tr>
                </tfoot>
              </table>
            </div>}
        </ModalBody >
        <ModalFooter>
          {!this.state.receipt ?
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSavePayment}><i className="fa fa-check"></i> Submit</Button> :
            <Button type="submit" color="success" size="sm"
              onClick={this.printReceipt}> <i className="fa fa-print"></i> Print</Button>}
          {' '}
          <Button color="secondary" size="sm" onClick={this.toggleModal}>
            <i className="fa fa-close"></i> Cancel</Button>
        </ModalFooter>
      </Modal >

    return (
      <div className="col-md-12 mx-auto mt-3">
        {edit_vitals_view}
        <div className="card">
          <div className="card-header bg-white py-1 px-3">
            <div
              style={{ fontSize: "1vw", width: "300px", float: "left" }}
              className="py-1 px-2">
              <Link to="/revenue">Revenue</Link> &nbsp;
              <i className="fa fa-angle-right"></i> &nbsp;
              <Link to="/revenue/cashpoint">Cashpoint</Link> &nbsp;
              <i className="fa fa-angle-right"></i> &nbsp;
              <Link to="/revenue/cashpoint/payment-queue">Payment Queue</Link>
            </div>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="custom-text-primary">
                <tr>
                  <th>Patient's Name</th>
                  <th># Reg.</th>
                  <th>Mobile</th>
                  <th>Total Bill</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {queue_list}
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
}), { loadPaymentQueue, savePayment })(CashPoint)
