import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addReorder } from '../actions';


export class Reorders extends Component {
  render() {
    const { services } = this.props.hospital;
    const { reorder_history } = this.props.pharmacy;

    const service_filter_list = services.filter(
      service => (service.department === 5 && service.quantity_in_store <= service.reorder_level))
      .map((service, index) =>
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{service.name}</td>
          <td className="text-danger">{service.quantity_in_store}</td>
          <td className="text-success">{service.reorder_level}</td>
          <td className="text-center">
            <Link className="btn btn-sm p-0 border-none text-primary"
              to={`/pharmacy/drugs-reorders/${service.id}/edit`}><i className="fa fa-edit"></i> Adjust Stock</Link>
          </td>
        </tr>
      )

    const reorder_history_list = reorder_history
      .slice(0, 50)
      .map((reorder, index) =>
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{new Date(reorder.created_at).toLocaleDateString("en-UK")}</td>
          <td>{services.filter(service => service.id === reorder.service)[0].name}</td>
          <td>{reorder.created_by_user.username}</td>
          <td className="text-center">
            <Link className="btn btn-sm p-0 border-none text-primary"
              to={`/pharmacy/drugs-reorders/${reorder.id}/history`}><i className="fa fa-book"></i> More</Link>
          </td>
        </tr>
      )
    return (
      <div className="row col-12 mx-auto  mt-3">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-header cu-bg-secondary py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-edit"></i> Stock Deficit</div>
            </div>
            <div className="card-body p-0 pb-2">
              <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
                <caption className="px-2"><i>Drug reorder list</i></caption>
                <thead className="">
                  <tr><th>#</th><th>Drug</th><th>Quantity in store</th><th>Reorder Level</th><th className="text-center">Action</th></tr>
                </thead>
                <tbody>
                  {service_filter_list}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-header cu-bg-secondary py-1 px-3">
              <div className="py-1 px-2"><i className="fa fa-globe"></i> Stock history</div>
            </div>
            <div className="card-body p-0 pb-2">
              <table className="table table-sm table-striped table-bordered table-responsive-sm m-0">
                <caption className="px-2"><i>Drug reorder history</i></caption>
                <thead className="">
                  <tr><th>#</th><th>Date</th><th>Drug</th><th>User</th><th className="text-center">Action</th></tr>
                </thead>
                <tbody>
                  {reorder_history_list}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
  pharmacy: state.pharmacy,
});

export default connect(mapStateToProps, { addReorder })(Reorders);
