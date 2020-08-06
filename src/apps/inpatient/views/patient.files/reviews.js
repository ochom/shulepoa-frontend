import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getReviews, addReview, updateReview, deleteReview } from '../../actions'

export class Review extends Component {
  state = {
    showModal: false,

    selected_review: null,
    note: "",
  }

  componentDidMount = () => {
    this.props.getReviews(this.props.health_file.id);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewReview = () => {
    this.setState({
      selected_review: null,
      condition: "",
      note: "",
    });
    this.toggleModal();
  }

  onEditReview = (data) => {
    this.setState({
      showModal: !this.state.showModal,
      selected_review: data,
      condition: data.condition,
      note: data.note,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_review,
      condition,
      note,
    } = this.state;

    if (!note) {
      return;
    }

    const data = {
      health_file: this.props.health_file.id,
      condition,
      note
    }

    if (selected_review) {
      this.props.updateReview(this.props.health_file.id, selected_review.id, data);
    } else {
      this.props.addReview(this.props.health_file.id, data);
    }
    this.toggleModal();
  }

  onDelete = (data) => {
    this.props.deleteReview(this.props.health_file.id, data.id);
  }

  render() {
    const { reviews } = this.props;
    const review_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_review ?
            <><i className="fa fa-edit"></i> Edit Review</> :
            <><i className="fa fa-plus-circle"></i> Add Review</>
          }
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-group">
              <label>Patient condition/feeling:</label>
              <textarea className="form-control form-control-sm" name="condition"
                value={this.state.condition} onChange={this.onChange} required={true}
                placeholder="Describe how the patient is feeling during this review..."
                style={{ minHeight: "150px" }}></textarea>
            </div>
            <div className="form-group">
              <label>Doctor Notes:</label>
              <textarea className="form-control form-control-sm" name="note"
                value={this.state.note} onChange={this.onChange} required={true}
                placeholder="Doctor review notes..."
                style={{ minHeight: "150px" }}></textarea>
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
        {review_view}
        <div className="card">
          <div className="card-header custom-bg-secondary py-1 px-3">
            <div
              style={{ float: "left" }} className="py-1 px-2">Doctor Review</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm bg-light text-dark py-0 px-2 mr-auto mt-1"
              onClick={this.onNewReview}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered table-striped m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Condition</th>
                  <th>Review notes</th>
                  <th>Doctor</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(review.created_at).toLocaleDateString()}</td>
                    <td>{review.condition}</td>
                    <td>{review.note}</td>
                    <td>{review.created_by_user.username}</td>
                    <td className="text-center">
                      <button className="btn btn-sm p-0 border-none text-success"
                        onClick={() => this.onEditReview(review)}><i className="fa fa-edit"></i></button>
                      {` | `}
                      <button className="btn btn-sm p-0 border-none text-danger"
                        onClick={() => this.onDelete(review)}><i className="fa fa-close"></i></button>
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
  reviews: state.inpatient.reviews,
  common: state.common,
}), { getReviews, addReview, updateReview, deleteReview })(Review)
