import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Invoices extends Component {
  render() {
    return (
      <div className="col-12 mx-auto">
        <div className="card">
          <div className="card-header">Invoices
          <input className="form-control" placeholder="Search..." />
          </div>
          <div className="card-body p-0">
            <Tabs>
              <TabList>
                <Tab>All invoices</Tab>
                <Tab>Pending</Tab>
                <Tab>Processed</Tab>
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
                    <th>Status</th>
                    <th>Action</th>
                  </thead>
                </table>
              </TabPanel>
              <TabPanel>
                <table className="table table-sm">
                  <thead>
                    <th>Invoice No.</th>
                    <th>Client</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th className="text-primary">
                      <i className="fa fa-thumbs-o-up"></i> Processed</th>
                    <th>Action</th>
                  </thead>
                </table>
              </TabPanel>
              <TabPanel>
                <table></table>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
