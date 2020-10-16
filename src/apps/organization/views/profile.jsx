import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrganization, updateOrganization } from '../actions';

export class Profile extends Component {
  state = {
    selected_organization: null,
    name: "",
    slogan: "",
    address: "",
    email: "",
    phone: "",
  }

  componentDidMount() {
    this.props.getOrganization()
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      const { organization_profile } = this.props.organization;
      if (organization_profile) {
        this.setState({
          selected_organization: organization_profile,
          name: organization_profile.name,
          slogan: organization_profile.slogan,
          address: organization_profile.address,
          email: organization_profile.email,
          phone: organization_profile.phone,
        })
      }
    }
  }

  onSubmitOrganization = (e) => {
    e.preventDefault();
    const {
      selected_organization,
      name,
      slogan,
      address,
      email,
      phone,
    } = this.state;

    const data = {
      name,
      slogan,
      address,
      email,
      phone,
    }
    this.props.updateOrganization(selected_organization.id, data);
  }

  render() {
    const { organization_profile } = this.props.organization;

    return (
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto mt-3">
        {organization_profile ?
          <div className="card">
            <form onSubmit={this.onSubmitOrganization}>
              <div className="card-body">
                <div className="row mx-auto">
                  <div className="form-group col-12">
                    <input className="form-control form-control-sm"
                      name="name" onChange={this.onChange}
                      value={this.state.name}
                      required={true} />
                    <label>Organization Name<sup>*</sup></label>
                  </div>
                  <div className="form-group col-12">
                    <input className="form-control form-control-sm"
                      name="slogan" onChange={this.onChange}
                      value={this.state.slogan}
                      required={true} />
                    <label>Slogan<sup>*</sup></label>
                  </div>
                  <div className="form-group col-12">
                    <input className="form-control form-control-sm"
                      name="address" onChange={this.onChange}
                      value={this.state.address}
                      required={true} />
                    <label>Address</label>
                  </div>
                  <div className="form-group col-12">
                    <input type="email" className="form-control form-control-sm"
                      name="email" onChange={this.onChange} value={this.state.email}
                      required={true} />
                    <label>Email<sup>*</sup></label>
                  </div>
                  <div className="form-group col-12">
                    <input className="form-control form-control-sm"
                      name="phone" onChange={this.onChange} value={this.state.phone}
                      required={true} />
                    <label>Phone</label>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                {this.props.rights.can_edit_organization ?
                  <button type="submit" className="btn btn-sm btn-success"
                    onSubmit={this.onSubmitOrganization}>
                    <i className="fa fa-check"></i> Update</button> : null}
              </div>
            </form>
          </div>
          :
          <div className="card card-body">
            Profile not loaded
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  organization: state.organization,
  common: state.common,
  rights: state.auth.user.rights
});

export default connect(mapStateToProps, { getOrganization, updateOrganization })(Profile);
