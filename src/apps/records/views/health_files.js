import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getPatient, getPatientHealthFiles, addHealthFile, loadScheme } from '../actions'
import { Link } from 'react-router-dom';

export class HealthFiles extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      isSearchingService: false,
      filtered_service_list: [],

      patient: params.patient_id,
      selected_Service_id: "",
      selected_service_name: "",
      treatment_scheme: "",
      primary_scheme: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getPatient(this.state.patient);
    this.props.getPatientHealthFiles(this.state.patient);
    this.props.loadScheme(this.state.patient);
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
    const { patients_list, patient_insurance_list } = this.props.patients;
    const { TREATMENT_SCHEMES } = this.props.common.CONSTANTS;
    const { insurance_list } = this.props;

    const book_appointment_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Create Healthfile</ModalHeader>
        <form onSubmit={this.onSubmitHealthFile}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <i className="fa fa-search custom-text-secondary px-3" style={{ position: "absolute", paddingTop: "1vw" }}></i>
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


    const health_files_list = this.props.patients.patient_health_files.map((_file, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{new Date(_file.created_at).toLocaleString("en-UK")}</td>
        <td>{_file.id}</td>
        <td>{_file.is_open ?
          <span className={`p-1 px-2 rounded bg-success text-light`}>Opened</span> :
          <span className={`p-1 rounded bg-primary text-light`}>Closed</span>}
        </td>
        <td className="text-center">
          <Link to={`/records/patients/${this.state.patient}/health-files/${_file.id}`}
            className="btn btn-sm p-0 border-none cu-text-primary"><i className="fa fa-eye"></i> Preview</Link>
        </td>
      </tr>
    )
    return (
      <>
        {book_appointment_view}
        <div className="col-md-8 col-lg-7 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-briefcase"></i> Health Files</div>
              <button
                className="btn btn-sm"
                onClick={this.onNewHealthFile}><i className="fa fa-plus-circle mr-2"></i> Create Health File
              </button>
            </div>
            <div className="card-body p-0 pb-2">
              <h5 className="py-2 px-3">{patients_list.length > 0 ? patients_list[0].fullname : ""}</h5>
            </div>
          </div>
          <div className="card card-body mt-4 p-0">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Patient health files</i></caption>
              <thead className="">
                <tr><th>#</th><th>Date</th><th>File</th><th>Status</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {health_files_list}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  patients: state.patients,
  service_list: state.hospital.service_list,
  common: state.common,
  insurance_list: state.hospital.insurance_list,
});

export default connect(mapStateToProps,
  { loadScheme, getPatient, getPatientHealthFiles, addHealthFile }
)(HealthFiles);
