import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, } from 'reactstrap'
import { getInvestigations, addInvestigation, deleteInvestigation } from '../../actions'
import { Link } from 'react-router-dom'

export class Investigation extends Component {
  state = {
    showModal: false,
    search_result: [],
  }


  componentDidMount = () => {
    this.props.getInvestigations(this.props.health_file.id);
  }

  onChange = (e) => {
    var search_name = e.target.value;
    var search_result = this.props.service_list.filter(service =>
      ((service.department === 3 || service.department === 4) && service.name.toLowerCase().includes(search_name.toLowerCase())));
    search_result = search_result.slice(0, 10)
    this.setState({ search_result: search_result })
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewObservation = () => {
    this.setState({
      showModal: !this.state.showModal,
      search_result: [],
    });
  }

  onAddInvestigation = (service) => {
    const data = {
      service: service.id,
    }
    this.props.addInvestigation(this.props.health_file.id, data);
    this.setState({ showModal: !this.state.showModal });
  }

  onDeleteInvestigation = (data) => {
    this.props.deleteInvestigation(this.props.health_file.id, data.id)
  }

  render() {
    const { investigations } = this.props;
    const investigation_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Add investigation requests</ModalHeader>
        <ModalBody>
          <div className="form-row">
            <input className="form-control col-12" name="search_name" onChange={this.onChange}
              placeholder="Search..." />
            {this.state.search_result.length > 0 ?
              <table className="table table-sm table-bordered mt-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service name</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.search_result.map((search, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{search.name}</td>
                      <td>{search.price}</td>
                      <td className="text-center">
                        <button className="btn btn-sm p-0 border-none text-primary"
                          onClick={() => this.onAddInvestigation(search)}><i className="fa fa-plus"></i> Add</button>
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
          <div className="card-header custom-bg-secondary py-1 px-3">
            <div
              style={{ fontSize: "1vw", float: "left" }} className="py-1 px-2">Laboratory  &nbsp; &amp; &nbsp; Radiology Requests</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm bg-light text-dark py-0 px-2 mr-auto mt-1"
              onClick={this.onNewObservation}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered m-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Investigation</th>
                  <th>Status</th>
                  <th>Result</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {investigations.map((investigation, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{investigation.service_details.name}</td>
                    <td>
                      {investigation.is_served ? "Ready" : "In progress"}
                    </td>
                    <td>{investigation.description ? investigation.description : "--"}</td>
                    <td className="text-center">
                      {!investigation.is_served ?
                        <button className="btn btn-sm p-0 border-none text-danger"
                          onClick={() => this.onDeleteInvestigation(investigation)}>
                          <i className="fa fa-close"></i> Remove</button>
                        : investigation.department === 3 ?
                          <Link to={`/laboratory/logbooks/${investigation.id}`}>View result</Link> :
                          <Link to={`/radiology/logbooks/${investigation.id}`}>View result</Link>
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
  health_file: state.inpatient.selected_health_file,
  investigations: state.inpatient.investigations,
  common: state.common,
  service_list: state.hospital.service_list,
}), { getInvestigations, addInvestigation, deleteInvestigation })(Investigation)
