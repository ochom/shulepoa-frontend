import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteData } from '../../common/actions';
import { addService, deleteService, getServices, updateService } from '../actions';

export class Service extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      select_service: null,
      services: props.hospital.services,

      name: "",
      department: "",
      description: "",
      price: "",
    }
  }

  componentDidMount() {
    this.props.getServices();
  }

  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ services: nextProps.hospital.services })
    }
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
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      select_service,
      name,
      department,
      description,
      price,
    } = this.state;

    const data = {
      name,
      department,
      description,
      price,
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

  onSearch = (e) => {
    const search = (e.target.value).toLowerCase()
    this.setState({
      services: this.props.hospital.services.filter(ser => ser.name.toLowerCase().includes(search))
    })
  }

  render() {
    const { services } = this.state;
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
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true} />
                <label>Sevice Name<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <select className="form-control form-control-sm"
                  name="department" onChange={this.onChange} data-value={this.state.department}
                  value={this.state.department} required={true} >
                  <option value=""></option>
                  {department_choices}
                </select>
                <label>Department<sup>*</sup></label>
              </div>
              <div className="form-group col-6">
                <input className="form-control form-control-sm"
                  name="price" onChange={this.onChange} value={this.state.price} required={true} />
                <label>Price<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm"
                  name="description" onChange={this.onChange} value={this.state.description}></textarea>
                <label>Other descriptions</label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-md-10 mx-auto mt-3">
        {service_details}
        <div className="form-group my-2">
          <input className="form-control" defaultValue="" onChange={this.onSearch} />
          <label><span role="img" aria-label="search">&#x1F50D;</span> Search...</label>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="">Offered Services</div>
            <button
              className="btn btn-sm py-1 px-2 mr-auto"
              onClick={this.onNewService}><i className="fa fa-plus-circle mr-2"></i> Add Service
              </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Recent services | Search results</i></caption>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Department</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{service.name}</td>
                    <td>{DEPARTMENTS[service.department]}</td>
                    <td>{service.price}</td>
                    <td>
                      <button className="btn btn-sm btn-success mr-2"
                        onClick={() => this.onEditService(service)}><i className="fa fa-edit"></i> Edit</button>
                      <button className="btn btn-sm btn-danger"
                        onClick={() => deleteData(service.id, this.props.deleteService)}><i className="fa fa-trash"></i> Delete</button>
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
  common: state.common,
});

export default connect(mapStateToProps, { getServices, addService, updateService, deleteService })(Service);
