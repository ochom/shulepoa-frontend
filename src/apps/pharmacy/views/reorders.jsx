import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getDrugs, addReorder } from '../actions';


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
    const { pharmacy: { reorders } } = this.props;

    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-2 px-3">
            <div>Stock ajustment records</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewDrug}><i className="fa fa-file-excel-o"></i> Export
              </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-hover table-responsive-sm">
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
                {reorders.map((drug, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{drug.brand_name}</td>
                    <td>{drug.formula}</td>
                    <td className="text-center text-danger">{drug.quantity}</td>
                    <td className="text-center text-success">{drug.reorder_level}</td>
                    <td>{drug.color}</td>
                    <td>{drug.smell}</td>
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
