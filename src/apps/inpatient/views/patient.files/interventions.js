import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getInterventions, addIntervention, updateIntervention, deleteIntervention } from '../../actions'

export class Intervention extends Component {
  state = {
    showModal: false,

    selected_intervention: null,
    note: "",
  }

  componentDidMount = () => {
    this.props.getInterventions(this.props.health_file.id);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewIntervention = () => {
    this.setState({
      selected_intervention: null,
      note: "",
    });
    this.toggleModal();
  }

  onEditIntervention = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      selected_intervention: data,
      note: data.note,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_intervention,
      note,
    } = this.state;

    if (!note) {
      return;
    }

    const data = {
      health_file: this.props.health_file.id,
      note
    }

    if (selected_intervention) {
      this.props.updateIntervention(this.props.health_file.id, selected_intervention.id, data);
    } else {
      this.props.addIntervention(this.props.health_file.id, data);
    }
    this.toggleModal();
  }

  onDelete = (data) => {
    this.props.deleteIntervention(this.props.health_file.id, data.id);
  }

  render() {
    const { interventions } = this.props;
    const intervention_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_intervention ?
            <><i className="fa fa-edit"></i> Edit Intervention</> :
            <><i className="fa fa-plus-circle"></i> Add Intervention</>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-group">
              <label>Nursing Notes:</label>
              <textarea className="form-control form-control-sm" name="note"
                value={this.state.note} onChange={this.onChange} required={true}
                placeholder="Nursing intervention notes..."
                style={{ minHeight: "200px" }}></textarea>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="secondary" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >


    return (
      <>
        {intervention_view}
        <div className="card">
          <div className="card-header cu-bg-secondary py-1 px-3">
            <div
              style={{ float: "left" }} className="py-1 px-2">Nursing Intervention</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm "
              onClick={this.onNewIntervention}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered table-striped m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Date/Time</th>
                  <th>Nursing Intervention/Remarks</th>
                  <th>Nurse</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((intervention, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(intervention.created_at).toLocaleDateString()}</td>
                    <td>{intervention.note}</td>
                    <td>{intervention.created_by_user.username}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditIntervention(intervention)}><i className="fa fa-edit"></i></button>
                      {` | `}
                      <button className="btn btn-sm p-0 border-none text-danger"
                        onClick={() => this.onDelete(intervention)}><i className="fa fa-close"></i></button>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
export default connect(state => ({
  health_file: state.inpatient.selected_health_file,
  interventions: state.inpatient.interventions,
  common: state.common,
}), { getInterventions, addIntervention, updateIntervention, deleteIntervention })(Intervention)
