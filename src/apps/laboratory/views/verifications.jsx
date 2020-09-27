import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLogbooks, updateLogbook } from '../actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export class Verification extends Component {
  state = {
    showModal: false,
    selected_logbook: null,
    verification_comment: "",

  }

  componentDidMount() {
    this.props.getLogbooks();
    window.looper = setInterval(() => this.props.getLogbooks(), 10000);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  componentWillUnmount() {
    clearInterval(window.looper);
  }

  onEditLogbook = (logbook) => {
    this.setState({
      selected_logbook: logbook,
      verification_comment: "",
    });
    this.toggleModal()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_logbook,
      verification_comment
    } = this.state;

    const data = {
      verified_at: new Date(),
      verified_by: this.props.user.id,
      verification_comment,
      is_verified: true,
    }

    this.props.updateLogbook(selected_logbook.id, data);
    this.toggleModal()
  }

  render() {
    const { constants: { GENDERS }, records: { patients }, logbooks } = this.props;
    const { selected_logbook } = this.state
    const verification_modal =
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
                  <input className="form-control form-control-sm" readOnly={true}
                    value={selected_logbook.result} />
                  <label>Result</label>
                </div>
                <div className="form-group col-12">
                  <textarea className="form-control form-control-sm" name="verification_comment"
                    value={this.state.verification_comment} onChange={this.onChange}></textarea>
                  <label>Verification Note:</label>
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
        {verification_modal}
        <div className="col-12 mx-auto">
          <div className="card">
            <div className="card-header py-1 px-3">Analysed Tests</div>
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
                    <th>Result</th>
                    <th>Result Time</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logbooks.filter(logbook => (logbook.is_analysed && !logbook.is_verified)).map((logbook, index) =>
                    <tr key={index}>
                      <td>{patients.length > 0 ? patients.find(p => p.id === logbook.patient_id).fullname : ""}</td>
                      <td>{GENDERS[patients.length > 0 ? patients.find(p => p.id === logbook.patient_id).sex : 0]}</td>
                      <td>{logbook.investigation}</td>
                      <td>{logbook.result}</td>
                      <td>{new Date(logbook.analysed_at).toLocaleString("en-UK")}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-primary"
                          onClick={() => this.onEditLogbook(logbook)}>Verify Results</button></td>
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
  logbooks: state.laboratory.logbooks,
  services: state.hospital.services,
  constants: state.common.CONSTANTS,
  records: state.records,
  common: state.common,
  user: state.auth.user,
}), { getLogbooks, updateLogbook, })(Verification)