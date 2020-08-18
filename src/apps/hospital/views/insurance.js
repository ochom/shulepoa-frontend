import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getInsurances, addInsurance, updateInsurance } from '../actions';

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

  onSubmitInsurance = (e) => {
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
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitInsurance}>
              <i className="fa fa-check"></i> Save</button>{' '}
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <>
        {insurance_details}
        <div className="col-md-10 mx-auto mt-3">
          <div className="card">
            <div className="card-header py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-briefcase"></i> Manage Insurance companies</div>
              <input className="form-control form-control-sm"
                onChange={this.onSearch}
                placeholder="Search..." />
              <button
                className="btn btn-sm py-1 px-2 mr-auto"
                onClick={this.onNewInsurance}><i className="fa fa-plus-circle mr-2"></i> Add Insurance
              </button>
            </div>
          </div>
          <div className="card card-body mt-4 p-0">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-bg-secondary">
                <tr><th>#</th><th>Company</th><th>Email</th><th>Mobile</th><th className="text-center">Action</th></tr>
              </thead>
              <tbody>
                {insurances.map((insurance, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{insurance.company_name}</td>
                    <td>{insurance.company_email}</td>
                    <td>{insurance.company_phone}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditInsurance(insurance)}><i className="fa fa-edit"></i> Edit</button>
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

const mapStateToProps = state => ({
  hospital: state.hospital,
});

export default connect(mapStateToProps, { getInsurances, addInsurance, updateInsurance })(Insurance);
