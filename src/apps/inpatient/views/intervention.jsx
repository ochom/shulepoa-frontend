import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteData } from '../../common/actions'
import { addIntervention, deleteIntervention, getInterventions, updateIntervention } from '../actions'

export class Intervention extends Component {
  state = {
    showModal: false,
    selected_intervention: null,
    note: "",
  }

  componentDidMount() {
    this.props.getInterventions()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewIntervention = () => {
    this.setState({
      search_result: [],
      selected_intervention: null,
      note: "",
    }, () => this.toggleModal());
  }

  onEditIntervention = (data) => {
    this.setState({
      search_result: [],
      selected_intervention: data,
      note: data.note,
    }, () => this.toggleModal());
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_intervention,
      note
    } = this.state;

    const data = {
      admission_id: this.props.admission.id,
      note
    }
    if (selected_intervention) {
      this.props.updateIntervention(selected_intervention.id, data);
    } else {
      this.props.addIntervention(data);
    }
    this.toggleModal();
  }

  render() {
    const { interventions, admission, rights } = this.props;

    const intervention_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_intervention ? 'Edit intervention' : 'Add intervention'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="note" required={true}
                  value={this.state.note} onChange={this.onChange} rows="10"></textarea>
                <label>Intervention Notes</label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}> <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <>
        {intervention_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Nursing Intervention</div>
            {rights.can_add_intervention ?
              <button
                className="btn btn-sm "
                onClick={this.onNewIntervention}><i className="fa fa-plus-circle mr-2"></i> Add
              </button> : null}
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered table-responsive-sm">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Intervention</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {interventions.filter(int => int.admission_id === admission.id).map((int, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{int.note}</td>
                    <td>
                      <button className="btn btn-sm mr-2 border-none btn-success"
                        onClick={() => this.onEditIntervention(int)}><i className="fa fa-edit"></i></button>
                      <button className="btn btn-sm border-none btn-danger"
                        onClick={() => deleteData(int.id, this.props.deleteIntervention)}><i className="fa fa-trash"></i></button>
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
export default connect(state => ({
  admission: state.inpatient.admission,
  interventions: state.inpatient.interventions,
  common: state.common,
  rights: state.auth.user.rights
}), { addIntervention, updateIntervention, getInterventions, deleteIntervention })(Intervention)
