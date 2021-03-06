import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteData } from '../../common/actions';
import { addSupplier, deleteSupplier, getSuppliers, updateSupplier } from '../actions';

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
    this.props.getSuppliers();
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

  onSubmit = (e) => {
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

  render() {
    const supplier_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_supplier ?
            <span><i className="fa fa-edit"></i> Edit Supplier Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Supplier</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                />
                <label>Company name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input type="email" className="form-control form-control-sm"
                  name="email" onChange={this.onChange} value={this.state.email} required={true}
                />
                <label>Email Address<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="phone" onChange={this.onChange} value={this.state.phone} required={true}
                />
                <label>Phone Nunber<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="address" onChange={this.onChange} value={this.state.address} required={true}
                />
                <label>Physical Address<sup>*</sup></label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <>
        {supplier_details}
        <div className="col-md-10 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2">Manage Suppliers</div>
              {this.props.rights.can_add_supplier ?
                <button
                  className="btn btn-sm py-1 px-2 mr-auto"
                  onClick={this.onNewSupplier}><i className="fa fa-plus-circle mr-2"></i> Add Supplier
              </button> : null}
            </div>
            <div className="card-body p-0">
              <table className="table table-sm table-striped table-bordered">
                <caption className="px-2"><i>Recent suppliers | Search results</i></caption>
                <thead className="cu-text-primary">
                  <tr><th>#</th><th>Name</th><th>Email</th><th>Mobile</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {this.props.suppliers.map((supplier, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{supplier.name}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>
                        {this.props.rights.can_edit_supplier ?
                          <>
                            <button className="btn btn-sm btn-success mr-2"
                              onClick={() => this.onEditSupplier(supplier)}><i className="fa fa-edit"></i> Edit</button>
                            <button className="btn btn-sm btn-danger"
                              onClick={() => deleteData(supplier.id, this.props.deleteSupplier)}><i className="fa fa-trash"></i> Delete</button>
                          </> : null
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  suppliers: state.inventory.suppliers,
  common: state.common,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getSuppliers, addSupplier, updateSupplier, deleteSupplier })(Supplier);
