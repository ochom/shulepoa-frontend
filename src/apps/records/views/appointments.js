import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getPatient } from '../actions'
import { addAppointment, getAppointments } from '../../outpatient/actions';

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

export class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient_id: props.patient_id,
      clinic_id: "",
      date: date,
    };
  }

  componentDidMount() {
    this.props.getAppointments()
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewAppointment = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      clinic_id: "",
    });
  }

  onSubmitAppointment = (e) => {
    e.preventDefault();
    const {
      patient_id,
      clinic_id,
      date,
    } = this.state;

    const file_data = {
      patient_id,
      clinic_id,
      date,
    }

    this.props.addAppointment(file_data)
    this.toggleModal()
  }

  render() {
    const { outpatient: { appointments }, clinics } = this.props
    const book_appointment_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>Create appointment</ModalHeader>
        <form onSubmit={this.onSubmitAppointment}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <label>Clinic to visit</label>
                <select className="form-control form-control-sm"
                  name="clinic_id" onChange={this.onChange} value={this.state.clinic_id} required={true}>
                  <option value="">Select</option>
                  {clinics.map((clinic, index) => <option key={index} value={clinic.id}>{clinic.name}</option>)}
                </select>
              </div>
              <div className="form-group col-12">
                <label>Appointment Date<sup>*</sup></label>
                <input type="date" className="form-control form-control-sm"
                  name="date" onChange={this.onChange} value={this.state.date} required={true}
                  placeholder="Service name" />
              </div>
            </div>
          </ModalBody >
          <ModalFooter>
            <button type="submit" className="btn btn-sm cu-bg-primary"
              onSubmit={this.onSubmitAppointment}>
              <i className="fa fa-check"></i> Submit</button>
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
            <div className="py-1 px-2">Appointments</div>
            <button
              className="btn btn-sm"
              onClick={this.onNewAppointment}><i className="fa fa-plus-circle mr-2"></i> Add appointment
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-responsive-sm">
              <thead className="">
                <tr>
                  <td>#</td>
                  <td>Created</td>
                  <td>Clinic</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(app => app.patient_id === parseInt(this.state.patient_id)).map((app, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(app.created).toLocaleDateString("en-UK")}</td>
                    <td>{clinics.length > 0 ? clinics.find(cln => cln.id === app.clinic_id).name : ""}</td>
                    <td className="text-center text-success">
                      {(app.is_checked_in && !app.is_checked_out) ? "Checked In" :
                        (app.is_checked_out) ? "Checkout Out" : "In Line"
                      }
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
  outpatient: state.outpatient,
  clinics: state.hospital.clinics
});

export default connect(mapStateToProps,
  { getPatient, addAppointment, getAppointments }
)(Appointments);
