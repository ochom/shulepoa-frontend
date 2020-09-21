import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { deleteData } from '../../common/actions'
import { addServiceRequest, deleteServiceRequest, getServiceRequests, updateServiceRequest } from '../../revenue/actions'

export class Investigation extends Component {
  state = {
    showModal: false,
    search_result: [],
    search: "",
  }

  componentDidMount = () => {
    this.props.getServiceRequests();
  }

  onChange = (e) => {
    var search_name = e.target.value;
    var search_result = this.props.services.filter(service =>
      ((service.department === 3 || service.department === 4) && service.name.toLowerCase().includes(search_name.toLowerCase())));
    search_result = search_result.slice(0, 10)
    this.setState({ search_result: search_result, search: e.target.value })
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewObservation = () => {
    this.setState({
      search_result: [],
    }, () => this.toggleModal());
  }

  addRequest = (service) => {
    const data = {
      admission_id: this.props.admission.id,
      patient_id: this.props.admission.patient_id,
      service_id: service.id,
      service_name: service.name,
      department: service.department,
      quantity: 1,
      is_approved: true,
      price: service.price,
      cost: service.price
    }

    this.props.addServiceRequest(data)
    this.toggleModal()
  }


  render() {
    const { service_requests, admission } = this.props
    const investigation_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Add investigation requests</ModalHeader>
        <ModalBody>
          <div>
            <div className="form-group">
              <input className="form-control" name="search_name" onChange={this.onChange}
                value={this.state.search} />
              <label><span role="img" aria-label="search">&#x1F50D;</span> Search...</label>
            </div>
            {this.state.search_result.length > 0 ?
              <table className="table table-sm table-bordered mt-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service name</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.search_result.map((search, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{search.name}</td>
                      <td className="text-center">{search.price}</td>
                      <td className="text-center">
                        <button className="btn btn-sm p-0 border-none text-primary"
                          onClick={() => this.addRequest(search)}><i className="fa fa-plus"></i> Add</button>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table> : null}
          </div>
        </ModalBody >
      </Modal >


    return (
      <>
        {investigation_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Laboratory  &nbsp; &amp; &nbsp; Radiology Requests</b></div>
            <button className="btn btn-sm "
              onClick={this.onNewObservation}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-responsive-sm">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Investigation</td>
                  <td>Result</td>
                  <td className="text-center">Served</td>
                  <td className="text-center">Action</td>
                </tr>
              </thead>
              <tbody>
                {service_requests.filter(request => (request.department === 3 || request.department === 4) && request.admission_id === admission.id).map((request, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{request.service_name}</td>
                    <td className="text-success">{request.description ? request.description : "Not ready"}</td>

                    <td className="text-center">
                      {
                        request.is_served ? <i className="fa fa-check text-success"></i> :
                          <i className="fa fa-minus text-secondary"></i>
                      }
                    </td>
                    <td className="text-center">
                      {!request.is_served ?
                        <button className="btn btn-sm  border-none btn-danger"
                          onClick={() => deleteData(request.id, this.props.deleteServiceRequest)}><i className="fa fa-trash"></i> delete</button>
                        : <button className="btn btn-sm btn-secondary disabled">no action</button>
                      }
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
export default connect(state => ({
  admission: state.inpatient.admission,
  service_requests: state.revenue.service_requests,
  common: state.common,
  services: state.hospital.services,
}), { getServiceRequests, addServiceRequest, updateServiceRequest, deleteServiceRequest })(Investigation)