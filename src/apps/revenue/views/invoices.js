import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Invoices extends Component {
  render() {
    return (
      <div className="col-md-10 mx-auto">
        <div className="row col-12 my-2 mx-0 p-0">
          <input className="form-control" placeholder="Search..." />
        </div>
        <div className="card">
          <div className="card-header">Invoices</div>
          <div className="card-body p-0">
            <Tabs>
              <TabList>
                <Tab>All invoices</Tab>
                <Tab>Drafts</Tab>
                <Tab>Billed</Tab>
                <Tab>Paid</Tab>
              </TabList>
              <TabPanel>
                <table className="table table-sm">
                  <thead>
                    <th>#</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </thead>
                </table>
              </TabPanel>
              <TabPanel>
                <table className="table table-sm">
                  <thead>
                    <th>#</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </thead>
                </table>
              </TabPanel>
              <TabPanel>
                <table className="table table-sm">
                  <thead>
                    <th>#</th>
                    <th>Invoice No.</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </thead>
                </table>
              </TabPanel>
              <TabPanel>
                <table className="table table-sm">
                  <thead>
                    <th>#</th>
                    <th>Invoice No.</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </thead>
                </table>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
