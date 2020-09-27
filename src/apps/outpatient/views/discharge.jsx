import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppointment } from '../actions';

export class Discharge extends Component {
  state = {
    discharge_note: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.setState({ discharge_note: this.props.appointment.discharge_note })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { discharge_note } = this.state;

    const data = {
      is_discharged: true,
      discharge_note,
      discharged_by: this.props.auth.user.id
    }
    this.props.updateAppointment(this.props.appointment.id, data);
  }

  render() {
    const { appointment, rights } = this.props
    return (
      <>
        <div className="card m-0">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Discharge</b></div>
          </div>
          <div className="card-body p-0 mt-0">
            <form onSubmit={this.onSubmit}>
              <div className="form-row col-12 mx-auto my-3">
                <div className="form-group col-12">
                  <textarea type="text" className="form-control" name="discharge_note" required={true} rows="10"
                    onChange={this.onChange} value={this.state.discharge_note}></textarea>
                  <label>Discharge Note/Cause</label>
                </div>
                <div className="form-group col-12">
                  {rights.can_discharge && !appointment.is_discharged ?
                    <button className="btn btn-sm btn-success"
                      onSubmit={this.onSubmit}>Save and Discharge</button> : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}
export default connect(state => ({
  auth: state.auth,
  appointment: state.outpatient.appointment,
  common: state.common,
  rights: state.auth.user.rights
}), { updateAppointment, })(Discharge)
