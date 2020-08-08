import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSamplingQueue, saveSample } from '../actions'
import { Button } from 'reactstrap'

export class Sampling extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,

    investigation_list: [],
    specimen: "",
    sampling_comment: "",

  }

  componentDidMount() {
    this.props.getSamplingQueue();
    setInterval(() => this.props.getSamplingQueue(), 300000);
  }

  onEditInvestigations = (data) => {
    this.setState({
      selected_queue_data: data,
      investigation_list: data.lab_requests,
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
      service_request: _data.id,
      specimen,
      sampling_comment
    }
    this.props.saveSample(data);
    this.setState({
      investigation_list: this.state.investigation_list.filter(investigation => investigation.id !== _data.id),
      specimen: "",
      sampling_comment: "",
    });
    this.props.getSamplingQueue();
  }

  render() {
    const { GENDERS } = this.props.constants;
    const { sampling_queue } = this.props.laboratory;
    const queue_list = sampling_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient_details.fullname}</td>
        <td>{queue.patient_details.id}</td>
        <td>{GENDERS[queue.patient_details.sex]}</td>
        <td>{queue.patient_details.phone}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none custom-text-primary"
            onClick={() => this.onEditInvestigations(queue)}><i className="fa fa-edit"></i> Sample</button></td>
      </tr>
    );


    return (
      <div className="row col-12 mt-2">
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
                  {queue_list}
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
                  <div key={index} >
                    <div className="form-row">
                      <div className="form-group col-8">
                        <label>Patient name</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={this.state.selected_queue_data.patient_details.fullname} />
                      </div>
                      <div className="form-group col-4">
                        <label>Sex</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={GENDERS[this.state.selected_queue_data.patient_details.sex]} />
                      </div>

                      <div className="form-group col-8">
                        <label>Investigation</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={this.props.service_list.filter(service => service.id === investigation.service)[0].name} />
                      </div>
                      <div className="form-group col-4">
                        <label>Specimen <sup>*</sup></label>
                        <input className="form-control form-control-sm" name="specimen"
                          value={this.state.specimen} onChange={this.onChange} />
                      </div>
                      <div className="form-group col-12">
                        <label>Sampling Note:</label>
                        <textarea className="form-control form-control-sm" name="sampling_comment"
                          value={this.state.sampling_comment} onChange={this.onChange} ></textarea>
                      </div>
                      <div className="form-group col-12">
                        <Button size="sm" color="primary"
                          onClick={() => this.onSubmit(investigation)}>Submit</Button>
                      </div>
                    </div>
                    <hr className="border-primary" />
                  </div>
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
  service_list: state.hospital.service_list,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getSamplingQueue, saveSample, })(Sampling)
