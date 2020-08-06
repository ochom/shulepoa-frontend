import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getVerificationQueue, saveVerification } from '../actions'
import { Button } from 'reactstrap'


export class Verification extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,
    verification_comment: "",

  }

  componentDidMount() {
    this.props.getVerificationQueue();
  }

  componentWillUnmount() {
    clearInterval();
  }

  onEditInvestigations = (data) => {
    this.setState({
      selected_queue_data: data,
      investigation_list: data.lab_requests,
    });
  }



  onChange = (e) => this.setState({ [e.target.name]: e.target.value });



  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_queue_data,
      verification_comment
    } = this.state;

    const data = {
      log_id: selected_queue_data.id,
      verification_comment
    }
    this.props.saveVerification(data);
    this.setState({
      selected_queue_data: null,
      verification_comment: "",
    });
  }

  render() {
    const { GENDERS } = this.props.constants;
    const { verification_queue } = this.props.laboratory;
    const queue_list = verification_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient_details.fullname}</td>
        <td>{GENDERS[queue.patient_details.sex]}</td>
        <td>{queue.investigation}</td>
        <td>{new Date(queue.analysed_at).toLocaleString("en-UK")}</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none custom-text-primary"
            onClick={() => this.onEditInvestigations(queue)}><i className="fa fa-edit"></i> Verify</button></td>
      </tr>
    );


    return (
      <div className="col-12 mx-auto mt-3">
        <div className="card card-header bg-white py-1 px-3">
          <div className="py-1 px-2">
            <Link to="/">Home</Link>  &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/laboratory">Laboratory</Link> &nbsp;
            <i className="fa fa-angle-right"></i> &nbsp;
            <Link to="/laboratory/results-verification">Result verification</Link>
          </div>
        </div>
        <div className="row col-12 mx-auto mt-2">
          <div className={`${this.state.selected_queue_data ? 'col-7' : 'col-12'} mx-auto`}>
            <div className="card card-body p-0 pb-2">
              {this.props.common.silent_processing ?
                <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
              }
              <table className="table table-sm table-striped table-bordered">
                <thead className="custom-bg-primary">
                  <tr>
                    <th>Patient's Name</th>
                    <th>Sex</th>
                    <th>Investigation</th>
                    <th>Result Time</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue_list}
                </tbody>
              </table>
            </div>
          </div>
          {this.state.selected_queue_data ?
            <div className="col-5 mx-auto">
              <div className="card">
                <div className="card-header custom-bg-secondary py-1 px-3">
                  <div className="py-1 px-2">Results Verification</div>
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                      <div className="form-group col-9">
                        <label>Patient name</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={this.state.selected_queue_data.patient_details.fullname} />
                      </div>
                      <div className="form-group col-3">
                        <label>Sex</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={GENDERS[this.state.selected_queue_data.patient_details.sex]} />
                      </div>
                      <div className="form-group col-6">
                        <label>Investigation</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={this.state.selected_queue_data.investigation} />
                      </div>
                      <div className="form-group col-6">
                        <label>Result</label>
                        <input className="form-control form-control-sm" readOnly={true}
                          value={this.state.selected_queue_data.result} />
                      </div>
                      <div className="form-group col-12">
                        <label>Verification Note:</label>
                        <textarea className="form-control form-control-sm" name="verification_comment"
                          value={this.state.verification_comment} onChange={this.onChange} ></textarea>
                      </div>
                      <div className="form-group col-12">
                        <Button size="sm" color="primary"
                          onClick={this.onSubmit}>Submit</Button>
                      </div>
                    </div>
                  </form>
                  <hr className="border-primary" />
                </div>
              </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  laboratory: state.laboratory,
  service_list: state.hospital.service_list,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getVerificationQueue, saveVerification, })(Verification)
