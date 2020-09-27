import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addScheme, deleteScheme, updateScheme } from '../actions';

export class Schemes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      select_scheme: null,
      patient_id: props.patient_id,
      company_id: "",
      card_number: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewScheme = () =>
    this.setState({
      showModal: !this.state.showModal,
      select_scheme: null,
      company_id: "",
      card_number: "",
    })


  onEditScheme = (data) =>
    this.setState({
      showModal: !this.state.showModal,
      select_scheme: data,
      company_id: data.company_id,
      card_number: data.card_number,
    });

  onSubmitScheme = (e) => {
    e.preventDefault();
    const {
      select_scheme,
      company_id,
      card_number,
    } = this.state;

    const data = {
      patient_id: this.props.patient.id,
      company_id,
      card_number,
    }
    if (select_scheme) {
      this.props.updateScheme(select_scheme.id, data);
    } else {
      this.props.addScheme(data)
    }
    this.toggleModal()
  }


  render() {

    const { patient, insurances, rights } = this.props;
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
                <select className="form-control form-control-sm"
                  name="company_id" onChange={this.onChange} data-value={this.state.company_id}
                  value={this.state.company_id} required={true}>
                  <option value=""></option>
                  {insurances.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.company_name}</option>)}
                </select>
                <label>Insurance Company/Scheme<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="card_number" onChange={this.onChange} value={this.state.card_number} required={true} />
                <label>Card Number<sup>*</sup></label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmitScheme}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <>
        {scheme_details}
        <div className="card">
          <div className="card-header">
            <div> Patient Schemes</div>
            {rights.can_add_scheme ?
              <button
                className="btn btn-sm"
                onClick={this.onNewScheme}><i className="fa fa-plus-circle mr-2"></i> Add Insurance
              </button> : null}
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-responsive-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Scheme</th>
                  <th>Card</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {patient.insurance.map((scheme, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{scheme.company.company_name}</td>
                    <td>{scheme.card_number}</td>
                    <td className="text-center">
                      {rights.can_delete_scheme ?
                        <button className="btn btn-sm mr-2 border-none btn-success"
                          onClick={() => this.onEditScheme(scheme)}><i className="fa fa-edit"></i></button> : null}
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
  records: state.records,
  insurances: state.hospital.insurances,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps,
  { addScheme, updateScheme, deleteScheme }
)(Schemes);
