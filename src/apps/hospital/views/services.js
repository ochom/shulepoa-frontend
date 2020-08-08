import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { loadService, searchService, addService, updateService } from '../actions';

export class Service extends Component {
  state = {
    service_search_name: "",
    service_search_department: "",
    showModal: false,
    select_service: null,

    name: "",
    department: "",
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
      department: "",
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
      department: data.department,
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
      description,
      price,
      rebate,
      is_insured
    } = this.state;

    const data = {
      name,
      department,
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
      "department": this.state.service_search_department,
    }
    this.props.searchService(data);
  }

  render() {
    const { service_list } = this.props.hospital;
    const { DEPARTMENTS } = this.props.common.CONSTANTS;
    const department_choices = DEPARTMENTS.map((department, index) => <option key={index} value={index}>{department}</option>)
    const service_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_service ?
            <span><i className="fa fa-edit"></i> Edit Service Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Service</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitService}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Sevice Name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true}
                  placeholder="Service full name" />
              </div>
              <div className="form-group col-12">
                <label>Department<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="department" onChange={this.onChange}
                  value={this.state.department} required={true} >
                  <option value={null}>Select</option>
                  {department_choices}
                </select>
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
                <label>Is this service paid by insurance ?<sup>*</sup></label>
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
                  placeholder="Other descriptions of this service" ></textarea>
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

    const service_filter_list = service_list.map((service, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{service.name}</td>
        <td>{DEPARTMENTS[service.department]}</td>
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
              <div
                style={{ fontSize: "1.2vw", width: "300px", float: "left" }} className="py-1 px-2"><i className="fa fa-globe"></i> Browse service companies</div>
              <button
                style={{ float: "right" }}
                className="btn btn-sm py-1 px-2 mr-auto"
                onClick={this.onNewService}><i className="fa fa-plus-circle mr-2"></i> Add Service
              </button>
            </div>
            <div className="card-body p-0 pb-2">
              <div className="row col-12 mx-auto mt-3">
                <div className="form-group  col-3">
                  <label>Service name</label>
                  <input className="form-control form-control-sm"
                    name="service_search_name"
                    value={this.state.service_search_name}
                    onChange={this.onChange}
                    placeholder="Enter name" />
                </div>
                <div className="form-group  col-3">
                  <label>Department</label>
                  <select className="form-control form-control-sm"
                    name="service_search_department"
                    value={this.state.service_search_department}
                    onChange={this.onChange}>
                    <option value={null}>Select</option>
                    {department_choices}
                  </select>
                </div>
              </div>
              <div className="row col-12 mx-auto">
                <button
                  className="btn btn-sm btn-outline-success cu-text-primary ml-4"
                  onClick={this.onsearchService}
                  disabled={this.props.common.isProcessing}><i className="fa fa-search mr-2"></i> Find Service</button>
              </div>
            </div>
          </div>
          <div className="card card-body mt-4">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Recent services | Search results</i></caption>
              <thead className="cu-bg-secondary">
                <tr><th>#</th><th>Name</th><th>Department</th><th>Price</th><th>Rebate</th><th>Scheme</th><th className="text-center">Action</th></tr>
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

export default connect(mapStateToProps, { loadService, searchService, addService, updateService })(Service);
