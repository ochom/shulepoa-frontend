import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHTMLTableToExcel from '../../common/actions';
import { getReorders } from '../actions';


export class Reorders extends Component {
  state = {
  }

  componentDidMount() {
    this.props.getReorders();
    window.looper = setInterval(() => this.props.getReorders(), 300000)
  }

  componentWillUnmount() {
    clearInterval(window.looper)
  }

  render() {
    const { pharmacy: { reorders }, hospital: { users } } = this.props;
    return (
      <div className="col-md-10 mx-auto mt-3">
        <div className="card">
          <div className="card-header py-2 px-3">
            <div>Stock ajustment records</div>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-sm"
              table="data_table"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export" />
          </div>
          <div className="card-body p-0">
            <table className="table table-sm table-hover table-responsive-sm" id="data_table">
              <thead className="">
                <tr>
                  <th>#</th>
                  <th>Drugs</th>
                  <th>Batch Number</th>
                  <th className="text-center">Qty Before</th>
                  <th className="text-center">New Stock</th>
                  <th className="text-center">Qty After</th>
                  <th>Expiry</th>
                  <th>Adjusted by</th>
                </tr>
              </thead>
              <tbody>
                {reorders.map((order, index) =>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.drug_name}</td>
                    <td>{order.batch_number}</td>
                    <td className="text-center text-danger">{order.quantity_before}</td>
                    <td className="text-center text-primary">{order.new_stock_quantity}</td>
                    <td className="text-center text-success">{order.quantity_after}</td>
                    <td>{order.expiry_date}</td>
                    <td>{users.find(u => u.id = order.created_by) ? users.find(u => u.id = order.created_by).username : ""}</td>
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

const stateToProps = state => ({
  hospital: state.hospital,
  common: state.common,
  pharmacy: state.pharmacy,
});

export default connect(stateToProps, { getReorders })(Reorders);
