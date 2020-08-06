import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { loadInsurance, searchInsurance, addInsurance, updateInsurance } from '../actions';

export class Insurance extends Component {
  state = {
    insurance_search_name: "",
    insurance_search_phone: "",
    showModal: false,
    select_insurance: null,


    company_name: "",
    company_email: "",
    company_phone: "",
    is_primary: 0,

  }

  componentDidMount() {
    this.props.loadInsurance();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleCheck = (e) => {
    this.setState({ [e.target.name]: e.target.checked ? 1 : 0 })
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewInsurance = () => {
    this.setState({
      showModal: !this.state.showModal,
      select_insurance: null,
      company_name: "",
      company_email: "",
      company_phone: "",
      is_primary: 0,
    })
  }

  onEditInsurance = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_insurance: data,
      company_name: data.company_name,
      company_email: data.company_email,
      company_phone: data.company_phone,
      is_primary: data.is_primary,
    })
  }

  onSubmitInsurance = (e) => {
    e.preventDefault();
    const {
      select_insurance,
      company_name,
      company_email,
      company_phone,
      is_primary
    } = this.state;

    const data = {
      company_name,
      company_email,
      company_phone,
      is_primary
    }
    if (select_insurance) {
      this.props.updateInsurance(select_insurance.id, data);
    } else {
      this.props.addInsurance(data)
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  onsearchInsurance = () => {
    const data = {
      "company_name": this.state.insurance_search_name,
      "company_phone": this.state.insurance_search_phone,
    }
    this.props.searchInsurance(data);
  }

  render() {
    const insurance_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_insurance ?
            <span><i className="fa fa-edit"></i> Edit Insurance Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Insurance</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmitInsurance}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Company name<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="company_name" onChange={this.onChange} value={this.state.company_name} required={true}
                  placeholder="Company full name" />
              </div>
              <div className="form-group col-12">
                <label>Email Address<sup>*</sup></label>
                <input type="email" className="form-control form-control-sm"
                  name="company_email" onChange={this.onChange} value={this.state.company_email} required={true}
                  placeholder="Email Address" />
              </div>
              <div className="form-group col-12">
                <label>Phone Nunber<sup>*</sup></label>
                <input className="form-control form-control-sm"
                  name="company_phone" onChange={this.onChange} value={this.state.company_phone} required={true}
                  placeholder="Contact phone number" />
              </div>

              <div className="form-check col-12 pl-5 ">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"
                  name="is_primary" onChange={this.toggleCheck} checked={this.state.is_primary} />
                <label className="form-check-label custom-text-secondary py-1" htmlFor="exampleCheck1">This is the hospital's primary insurance</label>
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-primary"
              onSubmit={this.onSubmitInsurance}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    const insurance_filter_list = this.props.insurance_list.map((insurance, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{insurance.company_name}</td>
        <td>{insurance.company_email}</td>
        <td>{insurance.company_phone}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none text-success"
            onClick={() => this.onEditInsurance(insurance)}><i className="fa fa-edit"></i> Edit</button>{' | '}
          <button className="btn btn-sm p-0 border-none text-danger"><i className="fa fa-trash"></i> Delete</button>
        </td>
      </tr>
    )
    return (
      <>
        {insurance_details}
        <div className="col-12 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div
                style={{ fontSize: "1.2vw", width: "300px", float: "left" }} className="py-1 px-2"><i className="fa fa-globe"></i> Browse insurance companies</div>
              <button
                style={{ float: "right" }}
                className="btn btn-sm custom-bg-secondary py-1 px-2 text-light mr-auto"
                onClick={this.onNewInsurance}><i className="fa fa-plus-circle mr-2"></i> Add Insurance
              </button>
            </div>
            <div className="card-body p-0 pb-2">
              <div className="row col-12 mx-auto mt-3">
                <div className="form-group  col-3">
                  <label>Insurance name</label>
                  <input className="form-control form-control-sm"
                    name="insurance_search_name"
                    value={this.state.insurance_search_name}
                    onChange={this.onChange}
                    placeholder="Enter name" />
                </div>
                <div className="form-group  col-3">
                  <label>Phone number</label>
                  <input className="form-control form-control-sm"
                    name="insurance_search_phone"
                    value={this.state.insurance_search_phone}
                    onChange={this.onChange}
                    placeholder="Enter phone number" />
                </div>
              </div>
              <div className="row col-12 mx-auto">
                <button
                  className="btn btn-sm btn-outline-success custom-text-primary ml-4"
                  onClick={this.onsearchInsurance}
                  disabled={this.props.common.isProcessing}><i className="fa fa-search mr-2"></i> Find Insurance</button>
              </div>
            </div>
          </div>
          <div className="card card-body mt-4">
            <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
              <caption className="px-2"><i>Recent insurances | Search results</i></caption>
              <thead className="custom-bg-secondary">
                <tr><th>#</th><th>Name</th><th>Email</th><th>Mobile</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {insurance_filter_list}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  insurance_list: state.hospital.insurance_list,
  common: state.common,
});

export default connect(mapStateToProps, { loadInsurance, searchInsurance, addInsurance, updateInsurance })(Insurance);
