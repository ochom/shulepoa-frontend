import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { loadSupplier, searchSupplier, addSupplier, updateSupplier } from '../actions';

export class Supplier extends Component {
  state = {
    supplier_search_name: "",
    supplier_search_phone: "",
    showModal: false,
    select_supplier: null,


    name: "",
    email: "",
    phone: "",
    address: 0,

  }

  componentDidMount() {
    this.props.loadSupplier();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewSupplier = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_supplier: null,
      name: "",
      email: "",
      phone: "",
      address: "",
    })
  }

  onEditSupplier = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_supplier: data,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    })
  }

  onSubmitSupplier = (e) => {
    e.preventDefault();
    const {
      select_supplier,
      name,
      email,
      phone,
      address
    } = this.state;

    const data = {
      name,
      email,
      phone,
      address
    }
    if (select_supplier) {
      this.props.updateSupplier(select_supplier.id, data);
    } else {
      this.props.addSupplier(data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  onsearchSupplier = () => {
    const data = {
      "name": this.state.supplier_search_name,
      "phone": this.state.supplier_search_phone,
    }
    this.props.searchSupplier(data);
  }

  render() {
    const supplier_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_supplier ?
            <span><i className="fa fa-edit"></i> Edit Supplier Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Supplier</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitSupplier}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Company name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                  placeholder="Company full name" />
              </div>
              <div className="form-group col-12">
                <label>Email Address<sup>*</sup></label>
                <input type="email" className="form-control form-control-sm"
                  name="email" onChange={this.onChange} value={this.state.email} required={true}
                  placeholder="Email Address" />
              </div>
              <div className="form-group col-12">
                <label>Phone Nunber<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone} required={true}
                  placeholder="Contact phone number" />
              </div>
              <div className="form-group col-12">
                <label>Physical Address<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="address" onChange={this.onChange} value={this.state.address} required={true}
                  placeholder="Physical address" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitSupplier}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    const supplier_filter_list = this.props.supplier_list.map((supplier, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{supplier.name}</td>
        <td>{supplier.email}</td>
        <td>{supplier.phone}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onEditSupplier(supplier)}><i className="fa fa-edit"></i> Edit</button>{' | '}
          <button className="btn btn-sm p-0 border-none text-danger"><i className="fa fa-trash"></i> Delete</button>
        </td>
      </tr>
    )
    return (
      <>
        {supplier_details}
        <div className="col-md-10 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-handshake-o"></i> Manage suppliers</div>
              <button
                className="btn btn-sm py-1 px-2 mr-auto"
                onClick={this.onNewSupplier}><i className="fa fa-plus-circle mr-2"></i> Add Supplier
              </button>
            </div>
            <div className="card-body p-0 pb-2">
              <div className="row col-12 mx-auto mt-3">
                <div className="form-group  col-3">
                  <label>Supplier name</label>
                  <input className="form-control form-control-sm"
                    name="supplier_search_name"
                    value={this.state.supplier_search_name}
                    onChange={this.onChange}
                    placeholder="Enter name" />
                </div>
                <div className="form-group  col-3">
                  <label>Phone number</label>
                  <input className="form-control form-control-sm"
                    name="supplier_search_phone"
                    value={this.state.supplier_search_phone}
                    onChange={this.onChange}
                    placeholder="Enter phone number" />
                </div>
              </div>
              <div className="row col-12 mx-auto">
                <button
                  className="btn btn-sm btn-outline-success cu-text-primary ml-4"
                  onClick={this.onsearchSupplier}
                  disabled={this.props.common.isProcessing}><i className="fa fa-search mr-2"></i> Find Supplier</button>
              </div>
            </div>
          </div>
          <div className="card card-body mt-4 p-0">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Recent suppliers | Search results</i></caption>
              <thead className="cu-bg-secondary">
                <tr><th>#</th><th>Name</th><th>Email</th><th>Mobile</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {supplier_filter_list}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  supplier_list: state.hospital.supplier_list,
  common: state.common,
});

export default connect(mapStateToProps, { loadSupplier, searchSupplier, addSupplier, updateSupplier })(Supplier);
