import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addHealthFile, getPatient, getPatientHealthFiles, loadScheme } from '../actions';

export class HealthFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchingService: false,
      filtered_service_list: [],

      patient: props.patient_id,
      selected_Service_id: "",
      selected_service_name: "",
      treatment_scheme: "",
      primary_scheme: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getPatientHealthFiles(this.state.patient);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewHealthFile = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      selected_Service_id: "",
      selected_service_name: "",
      treatment_scheme: "",
      primary_scheme: 0,
    });
  }

  onSearchService = (e) => {
    const search_name = e.target.value;
    if (search_name) {
      const search_result = this.props.service_list.filter((service) => (
        service.name.toLowerCase().includes(search_name.toLowerCase()) && service.department === 2));
      search_result.slice(0, 10)
      this.setState({ isSearchingService: true, filtered_service_list: search_result });
    } else {
      this.setState({ isSearchingService: false, filtered_service_list: [] });
    }
  }

  onSelectService = (data) =>
    this.setState({
      isSearchingService: false,
      filtered_service_list: [],
      selected_Service_id: data.id,
      selected_service_name: data.name,
    })

  onSubmitHealthFile = (e) => {
    e.preventDefault();
    const {
      patient,
      treatment_scheme,
      primary_scheme,
      selected_Service_id
    } = this.state;

    const file_data = {
      patient,
      treatment_scheme,
      primary_scheme,
      is_open: true,
      service: selected_Service_id,
    }

    if (selected_Service_id) {
      this.props.addHealthFile(file_data)
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  }

  render() {
    const { patient_insurance_list } = this.props.patients;
    const { TREATMENT_SCHEMES } = this.props.common.CONSTANTS;
    const { insurance_list } = this.props;

    const book_appointment_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Create Healthfile</ModalHeader>
        <form onSubmit={this.onSubmitHealthFile}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control pl-5" onChange={this.onSearchService}
                  placeholder="Search..." />
                <div style={{ position: "relative", display: this.state.isSearchingService ? "block" : "none" }}>
                  <div className="list-group w-100" style={{ position: "absolute", zIndex: "200" }}>
                    {this.state.filtered_service_list.map((service, index) =>
                      <button key={index} className="list-group-item px-3 py-1 bg-white text-left"
                        onClick={() => this.onSelectService(service)}>{service.name}</button>)
                    }
                  </div>
                </div>
              </div>
              <div className="form-group col-12">
                <label>Appointment Service Name<sup>*</sup></label>
                <input className="form-control form-control-sm" readOnly={true}
                  name="selected_service_name" onChange={this.onChange} value={this.state.selected_service_name} required={true}
                  placeholder="Service name" />
              </div>
              <div className="form-group col-12">
                <label>Payment Type/Scheme<sup>*</sup></label>
                <select className="form-control form-control-sm"
                  name="treatment_scheme" onChange={this.onChange} value={this.state.treatment_scheme} required={true}>
                  <option value="">Select</option>
                  {TREATMENT_SCHEMES.map((TREATMENT_SCHEME, index) => <option key={index} value={index}>{TREATMENT_SCHEME}</option>)}
                </select>
              </div>
              {parseInt(this.state.treatment_scheme) === 1 ?
                <>
                  <div className="form-group col-12">
                    <label>Scheme name<sup>*</sup></label>
                    <select className="form-control form-control-sm"
                      name="primary_scheme" onChange={this.onChange} value={this.state.primary_scheme} required={true}>
                      <option value={0}>Select</option>
                      {
                        patient_insurance_list.map((my_insurance, index) =>
                          <option key={index} value={my_insurance.company}>
                            {insurance_list.filter((_ins) => _ins.company_id === my_insurance.company_id)[0].company_name}
                          </option>)
                      }
                    </select>
                  </div>
                </>
                : null
              }
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitHealthFile}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >



    return (
      <>
        {book_appointment_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Health Files</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewHealthFile}><i className="fa fa-plus-circle mr-2"></i> Create Health File
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Patient health files</i></caption>
              <thead className="">
                <tr><th>#</th><th>Created</th><th>File</th><th>Status</th></tr>
              </thead>
              <tbody>
                {this.props.patients.patient_health_files.map((_file, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(_file.created).toLocaleString("en-UK")}</td>
                    <td>{_file.id}</td>
                    <td>{_file.is_open ?
                      <span className={`p-1 px-2 text-success`}>Active</span> :
                      <span className={`p-1 text-primary`}>Closed</span>}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  patients: state.records,
  service_list: state.hospital.service_list,
  common: state.common,
  insurance_list: state.hospital.insurance_list,
});

export default connect(mapStateToProps,
  { loadScheme, getPatient, getPatientHealthFiles, addHealthFile }
)(HealthFiles);
