import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getDrugs, addReorder } from '../actions';
import ReactHTMLTableToExcel from '../../common/actions';


export class ShortageNotice extends Component {
  state = {
    showModal: false,
    selected_drug: null,

    quantity_before: "",
    new_stock_quantity: "",
    quantity_after: "",
    batch_number: "",
    expiry_date: ""
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  componentDidMount() {
    this.props.getDrugs();
    window.looper = setInterval(() => this.props.getDrugs(), 300000)
  }

  componentWillUnmount() {
    clearInterval(window.looper)
  }

  onAdjustStock = (data) => {
    this.setState({
      selected_drug: data,
      brand_name: data.brand_name,
      quantity_before: data.quantity,
      new_stock_quantity: "",
      batch_number: "",
      expiry_date: "",
    }, () => this.toggleModal())
  }

  onSubmitNewStock = (e) => {
    e.preventDefault()
    const { selected_drug, new_stock_quantity, batch_number, expiry_date } = this.state
    var data = {
      drug_id: selected_drug.id, new_stock_quantity, batch_number, expiry_date
    }
    this.props.addReorder(data)
    this.toggleModal()
  }

  render() {
    const { pharmacy: { drugs } } = this.props;

    const reorder_modal =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}>Adjust with reorder</ModalHeader>
        <form onSubmit={this.onSubmitNewStock}>
          <ModalBody>
            <div className="row col-12">
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm" readOnly={true}
                  name="brand_name" value={this.state.brand_name} />
                <label>Drug name</label>
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control form-control-sm" readOnly={true}
                  name="quantity_before" value={this.state.quantity_before} />
                <label>Current Quantity</label>
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control form-control-sm" required={true}
                  name="new_stock_quantity" value={this.state.new_stock_quantity} onChange={this.onChange} />
                <label>New Stock Quantity</label>
              </div>
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm" required={true}
                  name="batch_number" value={this.state.batch_number} onChange={this.onChange} />
                <label>Batch Number</label>
              </div>
              <div className="form-group col-12">
                <input type="text" className="form-control form-control-sm" required={true}
                  name="expiry_date" value={this.state.expiry_date} onChange={this.onChange}
                  onFocus={(e) => e.target.type = 'date'} onBlur={(e) => !e.target.value ? e.target.type = 'text' : 'date'} />
                <label>Expiry Date</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success">Submit</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div className="col-md-10 mx-auto mt-3">
        {reorder_modal}
        <div className="card">
          <div className="card-header py-2 px-3">
            <div>Shortage Notice</div>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-sm"
              table="data_table"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export" />
          </div>
          <div className="card-body p-0">
            <table id="data_table" className="table table-sm table-hover table-responsive-sm">
              <caption className="px-2"><i>Drugs on Reorder level</i></caption>
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Formular</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">RoL</th>
                  <th>Color</th>
                  <th>Smell</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {drugs.filter(d => d.quantity <= d.reorder_level).map((drug, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{drug.brand_name}</td>
                    <td>{drug.formula}</td>
                    <td className="text-center text-danger">{drug.quantity}</td>
                    <td className="text-center text-success">{drug.reorder_level}</td>
                    <td>{drug.color}</td>
                    <td>{drug.smell}</td>
                    <td><button className="btn btn-sm btn-primary"
                      onClick={() => this.onAdjustStock(drug)}>Adjust stock</button></td>
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

const mapStateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
  pharmacy: state.pharmacy,
});

export default connect(mapStateToProps, { getDrugs, addReorder })(ShortageNotice);
