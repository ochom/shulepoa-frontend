import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { getResultsQueue, saveResults } from '../actions'


export class Results extends Component {
  state = {
    showModal: false,
    selected_queue_data: null,
    result: "",
  }

  componentDidMount() {
    this.props.getResultsQueue();
    setInterval(() => this.props.getResultsQueue(), 300000);
    window.loooper = setInterval(() => {
      this.props.radiology.results_queue.map(result => {
        var startDate = new Date(result.sampled_at);
        var currentDate = new Date();
        var diff = currentDate - startDate;
        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var m = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
        var s = Math.floor(diff % (1000 * 60) / (1000));

        h = (h < 10) ? '0' + h : h;
        m = (m < 10) ? '0' + m : m;
        s = (s < 10) ? '0' + s : s;
        var timeElapse = d + ':' + h + ':' + m + ':' + s;

        var td = document.getElementById("td-" + result.id);
        td.innerText = timeElapse;
        return null;
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(window.loooper);
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
      result,
    } = this.state;

    const data = {
      log_id: selected_queue_data.id,
      result,
    }
    this.props.saveResults(data);
    this.setState({
      selected_queue_data: null,
      result: "",
    });
  }

  render() {
    const { GENDERS } = this.props.constants;
    const { results_queue } = this.props.radiology;
    const queue_list = results_queue.map((queue, index) =>
      <tr key={index}>
        <td>{queue.patient_details.fullname}</td>
        <td>{GENDERS[queue.patient_details.sex]}</td>
        <td>{queue.investigation}</td>
        <td id={`td-${queue.id}`}>---</td>
        <td className="text-center">
          <button className="btn btn-sm p-0 border-none cu-text-primary"
            onClick={() => this.onEditInvestigations(queue)}><i className="fa fa-edit"></i> Results</button></td>
      </tr>
    );


    return (
      <div className="row col-lg-10 mx-auto mt-3">
        <div className={`${this.state.selected_queue_data ? 'col-7' : 'col-12'} mx-auto`}>
          <div className="card">
            <div className="card">
              <div className="card-header py-1 px-3">Pending results</div>
              <div className="card-body p-0">
                {this.props.common.silent_processing ?
                  <span className="text-success"><i className="fa fa-refresh fa-spin"></i></span> : null
                }
                <table className="table table-sm table-striped table-bordered">
                  <thead className="">
                    <tr>
                      <th>Patient's Name</th>
                      <th>Sex</th>
                      <th>Investigation</th>
                      <th>T.T</th>
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
        </div>
        {this.state.selected_queue_data ?
          <div className="col-5 mx-auto">
            <div className="card">
              <div className="card-header cu-bg-secondary py-1 px-3">
                <div className="py-1 px-2">Result Entry</div>
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

                    <div className="form-group col-12">
                      <label>Investigation</label>
                      <input className="form-control form-control-sm" readOnly={true}
                        value={this.state.selected_queue_data.investigation} />
                    </div>
                    <div className="form-group col-12">
                      <label>Result <sup>*</sup></label>
                      <textarea className="form-control form-control-sm" name="result" required={true}
                        value={this.state.result} onChange={this.onChange} ></textarea>
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
    )
  }
}

export default connect(state => ({
  radiology: state.radiology,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  common: state.common,
}), { getResultsQueue, saveResults, })(Results)
