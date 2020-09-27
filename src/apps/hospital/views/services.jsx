import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteData } from '../../common/actions';
import { addService, deleteService, getServices, updateService } from '../actions';
import PaginatedTable from '../../common/pagination';

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
                  value={this.state.department} required={true}>
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

    const columns = [
      {
        title: "Service Name",
        render: rowData => {
          return <span>{rowData.name}</span>
        }
      },
      {
        title: "Department",
        render: rowData => {
          return <span>{DEPARTMENTS[rowData.department]}</span>
        }
      },
      {
        title: "Cost",
        render: rowData => {
          return <span>{rowData.price}</span>
        }
      },
      {
        title: "Action",
        render: rowData => {
          return <>
            {this.props.rights.can_edit_insurance ?
              <>
                <button className="btn btn-sm btn-success mr-2"
                  onClick={() => this.onEditService(rowData)}><i className="fa fa-edit"></i> Edit</button>
                <button className="btn btn-sm btn-danger"
                  onClick={() => deleteData(rowData.id, this.props.deleteService)}><i className="fa fa-trash"></i> Delete</button>
              </> : <button className="btn btn-sm btn-secondary disabled">No Action</button>
            }
          </>
        }
      },
    ]
    return (
      <div className="col-md-10 mx-auto mt-3">
        {service_details}
        <div className="card">
          <div className="card-header">
            <div>Services</div>
            {this.props.rights.can_add_service ?
              <button
                className="btn btn-sm"
                onClick={this.onNewService}><i className="fa fa-plus-circle"></i>  Add Service
              </button> : null}
          </div>
          <div className="card-body p-0">
            <PaginatedTable cols={columns} rows={services} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getServices, addService, updateService, deleteService })(Service);
