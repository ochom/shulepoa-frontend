import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addInsurance, getInsurances, updateInsurance } from '../actions';

export class Insurance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      select_insurance: null,
      insurances: props.hospital.insurances,

      company_name: "",
      company_email: "",
      company_phone: "",
    }
  }

  componentDidMount() {
    this.props.getInsurances();
  }


  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ insurances: nextProps.hospital.insurances })
    }
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
    })
  }

  onEditInsurance = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      select_insurance: data,
      company_name: data.company_name,
      company_email: data.company_email,
      company_phone: data.company_phone,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      select_insurance,
      company_name,
      company_email,
      company_phone,
    } = this.state;

    const data = {
      company_name,
      company_email,
      company_phone,
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

  onSearch = (e) => {
    const search = (e.target.value).toLowerCase()
    this.setState({
      insurances: this.props.hospital.insurances.filter(ser => ser.company_name.toLowerCase().includes(search))
    })
  }

  render() {
    const { insurances } = this.state
    const insurance_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.select_insurance ?
            <span><i className="fa fa-edit"></i> Edit Insurance Details</span> :
            <span><i className="fa fa-plus-circle"></i> Register Insurance</span>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="company_name" onChange={this.onChange} value={this.state.company_name} required={true}
                />
                <label>Company name<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input type="email" className="form-control form-control-sm"
                  name="company_email" onChange={this.onChange} value={this.state.company_email} required={true}
                />
                <label>Email Address<sup>*</sup></label>
              </div>
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="company_phone" onChange={this.onChange} value={this.state.company_phone} required={true}
                />
                <label>Phone Nunber<sup>*</sup></label>
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
        {insurance_details}
        <div className="form-group my-2">
          <input className="form-control" defaultValue=""
            onChange={this.onSearch} />
          <label><span role="img" aria-label="search">&#x1F50D;</span> Search...</label>
        </div>
        <div className="card">
          <div className="card-header">
            <div className=""> Insurance companies</div>
            <button
              className="btn btn-sm py-1 px-2 mr-auto"
              onClick={this.onNewInsurance}><i className="fa fa-plus-circle mr-2"></i> Add Insurance
              </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Company</td>
                  <td>Email</td>
                  <td>Mobile</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {insurances.map((insurance, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{insurance.company_name}</td>
                    <td>{insurance.company_email}</td>
                    <td>{insurance.company_phone}</td>
                    <td>
                      <button className="btn btn-sm btn-success"
                        onClick={() => this.onEditInsurance(insurance)}><i className="fa fa-edit"></i> Edit</button>
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
});

export default connect(mapStateToProps, { getInsurances, addInsurance, updateInsurance })(Insurance);
