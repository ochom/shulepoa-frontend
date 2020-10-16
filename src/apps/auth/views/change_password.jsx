import React, { Component } from 'react'
import { connect } from 'react-redux';
import { confirm_reset } from '../actions';
import queryString from 'query-string';

export class Change extends Component {
  state = {
    new_password1: "",
    new_password2: "",
    uid: "",
    token: ""
  }

  componentDidMount() {
    var params = queryString.parse(this.props.location.search);
    this.setState({ uid: params.ID, token: params.token })
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmmit = (e) => {
    e.preventDefault();
    const {
      new_password1,
      new_password2,
      uid,
      token
    } = this.state;
    var data = {
      new_password1,
      new_password2,
      uid,
      token
    }
    this.props.confirm_reset(data);
  }

  onLogin = () => {
    this.props.history.push("/auth");
  }

  render() {
    const { common: { silent_processing }, auth: { password_changed } } = this.props;
    if (password_changed) {
      return (
        <div className="card p-0">
          <div className="card-header">Success</div>
          <div className="card-body">
            <p>Your password has been reset. You can now use your new password to login</p>
            <button className="btn cu-bg-primary" onClick={this.onLogin}>Login</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="py-5">
          <div className="pb-3 text-center">
            <img src="/static/logo.png" alt="HP" />
            <h5><b>Change your password.</b></h5>
          </div>
          <form onSubmit={this.onSubmmit}>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <input type="password" className="form-control" required={true}
                  name="new_password1" onChange={this.onChange} value={this.state.new_password1} />
                <label>New password</label>
              </div>
              <div className="form-group col-12">
                <input type="password" className="form-control" required={true}
                  name="new_password2" onChange={this.onChange} value={this.state.new_password2} />
                <label>Confirm password</label>
              </div>
              <div className="form-group col-12 mt-4">
                {
                  silent_processing ?
                    <button className="btn btn-block cu-bg-primary disabled" disabled={true}
                      type="submit" onSubmit={this.onSubmmit}>
                      <i className="fa fa-spinner fa-spin mr-5"></i>Processing</button> :
                    <button className="btn btn-block cu-bg-primary"
                      type="submit" onSubmit={this.onSubmmit}>Change Password</button>
                }
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default connect(state => ({ auth: state.auth, common: state.common }), { confirm_reset })(Change)
