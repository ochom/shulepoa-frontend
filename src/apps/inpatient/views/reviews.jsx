import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { deleteData } from '../../common/actions'
import { addReview, deleteReview, getReviews, updateReview } from '../actions'

export class Review extends Component {
  state = {
    showModal: false,
    selected_review: null,
    condition: "",
    note: "",
  }

  componentDidMount() {
    this.props.getReviews()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewReview = () => {
    this.setState({
      search_result: [],
      selected_review: null,
      condition: "",
      note: "",
    }, () => this.toggleModal());
  }

  onEditReview = (data) => {
    this.setState({
      search_result: [],
      selected_review: data,
      condition: data.condition,
      note: data.note
    }, () => this.toggleModal());
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_review,
      condition,
      note
    } = this.state;

    const data = {
      admission_id: this.props.admission.id,
      condition,
      note
    }
    if (selected_review) {
      this.props.updateReview(selected_review.id, data);
    } else {
      this.props.addReview(data);
    }
    this.toggleModal();
  }

  render() {
    const { reviews, admission, rights } = this.props;
    const review_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_review ? 'Edit review' : 'Add review'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="condition" required={true}
                  value={this.state.condition} onChange={this.onChange} ></textarea>
                <label>Patient condition</label>
              </div>
              <div className="form-group col-12">
                <textarea className="form-control form-control-sm" name="note" required={true}
                  value={this.state.note} onChange={this.onChange} rows="7"></textarea>
                <label>Review Notes</label>
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
        {review_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2"><b>Doctor review</b></div>
            {rights.can_add_review ?
              <button
                className="btn btn-sm "
                onClick={this.onNewReview}><i className="fa fa-plus-circle mr-2"></i> Add
              </button> : null}
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered table-responsive-sm">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Patient condition</th>
                  <th>Review Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.filter(review => review.admission_id === admission.id).map((review, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{review.condition}</td>
                    <td>{review.note}</td>
                    <td>
                      {rights.can_add_review ?
                        <>
                          <button className="btn btn-sm mr-2 border-none btn-success"
                            onClick={() => this.onEditReview(review)}><i className="fa fa-edit"></i></button>
                          <button className="btn btn-sm border-none btn-danger"
                            onClick={() => deleteData(review.id, this.props.deleteReview)}><i className="fa fa-trash"></i></button>
                        </> : null}
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
  reviews: state.inpatient.reviews,
  common: state.common,
  rights: state.auth.user.rights
}), { addReview, updateReview, getReviews, deleteReview })(Review)
