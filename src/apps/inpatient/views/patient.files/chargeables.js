import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getChargeables, addChargeable, deleteChargeable } from '../../actions'

export class Chargeable extends Component {
  state = {
    showModal: false,
    search_list: [],
    selected_item: null,
    quantity: "",
  }

  componentDidMount = () => {
    this.props.getChargeables(this.props.health_file.id);
  }

  onSearch = (e) => {
    const search_name = e.target.value;
    const result = this.props.services.filter(service =>
      (service.name.toLowerCase().includes(search_name.toLowerCase()))
    ).slice(0, 15);
    this.setState({ search_list: result });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onNewChargeable = (data) => {
    this.setState({
      selected_item: null,
      dosage: "",
      frequency: "",
      days: "",
      quantity: "",
    });
    this.toggleModal();
  }

  onSelectItem = (data) => {
    this.setState({
      selected_item: data,
    });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_item,
      quantity, } = this.state;

    const data = {
      service: selected_item.id,
      quantity
    }
    this.props.addChargeable(this.props.health_file.id, data);
    this.toggleModal();
  }

  onDeletePresciption = (chargeable) => {
    this.props.deleteChargeable(this.props.health_file.id, chargeable.id);
  }

  render() {
    const { selected_item } = this.state;
    const { chargeables } = this.props;
    const chargeable_view =
      <Modal isOpen={this.state.showModal} size="lg">
        <ModalHeader toggle={this.toggleModal}><i className="fa fa-plus-circle"></i> Add chargeable
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row col-12">
              <div className="col-5">
                <div className="form-group col-12">
                  <input className="form-control form-control-sm"
                    onChange={this.onSearch} placeholder="Search..." />
                </div>
                <div className="col-12">
                  <table className="table table-sm table-bordered table-striped">
                    <caption><i>Search result</i></caption>
                    <tbody>
                      {this.state.search_list.map((service, index) =>
                        <tr key={index} style={{ cursor: "pointer" }} onClick={() => this.onSelectItem(service)}>
                          <td>{service.name}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {selected_item ?
                <div className="row col-7">
                  <div>
                    <div className="form-group  col-12">
                      <label>Item name</label>
                      <input className="form-control form-control-sm" readOnly={true}
                        value={selected_item.name} />
                    </div>
                    <div className="form-group col-12">
                      <label>In store</label>
                      <input className="form-control form-control-sm" readOnly={true}
                        value={selected_item.quantity_in_store} />
                    </div>
                    <div className="form-group col-12">
                      <label>Chargeable Quantity</label>
                      <input className="form-control form-control-sm" name="quantity" required={true}
                        value={this.state.quantity} onChange={this.onChange} />
                    </div>
                  </div>
                </div>
                : null}
            </div>
          </ModalBody >
          <ModalFooter>
            <Button type="submit" color="primary" size="sm"
              onClick={this.onSubmit}><i className="fa fa-check"></i> Submit</Button>
            <Button color="danger" size="sm" onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</Button>
          </ModalFooter>
        </form>
      </Modal >


    return (
      <>
        {chargeable_view}
        <div className="card">
          <div className="card-header cu-bg-secondary py-1 px-3">
            <div
              style={{ fontSize: "1vw", float: "left" }} className="py-1 px-2">Chargeables Items</div>
            <button
              style={{ float: "right" }}
              className="btn btn-sm "
              onClick={this.onNewChargeable}><i className="fa fa-plus-circle mr-2"></i> Add
              </button>
          </div>
          <div className="card-body p-0 mt-0">
            <table className="table table-sm table-bordered m-0">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {chargeables.map((chargeable, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{chargeable.service_details.name}</td>
                    <td>{chargeable.quantity}</td>
                    <td className="text-center">
                      {chargeable.is_served ? "Served" :
                        <button className="btn btn-sm p-0 border-none text-danger"
                          onClick={() => this.onDeletePresciption(chargeable)}>
                          <i className="fa fa-close"></i> delete</button>}</td>
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
  chargeables: state.inpatient.chargeables,
  common: state.common,
  services: state.hospital.services,
}), { getChargeables, addChargeable, deleteChargeable })(Chargeable)
