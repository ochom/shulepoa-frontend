import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getServiceRequestQueue } from '../../revenue/actions'
import { addLogbook } from '../actions'

export class Sampling extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,

    investigation_list: [],
    specimen: "",
    sampling_comment: "",
  }

  componentDidMount() {
    this.props.getServiceRequestQueue(3);
    this.interval = setInterval(() => this.props.getServiceRequestQueue(3), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onEditInvestigations = (data) => {
    this.setState({
      selected_queue_data: data,
      investigation_list: data.service_requests,
      specimen: "",
      sampling_comment: "",
    });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (_data) => {
    const {
      specimen,
      sampling_comment
    } = this.state;

    const data = {
      service_request_id: _data.id,
      investigation: _data.service_name,
      specimen,
      sampling_comment
    }

    this.props.addLogbook(data);
    this.setState({
      investigation_list: this.state.investigation_list.filter(investigation => investigation.id !== _data.id),
      specimen: "",
      sampling_comment: "",
    });
  }

  render() {
    const { constants: { GENDERS }, service_request_queue } = this.props;
    return (
      <div className="row col-12 mx-auto mt-2">
        <div className={`${this.state.selected_queue_data ? 'col-7' : 'col-12'} mx-auto`}>
          <div className="card">
            <div className="card-header py-1 px-3">Sampling Queue</div>
            <div className="card-body p-0">
              {this.props.common.silent_processing ?
                <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
              }
              <table className="table table-sm table-striped table-bordered">
                <thead className="">
                  <tr>
                    <th>Patient's Name</th>
                    <th># Reg.</th>
                    <th>Sex</th>
                    <th>Mobile</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {service_request_queue.map((queue, index) =>
                    <tr key={index}>
                      <td>{queue.patient.fullname}</td>
                      <td>{queue.patient.id}</td>
                      <td>{GENDERS[queue.patient.sex]}</td>
                      <td>{queue.patient.phone}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary"
                          onClick={() => this.onEditInvestigations(queue)}><i className="fa fa-edit"></i> Sample</button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {this.state.selected_queue_data ?
          <div className="col-5 mx-auto">
            <div className="card">
              <div className="card-header py-1 px-3">Sample details</div>
              <div className="card-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                {this.state.investigation_list.map((investigation, index) =>
                  <form key={index} onSubmit={() => this.onSubmit(investigation)}>
                    <div className="form-row">
                      <div className="form-group col-8">
                        <input className="form-control form-control-sm" readOnly={true}
                          value={this.state.selected_queue_data.patient.fullname} />
                        <label>Patient name</label>
                      </div>
                      <div className="form-group col-4">
                        <input className="form-control form-control-sm" readOnly={true}
                          value={GENDERS[this.state.selected_queue_data.patient.sex]} />
                        <label>Sex</label>
                      </div>

                      <div className="form-group col-8">
                        <input className="form-control form-control-sm" readOnly={true}
                          value={investigation.service_name} />
                        <label>Investigation</label>
                      </div>
                      <div className="form-group col-4">
                        <input className="form-control form-control-sm" name="specimen"
                          value={this.state.specimen} onChange={this.onChange} required={true} />
                        <label>Specimen <sup>*</sup></label>
                      </div>
                      <div className="form-group col-12">
                        <textarea className="form-control form-control-sm" name="sampling_comment"
                          value={this.state.sampling_comment} onChange={this.onChange}></textarea>
                        <label>Sampling Note:</label></div>
                      <div className="form-group col-12">
                        <button type="submit" className="btn btn-success"
                          onSubmit={() => this.onSubmit(investigation)}>Submit</button>
                      </div>
                    </div>
                    <hr className="border-primary" />
                  </form>
                )}
              </div>
            </div>
          </div>
          : null}
      </div>
    )
  }
}

export default connect(state => ({
  laboratory: state.laboratory,
  service_request_queue: state.revenue.service_request_queue,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getServiceRequestQueue, addLogbook, })(Sampling)
