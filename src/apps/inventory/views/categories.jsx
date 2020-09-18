import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addCategory, deleteCategory, getCategories, updateCategory } from '../actions'

export class Categories extends Component {
  state = {
    showModal: false,
    selected_cat: null,
    name: "",
    desc: "",
  }

  componentDidMount() {
    this.props.getCategories();
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onNewCategory = (data) => {
    this.setState({
      selected_cat: null,
      name: "",
      desc: "",
    })
    this.toggleModal();
  }

  onEditCategory = (data) => {
    this.setState({
      selected_cat: data,
      name: data.name,
      desc: data.desc,
    })
    this.toggleModal();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_cat,
      name, desc
    } = this.state
    const data = {
      name, desc
    }
    if (selected_cat) {
      this.props.updateCategory(selected_cat.id, data)
    } else {
      this.props.addCategory(data)
    }
    this.toggleModal();
  }


  render() {
    const { categories } = this.props.inventory;
    const cat_modal_view =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_cat ? 'Edit Category Details' : 'Add new category'}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="form-group">
              <input className="form-control form-control-sm" name="name" required={true}
                onChange={this.onChange} value={this.state.name} />
              <label>Name</label>
            </div>
            <div className="form-group">
              <textarea className="form-control form-control-sm" name="desc" required={true}
                onChange={this.onChange} value={this.state.desc} ></textarea>
              <label>Description</label>
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onSubmit={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >

    return (
      <div className="col-5 mt-3">
        {cat_modal_view}
        <div className="card">
          <div className="card-header py-1 px-3">
            <div className="py-1 px-2">Item Categories</div>
            <button
              className="btn btn-sm "
              onClick={this.onNewCategory}><i className="fa fa-plus-circle mr-2"></i> Add Category
              </button>
          </div>
          <div className="card-body p-0 pb-2">
            <table className="table table-sm table-striped table-bordered">
              <thead className="cu-text-primary">
                <tr>
                  <th>#</th>
                  <th>Name.</th>
                  <th>Label</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.desc}</td>
                    <td>
                      <button className="btn btn-sm btn-success"
                        onClick={() => this.onEditCategory(cat)}><i className="fa fa-edit"></i> Edit</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  inventory: state.inventory,
}), { getCategories, addCategory, updateCategory, deleteCategory })(Categories)
