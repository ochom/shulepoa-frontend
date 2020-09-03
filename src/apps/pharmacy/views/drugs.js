import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getDrugs, addDrug, updateDrug, deleteDrug } from '../actions';

export class Drugs extends Component {
  state = {
    showModal: false,
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
    price: ""
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
    }

    const updateData = {
      brand_name,
      act_ing_name,
      exc_name,
      act_ing_short_name,
      formula,
      color,
      form,
      smell,
      taste,
      units,
      reorder_level,
      price
    }

    if (selected_drug) {
      this.props.updateDrug(selected_drug.id, updateData);
    } else {
      this.props.addDrug(data)
    }
    this.toggleModal();
  }

  onSearch = (e) => {
    var search = e.target.value
    //
  }

  onDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <div className="card">
              <div className="card-header">Delete</div>
              <div className="card-body">
                <p>You want to delete this file?</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-sm btn-danger"
                  onClick={() => {
                    this.props.deleteDrug(id);
                    onClose();
                  }}>Yes, Delete it!
                </button>
                <button className="btn btn-sm btn-secondary ml-2" onClick={onClose}>No</button>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const { drugs,
      common: { CONSTANTS: { DRUG_ADMINISTRATION } } } = this.props;
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
                <label>Name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="brand_name" onChange={this.onChange} value={this.state.brand_name} required={true}
                  placeholder="Drug name" />
              </div>
              <div className="form-group col-md-6">
                <label>Active ingredient name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="act_ing_name" required={true} value={this.state.act_ing_name}
                  onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label>Active ingredient short name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="act_ing_short_name" required={true} value={this.state.act_ing_short_name}
                  onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label>Excipient name</label>
                <input className="form-control form-control-sm"
                  name="exc_name" value={this.state.exc_name}
                  onChange={this.onChange} />
              </div>
              <div className="form-group col-md-6">
                <label>Chemical formula</label>
                <input className="form-control form-control-sm"
                  name="formula" required={true} value={this.state.formula}
                  onChange={this.onChange} />
              </div>
              <div className="form-group col-6">
                <label>Administration <sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="form" required={true} value={this.state.form} onChange={this.onChange}>
                  <option value="">Select</option>
                  {DRUG_ADMINISTRATION.sort().map((admin, index) => <option key={index} value={admin}>{admin}</option>)}
                </select>
              </div>
              <div className="form-group col-6">
                <label>Color<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="color" onChange={this.onChange} value={this.state.color} required={true} />
              </div>
              <div className="form-group col-6">
                <label>Smell<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="smell" onChange={this.onChange} value={this.state.smell} required={true} />
              </div>
              <div className="form-group col-6">
                <label>Taste<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="taste" onChange={this.onChange} value={this.state.taste} required={true} />
              </div>
              <div className="form-group col-6">
                <label>Start Quantity<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="quantity" onChange={this.onChange} value={this.state.quantity} required={true} />
              </div>
              <div className="form-group col-6">
                <label>Units<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="units" onChange={this.onChange} value={this.state.units} required={true} />
              </div>
              <div className="form-group col-6">
                <label>Re-order Level<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="reorder_level" onChange={this.onChange} value={this.state.reorder_level}
                  required={true} />
              </div>
              <div className="form-group col-6">
                <label>Price<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="price" onChange={this.onChange} value={this.state.price} required={true} />
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
    return (
      <div className="col-md-10 mx-auto mt-3">
        {service_details}
        <input className="form-control form-control-sm my-2" name="search"
          onChange={this.onSearch} placeholder="Search..." />
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
                  <th>Administration</th>
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
                      <button className="btn btn-sm border-none btn-danger"
                        onClick={() => this.onDelete(drug.id)}><i className="fa fa-trash"></i> Delete</button>
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

const mapStateToProps = state => ({
  hospital: state.hospital,
  drugs: state.pharmacy.drugs,
  common: state.common,
});

export default connect(mapStateToProps, { getDrugs, addDrug, updateDrug, deleteDrug })(Drugs);
