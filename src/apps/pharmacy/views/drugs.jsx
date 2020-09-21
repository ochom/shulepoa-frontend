import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addDrug, addReorder, deleteDrug, getDrugs, updateDrug } from '../actions';

export class Drugs extends Component {
  state = {
    showModal: false,
    showModal2: false,
    selected_drug: null,
    search: "",

    brand_name: "",
    act_ing_name: "",
    exc_name: "",
    act_ing_short_name: "",
    formula: "",
    color: "",
    form: "",
    smell: "",
    taste: "",
    quantity: "",
    units: "",
    reorder_level: "",
    price: "",

    quantity_before: "",
    new_stock_quantity: "",
    quantity_after: "",
    batch_number: "",
    expiry_date: ""
  }

  componentDidMount() {
    this.props.getDrugs();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewDrug = () => {
    this.setState({
      selected_drug: null,

      brand_name: "",
      act_ing_name: "",
      exc_name: "",
      act_ing_short_name: "",
      formula: "",
      color: "",
      form: "",
      smell: "",
      taste: "",
      quantity: "",
      units: "",
      reorder_level: "",
      price: ""
    }, () => this.toggleModal())
  }

  onEditDrug = (data) => {
    this.setState({
      selected_drug: data,
      brand_name: data.brand_name,
      act_ing_name: data.act_ing_name,
      exc_name: data.exc_name,
      act_ing_short_name: data.act_ing_short_name,
      formula: data.formula,
      color: data.color,
      form: data.form,
      smell: data.smell,
      taste: data.taste,
      quantity: data.quantity,
      units: data.units,
      reorder_level: data.reorder_level,
      price: data.price
    }, () => this.toggleModal())
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_drug,
      brand_name,
      act_ing_name,
      exc_name,
      act_ing_short_name,
      formula,
      color,
      form,
      smell,
      taste,
      quantity,
      units,
      reorder_level,
      price
    } = this.state;

    const data = {
      brand_name,
      act_ing_name,
      exc_name,
      act_ing_short_name,
      formula,
      color,
      form,
      smell,
      taste,
      quantity,
      units,
      reorder_level,
      price
    }

    if (selected_drug) {
      delete data.quantity
      this.props.updateDrug(selected_drug.id, data);
    } else {
      this.props.addDrug(data)
    }
    this.toggleModal();
  }

  onSearch = (e) => {
  }

  onAdjustStock = (data) => {
    this.setState({
      selected_drug: data,
      brand_name: data.brand_name,
      quantity_before: data.quantity,
      new_stock_quantity: "",
      batch_number: "",
      expiry_date: "",
    }, () => this.toggleModal2())
  }

  toggleModal2 = () => this.setState({ showModal2: !this.state.showModal2 })

  onSubmitNewStock = (e) => {
    e.preventDefault()
    const { selected_drug, new_stock_quantity, batch_number, expiry_date } = this.state
    var data = {
      drug_id: selected_drug.id, new_stock_quantity, batch_number, expiry_date
    }
    this.props.addReorder(data)
    this.toggleModal2()
  }

  render() {
    const {
      drugs,
      common: { CONSTANTS: { DRUG_ADMINISTRATION } }
    } = this.props;

    const service_details =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_drug ?
            <span><i className="fa fa-edit"></i> Edit Drug Details</span> :
            <span><i className="fa fa-plus-circle"></i> Add Drug</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-md-6">
                <input className="form-control form-control-sm"
                  name="brand_name" onChange={this.onChange} value={this.state.brand_name} required={true} />
                <label>Name<sup>*</sup></label>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control form-control-sm"
                  name="act_ing_name" required={true} value={this.state.act_ing_name}
                  onChange={this.onChange} />
                <label>Active ingredient name<sup>*</sup></label>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control form-control-sm"
                  name="act_ing_short_name" required={true} value={this.state.act_ing_short_name}
                  onChange={this.onChange} />
                <label>Active ingredient short name<sup>*</sup></label>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control form-control-sm"
                  name="exc_name" value={this.state.exc_name}
                  onChange={this.onChange} />
                <label>Excipient name</label>
              </div>
              <div className="form-group col-md-6">
                <input className="form-control form-control-sm"
                  name="formula" required={true} value={this.state.formula}
                  onChange={this.onChange} />
                <label>Chemical formula</label>
              </div>
              <div className="form-group col-6">
                <select className="form-control form-control-sm"
                  name="form" required={true} value={this.state.form} onChange={this.onChange}>
                  <option value="">Select</option>
                  {DRUG_ADMINISTRATION.sort().map((admin, index) => <option key={index} value={admin}>{admin}</option>)}
                </select>
                <label>Administration <sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="color" onChange={this.onChange} value={this.state.color} required={true} />
                <label>Color<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="smell" onChange={this.onChange} value={this.state.smell} required={true} />
                <label>Smell<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="taste" onChange={this.onChange} value={this.state.taste} required={true} />
                <label>Taste<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="quantity" onChange={this.onChange} value={this.state.quantity} required={true} />
                <label>Start Quantity<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="units" onChange={this.onChange} value={this.state.units} required={true} />
                <label>Units<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="reorder_level" onChange={this.onChange} value={this.state.reorder_level}
                  required={true} />
                <label>Re-order Level<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="price" onChange={this.onChange} value={this.state.price} required={true} />
                <label>Price<sup>*</sup></label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    const reorder_modal =
      <Modal isOpen={this.state.showModal2}>
        <ModalHeader toggle={this.toggleModal2}>Adjust with reorder</ModalHeader>
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
              onClick={this.toggleModal2}>Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div className="col-md-10 mx-auto mt-3" >
        {service_details}
        {reorder_modal}
        < div className="form-group col-12" >
          <input className="form-control form-control-sm" name="search"
            onChange={this.onSearch} value={this.state.search} />
          <label><span role="img" aria-label="search">&#x1F50D;</span> Search...</label>
        </div>
        <div className="card">
          <div className="card-header py-2 px-3">
            <div>Drugs</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewDrug}><i className="fa fa-plus-circle mr-2"></i> Add Drug
              </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-hover table-responsive-sm">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Active</th>
                  <th>Atx.</th>
                  <th>Formula</th>
                  <th>Admin.</th>
                  <th className="text-center">Qty.</th>
                  <th>Color</th>
                  <th>Smell</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {drugs.map((drug, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{drug.brand_name}</td>
                    <td className="text-primary">{drug.act_ing_name}</td>
                    <td>{drug.act_ing_short_name}</td>
                    <td>{drug.formula}</td>
                    <td className="text-success">{drug.form}</td>
                    <td className="text-center text-danger">{drug.quantity}</td>
                    <td>{drug.color}</td>
                    <td>{drug.smell}</td>
                    <td>
                      <button className="btn btn-sm mr-2 border-none btn-success"
                        onClick={() => this.onEditDrug(drug)}><i className="fa fa-edit"></i> Edit</button>
                      <button className="btn btn-sm border-none btn-primary"
                        onClick={() => this.onAdjustStock(drug)}><i className="fa fa-plus"></i> Adjust Stock</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  hospital: state.hospital,
  drugs: state.pharmacy.drugs,
  common: state.common,
});

export default connect(mapStateToProps, { getDrugs, addDrug, updateDrug, deleteDrug, addReorder })(Drugs);
