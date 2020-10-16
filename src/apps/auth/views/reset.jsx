import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reset } from '../actions';

export class Reset extends Component {
  state = {
    email: "",
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmmit = (e) => {
    e.preventDefault();
    this.props.reset({ email: this.state.email });
  }

  onHavePassword = () => {
    this.props.history.push("/auth/");
  }

  render() {
    const { common: { silent_processing }, auth: { reset_sent } } = this.props;
    if (reset_sent) {
      return (
        <div className="card p-0">
          <div className="card-header">Success</div>
          <div className="card-body">
            <p>A password reset link has been sent to your email. Check your email inbox for information on how to change your password.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="py-5">
          <div className="pb-3 text-center">
            <img src="/static/logo.png" alt="HP" />
            <h5><b>Enter your email to reset password</b></h5>
          </div>
          <form onSubmit={this.onSubmmit}>
            <div className="row col-12 mx-auto">
              <div className="form-group col-12">
                <input type="email" className="form-control" required={true}
                  name="email" onChange={this.onChange} value={this.state.email} />
                <label>Email address</label>
              </div>
              <div className="form-group col-12 mt-4">
                {
                  silent_processing ?
                    <button className="btn btn-block cu-bg-primary disabled" disabled={true}
                      type="submit" onSubmit={this.onSubmmit}>
                      <i className="fa fa-spinner fa-spin mr-5"></i> Processing</button> :
                    <button className="btn btn-block cu-bg-primary"
                      type="submit" onSubmit={this.onSubmmit}>
                      Submit Email</button>
                }
              </div>
            </div>
          </form>
          <div className="form-group col-12 mt-4">
            <h6>
              Have password? <b onClick={this.onHavePassword}>Login</b>
            </h6>
          </div>
        </div>
      )
    }
  }
}

export default connect(state => ({ auth: state.auth, common: state.common }), { reset })(Reset)
