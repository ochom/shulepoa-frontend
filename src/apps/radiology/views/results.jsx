import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLogbooks, updateLogbook } from '../actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export class Results extends Component {
  state = {
    showModal: false,
    selected_logbook: null,
    result: "",
    analysis_comment: "",

  }

  componentDidMount() {
    this.props.getLogbooks();
    window.looper1 = setInterval(() => this.props.getLogbooks(), 10000);

    window.looper = setInterval(() => {
      this.props.logbooks.filter(logbook => !logbook.is_analysed).map(logbook => {
        var startDate = new Date(logbook.created);
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

        var td = document.getElementById("td-" + logbook.id);
        td.innerText = timeElapse;
        return null;
      });
    }, 1000);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  componentWillUnmount() {
    clearInterval(window.looper);
    clearInterval(window.looper1)
  }

  onEditLogbook = (logbook) => {
    this.setState({
      selected_logbook: logbook,
      result: "",
      analysis_comment: "",
    });
    this.toggleModal()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_logbook,
      result,
      analysis_comment
    } = this.state;

    const data = {
      result,
      is_analysed: true,
      analysis_comment,
      analysed_at: new Date(),
      analysed_by: this.props.user.id
    }

    this.props.updateLogbook(selected_logbook.id, data);
    this.toggleModal()
  }

  render() {
    const { constants: { GENDERS }, records: { patients }, logbooks } = this.props;
    const { selected_logbook } = this.state
    const result_modal =
      <Modal isOpen={this.state.showModal}>
        <ModalHeader toggle={this.toggleModal}></ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            {selected_logbook ?
              <div className="form-row">
                <div className="form-group col-9">
                  <input className="form-control form-control-sm" readOnly={true}
                    value={patients.length > 0 ? patients.find(p => p.id === selected_logbook.patient_id).fullname : ""} />
                  <label>Patient name</label>
                </div>
                <div className="form-group col-3">
                  <input className="form-control form-control-sm" readOnly={true}
                    value={GENDERS[patients.length > 0 ? patients.find(p => p.id === selected_logbook.patient_id).sex : 0]} />
                  <label>Sex</label>
                </div>

                <div className="form-group col-12">
                  <input className="form-control form-control-sm" readOnly={true}
                    value={selected_logbook.investigation} />
                  <label>Investigation</label>
                </div>
                <div className="form-group col-12">
                  <textarea className="form-control form-control-sm" name="result" required={true}
                    value={this.state.result} onChange={this.onChange} ></textarea>
                  <label>Result <sup>*</sup></label>
                </div>
                <div className="form-group col-12">
                  <textarea className="form-control form-control-sm" name="analysis_comment"
                    value={this.state.analysis_comment} onChange={this.onChange} ></textarea>
                  <label>Results Note:</label>
                </div>
              </div>
              : null
            }
          </ModalBody>
          <ModalFooter>
            <Button type="submit" size="md" color="success"
              onSubmit={this.onSubmit}>Submit</Button>
          </ModalFooter>
        </form>
      </Modal>
    return (
      <div className="row col-12 mx-auto mt-2">
        {result_modal}
        <div className="col-12 mx-auto">
          <div className="card">
            <div className="card-header py-1 px-3">Running Tests</div>
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
                  {logbooks.filter(logbook => !logbook.is_analysed).map((logbook, index) =>
                    <tr key={index}>
                      <td>{patients.length > 0 ? patients.find(p => p.id === logbook.patient_id).fullname : ""}</td>
                      <td>{GENDERS[patients.length > 0 ? patients.find(p => p.id === logbook.patient_id).sex : 0]}</td>
                      <td>{logbook.investigation}</td>
                      <td id={`td-${logbook.id}`}>---</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary"
                          onClick={() => this.onEditLogbook(logbook)}><i className="fa fa-edit"></i>Enter Results</button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  logbooks: state.radiology.logbooks,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  records: state.records,
  common: state.common,
  user: state.auth.user,
}), { getLogbooks, updateLogbook, })(Results)
