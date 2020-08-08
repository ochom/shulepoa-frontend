import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveReorder } from '../actions';


export class Reorders extends Component {
  state = {
    service_search_name: "",
    showModal: false,
    select_service: null,

    name: "",
    quantity_in_store: "",
    new_stock: "",
    batch: "",
    supplier: "",
  }

  componentDidMount() {
    var data = this.props.hospital.service_list.filter(service => service.id === parseInt(this.props.match.params.pk));
    if (data.length > 0) {
      data = data[0]
      this.setState({
        select_service: data,
        name: data.name,
        quantity_in_store: data.quantity_in_store,
      })
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmitService = (e) => {
    e.preventDefault();
    const {
      select_service,
      quantity_in_store,
      new_stock,
      batch,
      supplier,
    } = this.state;

    const data = {
      service_id: select_service.id,
      quantity_in_store,
      new_stock,
      batch,
      supplier,
    }
    this.props.saveReorder(data);
    this.props.history.push('/pharmacy/drugs-reorders/');
  }


  render() {
    const { supplier_list } = this.props.hospital;
    return (
      <>
        <div className="row col-md-7 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-2 px-3">Adjust Pharmacy Stock</div>
            <div className="card-body">
              <form onSubmit={this.onSubmitService}>
                <div className="row mx-auto">
                  <div className="form-group col-12">
                    <label>Drug Name<sup>*</sup></label>
                    <input className="form-control form-control-sm" readOnly={true}
                      name="name" onChange={this.onChange} value={this.state.name} required={true}
                      placeholder="Drug name" />
                  </div>
                  <div className="form-group col-6">
                    <label>Quantity in store <sup>*</sup></label>
                    <input className="form-control form-control-sm" readOnly={true}
                      name="quantity_in_store" required={true}
                      value={this.state.quantity_in_store} placeholder="0"
                      onChange={this.onChange} />
                  </div>
                  <div className="form-group col-6">
                    <label>New Stock <sup>*</sup></label>
                    <input className="form-control form-control-sm"
                      name="new_stock" required={true}
                      value={this.state.new_stock} placeholder="0"
                      onChange={this.onChange} />
                  </div>
                  <div className="form-group col-12">
                    <label>Batch Number<sup>*</sup></label>
                    <input className="form-control form-control-sm"
                      name="batch" onChange={this.onChange} value={this.state.batch} required={true}
                      placeholder="Batch number" />
                  </div>
                  <div className="form-group col-12">
                    <label>Supplier</label>
                    <select className="form-control form-control-sm"
                      name="supplier" onChange={this.onChange} value={this.state.supplier} required={true}
                      placeholder="supplier">
                      <option value="">Select</option>
                      {supplier_list.map((supplier, index) => <option key={index} value={supplier.id}>{supplier.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group col-12">
                  <button type="submit" className="btn btn-sm btn-primary mr-3"
                    onSubmit={this.onSubmitService}>
                    <i className="fa fa-check"></i> Save</button>{' '}
                  <Link to="/pharmacy/drugs-reorders/" className="btn btn-sm btn-secondary">
                    <i className="fa fa-close"></i> Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
});

export default connect(mapStateToProps, { saveReorder })(Reorders);
