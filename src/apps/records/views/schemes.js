import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getPatient, loadScheme, addScheme, updateScheme } from '../actions'

export class Schemes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: props.patient_id,
      showModal: false,
      select_scheme: null,
      company: "",
      card_number: "",
    };
  }

  componentDidMount() {
    this.props.getPatient(this.state.patient);
    this.props.loadScheme(this.state.patient);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  onNewScheme = () =>
    this.setState({
      showModal: !this.state.showModal,
      select_scheme: null,
      company: "",
      card_number: "",
    })


  onEditScheme = (data) =>
    this.setState({
      showModal: !this.state.showModal,
      select_scheme: data,
      company: data.company,
      card_number: data.card_number,
    });

  onSubmitScheme = (e) => {
    e.preventDefault();
    const {
      select_scheme,
      patient,
      company,
      card_number,
    } = this.state;

    const data = {
      patient,
      company,
      card_number,
    }
    if (select_scheme) {
      this.props.updateScheme(patient, select_scheme.id, data);
    } else {
      this.props.addScheme(patient, data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const { insurance_list } = this.props;
    const scheme_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_scheme ?
            <span><i className="fa fa-edit"></i> Edit Patient Scheme Details</span> :
            <span><i className="fa fa-plus-circle"></i> Add Patient Scheme</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitScheme}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Insurance Company/Scheme<sup>*</sup>
                </label>
                <select className="form-control form-control-sm"
                  name="company" onChange={this.onChange} value={this.state.company} required={true}>
                  <option value="">Select</option>
                  {insurance_list.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.company_name}</option>)}
                </select>
              </div>
              <div className="form-group col-12">
                <label>Card Number<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="card_number" onChange={this.onChange} value={this.state.card_number} required={true}
                  placeholder="Insurance card number" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitScheme}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <>
        {scheme_details}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"> Patient Schemes</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewScheme}><i className="fa fa-plus-circle mr-2"></i> Add Insurance
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Patient's Insurance schemes</i></caption>
              <thead className="">
                <tr><th>#</th><th>Insurance scheme</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {this.props.patients.patient_insurance_list.map((scheme, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{insurance_list.length > 0 ? insurance_list.filter(company => company.id === scheme.company)[0].company_name : ""}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditScheme(scheme)}><i className="fa fa-edit"></i> Edit</button>{' | '}
                      <button className="btn btn-sm p-0 border-none text-danger">
                        <i className="fa fa-trash"></i> Delete</button>
                    </td>
                  </tr>)}
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
  insurance_list: state.hospital.insurance_list,
});

export default connect(mapStateToProps,
  { getPatient, loadScheme, addScheme, updateScheme }
)(Schemes);
