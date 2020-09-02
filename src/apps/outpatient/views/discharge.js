import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppointment } from '../actions'

export class Discharge extends Component {
  state = {
    discharge_note: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    this.setState({ discharge_note: this.props.health_file.discharge_note })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { discharge_note } = this.state;

    const data = {
      discharge_note
    }
    this.props.updateAppointment(this.props.health_file.id, data);
  }

  render() {
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
                  <label>Discharge Note/Cause</label>
                  <textarea type="text" className="form-control" name="discharge_note" required={true}
                    onChange={this.onChange} value={this.state.discharge_note} placeholder="Discharge statement..."></textarea>
                </div>
                <div className="form-group col-12">
                  <button className="btn cu-bg-primary btn-sm" onSubmit={this.onSubmit}><i className="fa fa-check"></i> Save</button>
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
  health_file: state.outpatient.selected_health_file,
  discharge_note: state.outpatient.discharge_note,
  common: state.common,
}), { updateAppointment, })(Discharge)
