import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addGroup, deleteGroup, getGroups, updateGroup } from '../actions';


export class Group extends Component {
  state = {
    showModal: false,
    selected_group: null,
    select: "",
    name: "",

  }

  componentDidMount() {
    this.props.getGroups();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onCheckChange = (key) => {
    var group = this.state.selected_group
    group[key] = !group[key]
    this.setState({ selected_group: group })
    this.props.updateGroup(group.id, group)
  }

  onNewGroup = () => {
    this.setState({
      showModal: !this.state.showModal,
      selected_group: null,
      name: "",
    })
  }

  onEditGroup = (e) => {
    this.setState({ select: e.target.value })
    var id = parseInt(e.target.value) || 0
    let group = this.props.groups.find(g => g.id === id) || null;
    this.setState({
      selected_group: group,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      selected_group,
      name,
    } = this.state;

    if (selected_group) {
      var data = {

      }
      this.props.updateGroup(selected_group.id, data);
    } else {
      this.props.addGroup({ name })
    }

    this.setState({
      showModal: !this.state.showModal,
    })
  }

  render() {
    const { groups } = this.props
    const { selected_group } = this.state

    const group_details =
      <Modal isOpen={this.state.showModal} size="md">
        <ModalHeader toggle={this.toggleModal}>
          {this.state.selected_group ? "Edit Role" : "Add Role"}
        </ModalHeader>
        <form onSubmit={this.onSubmit}>
          <ModalBody>
            <div className="row mx-auto">
              <div className="form-group col-12">
                <input className="form-control form-control-sm"
                  name="name" onChange={this.onChange} value={this.state.name} required={true} />
                <label>Group name<sup>*</sup></label>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-sm btn-success"
              onSubmit={this.onSubmit}>
              <i className="fa fa-check"></i> Save</button>
            <button type="button" className="btn btn-sm btn-secondary"
              onClick={this.toggleModal}>
              <i className="fa fa-close"></i> Cancel</button>
          </ModalFooter>
        </form>
      </Modal>

    return (
      <div className="col-md-8 col-lg-6 mx-auto my-3">
        {group_details}
        <div className="card">
          <div className="card-header">
            <div>Roles</div>
            {this.props.rights.can_add_user_role ?
              <button
                className="btn btn-sm"
                onClick={this.onNewGroup}><i className="fa fa-plus-circle"></i> Add Role
              </button> : null}
          </div>
          <div className="card-body p-0">
            <div className="form-group col-12">
              <select className="form-control" name="select" value={this.state.select}
                onChange={this.onEditGroup}>
                <option value="">--select--</option>
                {groups.map((group, index) => <option value={group.id} key={index}>{group.name}</option>)}
              </select>
            </div>
            {selected_group && this.props.rights.can_edit_user_role ?
              <>
                <h5 className="px-3 cu-text-primary"><b>Adiministration</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view administration</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_administration} onChange={() => this.onCheckChange('can_view_administration')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit hospital</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_hospital} onChange={() => this.onCheckChange('can_edit_hospital')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add clinic</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_clinic} onChange={() => this.onCheckChange('can_add_clinic')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit clinic</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_clinic} onChange={() => this.onCheckChange('can_edit_clinic')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add ward</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_ward} onChange={() => this.onCheckChange('can_add_ward')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit ward</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_ward} onChange={() => this.onCheckChange('can_edit_ward')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add service</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_service} onChange={() => this.onCheckChange('can_add_service')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit service</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_service} onChange={() => this.onCheckChange('can_edit_service')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit insurance</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_insurance} onChange={() => this.onCheckChange('can_edit_insurance')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add insurance</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_insurance} onChange={() => this.onCheckChange('can_add_insurance')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add user</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_user} onChange={() => this.onCheckChange('can_add_user')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit user</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_user} onChange={() => this.onCheckChange('can_edit_user')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add user role</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_user_role} onChange={() => this.onCheckChange('can_add_user_role')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit user role</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_user_role} onChange={() => this.onCheckChange('can_edit_user_role')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Inventory</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view inventory</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_inventory} onChange={() => this.onCheckChange('can_view_inventory')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add store</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_store} onChange={() => this.onCheckChange('can_add_store')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit store</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_store} onChange={() => this.onCheckChange('can_edit_store')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add product</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_product} onChange={() => this.onCheckChange('can_add_product')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit product</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_product} onChange={() => this.onCheckChange('can_edit_product')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add requisition</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_requisition} onChange={() => this.onCheckChange('can_add_requisition')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit requisition</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_requisition} onChange={() => this.onCheckChange('can_edit_requisition')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add dispatch</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_dispatch} onChange={() => this.onCheckChange('can_add_dispatch')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit dispatch</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_dispatch} onChange={() => this.onCheckChange('can_edit_dispatch')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add supplier</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_supplier} onChange={() => this.onCheckChange('can_add_supplier')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit supplier</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_supplier} onChange={() => this.onCheckChange('can_edit_supplier')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add order</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_order} onChange={() => this.onCheckChange('can_add_order')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit order</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_order} onChange={() => this.onCheckChange('can_edit_order')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Billing</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view billing</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_billing} onChange={() => this.onCheckChange('can_view_billing')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add invoice</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_invoice} onChange={() => this.onCheckChange('can_add_invoice')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit invoice</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_invoice} onChange={() => this.onCheckChange('can_edit_invoice')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add deposit</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_deposit} onChange={() => this.onCheckChange('can_add_deposit')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit deposit</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_deposit} onChange={() => this.onCheckChange('can_edit_deposit')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Pharmacy</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view pharmacy</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_pharmacy} onChange={() => this.onCheckChange('can_view_pharmacy')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can dispense drug</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_dispense_drug} onChange={() => this.onCheckChange('can_dispense_drug')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add drug</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_drug} onChange={() => this.onCheckChange('can_add_drug')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit drug</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_drug} onChange={() => this.onCheckChange('can_edit_drug')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Laboratory</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view laboratory</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_laboratory} onChange={() => this.onCheckChange('can_view_laboratory')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can take sample</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_take_sample} onChange={() => this.onCheckChange('can_take_sample')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add result</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_result} onChange={() => this.onCheckChange('can_add_result')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can verify result</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_verify_result} onChange={() => this.onCheckChange('can_verify_result')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Radiology</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view radiology</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_radiology} onChange={() => this.onCheckChange('can_view_radiology')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can start test</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_start_test} onChange={() => this.onCheckChange('can_start_test')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add test result</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_test_result} onChange={() => this.onCheckChange('can_add_test_result')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can verify test result</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_verify_test_result} onChange={() => this.onCheckChange('can_verify_test_result')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Inpatient &amp; Outpatient</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view clinics</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_ipd_opd} onChange={() => this.onCheckChange('can_view_ipd_opd')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add vitals</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_vitals} onChange={() => this.onCheckChange('can_add_vitals')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add observation</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_observation} onChange={() => this.onCheckChange('can_add_observation')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add investigation</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_investigation} onChange={() => this.onCheckChange('can_add_investigation')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add diagnosis</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_diagnosis} onChange={() => this.onCheckChange('can_add_diagnosis')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add prescription</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_prescription} onChange={() => this.onCheckChange('can_add_prescription')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can discharge</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_discharge} onChange={() => this.onCheckChange('can_discharge')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add review</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_review} onChange={() => this.onCheckChange('can_add_review')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add intervention</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_intervention} onChange={() => this.onCheckChange('can_add_intervention')} /><span className="slider round"></span> </div></span></div>
                </div>
                <h5 className="px-3 cu-text-primary"><b>Records</b></h5>
                <div className="list-group">
                  <div className="list-group-item"> <span> Can view records</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_view_records} onChange={() => this.onCheckChange('can_view_records')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add patient</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_patient} onChange={() => this.onCheckChange('can_add_patient')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can edit patient</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_edit_patient} onChange={() => this.onCheckChange('can_edit_patient')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add appointment</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_appointment} onChange={() => this.onCheckChange('can_add_appointment')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add admission</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_admission} onChange={() => this.onCheckChange('can_add_admission')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add scheme</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_scheme} onChange={() => this.onCheckChange('can_add_scheme')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can delete scheme</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_delete_scheme} onChange={() => this.onCheckChange('can_delete_scheme')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can add service request</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_add_service_request} onChange={() => this.onCheckChange('can_add_service_request')} /><span className="slider round"></span> </div></span></div>
                  <div className="list-group-item"> <span> Can delete service request</span> <span><div className="switch"><input type="checkbox" checked={selected_group.can_delete_service_request} onChange={() => this.onCheckChange('can_delete_service_request')} /><span className="slider round"></span> </div></span></div>
                </div>
              </> :
              null}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.hospital.groups,
  common: state.common,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getGroups, addGroup, updateGroup, deleteGroup })(Group);
