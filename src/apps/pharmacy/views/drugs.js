import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addService, loadService, searchService, updateService } from '../../hospital/actions';

export class Drugs extends Component {
  state = {
    service_search_name: "",
    showModal: false,
    select_service: null,

    name: "",
    department: 5,
    quantity_in_store: "",
    reorder_level: "",
    description: "",
    price: "",
    rebate: "",
    is_insured: true,
  }

  componentDidMount() {
    this.props.loadService();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleCheck = (e) => {
    this.setState({ [e.target.name]: e.target.checked ? 1 : 0 })
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewService = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_service: null,
      name: "",
      quantity_in_store: "",
      reorder_level: "",
      description: "",
      price: "",
      rebate: "",
      is_insured: true,
    })
  }

  onEditService = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_service: data,
      name: data.name,
      quantity_in_store: data.quantity_in_store,
      reorder_level: data.reorder_level,
      description: data.description,
      price: data.price,
      rebate: data.rebate,
      is_insured: data.is_insured,
    })
  }

  onSubmitService = (e) => {
    e.preventDefault();
    const {
      select_service,
      name,
      department,
      quantity_in_store,
      reorder_level,
      description,
      price,
      rebate,
      is_insured
    } = this.state;

    const data = {
      name,
      department,
      quantity_in_store,
      reorder_level,
      description,
      price,
      rebate,
      is_insured
    }
    if (select_service) {
      this.props.updateService(select_service.id, data);
    } else {
      this.props.addService(data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  onsearchService = () => {
    const data = {
      "name": this.state.service_search_name,
      "department": this.state.department,
    }
    this.props.searchService(data);
  }

  render() {
    const { service_list } = this.props.hospital;
    const service_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_service ?
            <span><i className="fa fa-edit"></i> Edit Drug Details</span> :
            <span><i className="fa fa-plus-circle"></i> Add Drug</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitService}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Drug Name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                  placeholder="Drug name" />
              </div>
              <div className="form-group col-6">
                <label>Quantity in store <sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="quantity_in_store" required={true}
                  value={this.state.quantity_in_store} placeholder="0"
                  onChange={this.onChange} />
              </div>
              <div className="form-group col-6">
                <label>Re-order Level <sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="reorder_level" required={true}
                  value={this.state.reorder_level} placeholder="0"
                  onChange={this.onChange} />
              </div>
              <div className="form-group col-6">
                <label>Price<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="price" onChange={this.onChange} value={this.state.price} required={true}
                  placeholder="Service price" />
              </div>
              <div className="form-group col-6">
                <label>Rebate (NHIF)<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="rebate" onChange={this.onChange} value={this.state.rebate} required={true}
                  placeholder="Rebate amount" />
              </div>

              <div className="form-group col-12">
                <label>Is this drug paid by insurance ?<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="is_insured" onChange={this.onChange}
                  value={this.state.is_insured} required={true} >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="form-group col-12">
                <label>Other descriptions</label>
                <textarea className="form-control form-control-sm"
                  name="description" onChange={this.onChange} value={this.state.description}
                  placeholder="Other descriptions of this drug" ></textarea>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitService}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    const service_filter_list = service_list.filter(service => service.department === 5).map((service, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{service.name}</td>
        <td>{service.quantity_in_store}</td>
        <td>{service.price}</td>
        <td>{service.rebate}</td>
        <td>{service.is_insured ? 'Yes' : 'No'}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onEditService(service)}><i className="fa fa-edit"></i> Edit</button>{' | '}
          <button className="btn btn-sm p-0 border-none text-danger"><i className="fa fa-trash"></i> Delete</button>
        </td>
      </tr>
    )
    return (
      <>
        {service_details}
        <div className="col-12 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-globe"></i> Drugs Stock</div>
              <button
                className="btn btn-sm"
                onClick={this.onNewService}><i className="fa fa-plus-circle mr-2"></i> Add Drug
              </button>
            </div>
            <div className="card-body p-0 pb-2">
              <div className="row col-12 mx-auto mt-3">
                <div className="form-group  col-5">
                  <input className="form-control form-control-sm"
                    name="service_search_name"
                    value={this.state.service_search_name}
                    onChange={this.onChange}
                    placeholder="Search drugs by name..." />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-sm btn-outline-success cu-text-primary ml-4"
                    onClick={this.onsearchService}
                    disabled={this.props.common.isProcessing}><i className="fa fa-search mr-2"></i> Find Service</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-body col-12 p-0 mt-2">
            <table className="table table-sm table-striped table-bordered">
              <caption className="px-2"><i>All drugs | Drug search results</i></caption>
              <thead className="">
                <tr><th>#</th><th>Drug</th><th>Quantity</th><th>Price</th><th>Rebate</th><th>Scheme</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {service_filter_list}
              </tbody>
            </table>
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

export default connect(mapStateToProps, { loadService, searchService, addService, updateService })(Drugs);
