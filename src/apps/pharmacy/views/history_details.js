import React, { Component } from 'react'
import { connect } from 'react-redux'
import person_icon from '../../../images/person_icon.png'

export class HistoryDetails extends Component {
  state = {
    reorder: null,
  }

  componentDidMount() {
    this.setState({ reorder: this.props.reorder_history.filter(reorder => reorder.id === parseInt(this.props.match.params.pk))[0] })
  }

  render() {
    const { service_list } = this.props;
    const { reorder } = this.state;
    return (
      <>
        {reorder ?
          <div className="row col-12 mt-3 justify-content-center mx-auto">
            <div className="col-3">
              <div className="patient_profile p-0 border border-light rounded ">
                <div className="row col-12 mx-auto justify-content-center"
                  style={{ marginTop: "2vw", zIndex: "1" }}>
                  <img src={person_icon} alt="DP" style={{ height: "5vw", width: "5vw", borderRadius: "50%" }} />
                  <p className="cu-text-primary col-12 text-center text-white mt-2">Supplier Profile</p>
                </div>
                <ul className="w-100 mx-auto list-group mt-2">
                  <li className="list-group-item">
                    <span className="m-0">Name:</span> <span style={{ float: "right" }}>{reorder.supplier_details.name}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Email:</span> <span style={{ float: "right" }}>{reorder.supplier_details.email}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Phone:</span> <span style={{ float: "right" }}>{reorder.supplier_details.phone}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="m-0">Address:</span> <span style={{ float: "right" }}>{reorder.supplier_details.address}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-7">
              <div className="card">
                <div className="card-header cu-bg-secondary py-1 px-3">
                  <div style={{ fontSize: "1vw", float: "left" }} className="py-1 px-2"><b>Supply Information</b></div>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="m-0">Product:</span>
                      <span style={{ float: "right" }}>{service_list.filter(service => service.id === reorder.service)[0].name}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Date:</span>
                      <span style={{ float: "right" }}>{new Date(reorder.created_at).toDateString("en-UK")}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Batch:</span>
                      <span style={{ float: "right" }}>{reorder.batch}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Supply Quantity:</span>
                      <span style={{ float: "right" }}>{reorder.new_stock_quantity}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Quantity Before:</span>
                      <span style={{ float: "right" }}>{reorder.quantity_before}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Quantity After:</span>
                      <span style={{ float: "right" }}>{reorder.quantity_after}</span>
                    </li>
                    <li className="list-group-item">
                      <span className="m-0">Received By:</span>
                      <span style={{ float: "right" }}>{reorder.created_by_user ? reorder.created_by_user.username : "---"}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> :
          null
        }
      </>
    )
  }
}

export default connect(state => ({
  reorder_history: state.pharmacy.reorder_history,
  service_list: state.hospital.service_list,
  constants: state.common.CONSTANTS,
}))(HistoryDetails)
