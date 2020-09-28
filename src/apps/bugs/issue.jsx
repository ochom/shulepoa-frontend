import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBug, addReply } from './actions'
import moment from 'moment'

class Bug extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bug_id: props.match.params.bug_id,
      reply: ""
    }
  }

  componentDidMount() {
    this.props.getBug(this.props.match.params.bug_id)
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onReply = (e) => {
    e.preventDefault()
    const {
      bug_id,
      reply
    } = this.state

    const data = {
      bug: bug_id,
      reply
    }
    this.props.addReply(data)
    this.setState({ reply: "" })
  }

  getTime = (date) => {
    return moment(date).fromNow();
  }

  render() {
    const { bug, } = this.props
    return (
      <div className="col-md-8 mx-auto">
        {bug ?
          <>
            <div className="card card-body">
              <div className="list-group-item">
                <b className="p-0 m-0">{bug.title}</b><br />
                <small>{this.getTime(new Date(bug.created))}</small><br />
                <p className="">{bug.description}</p>
                <small>{bug.creator.username}</small>
                <form onSubmit={this.onReply}>
                  <div className="form-group">
                    <input className="form-control bg-transparent" name="reply"
                      value={this.state.reply} onChange={this.onChange} required={true}
                      placeholder="Type a reply" />
                  </div>
                  <button type="submit" className="btn btn-sm bg-primary text-light"
                    onSubmit={this.onReply}>Reply</button>
                </form>
              </div>
            </div>
            <ul className="pl-5">
              {bug.replies.map((reply, index) =>
                <li key={index}>
                  <small>{reply.creator.username}</small>
                  <p>{reply.reply}</p>
                </li>)}
            </ul>
          </> : null
        }
      </div>
    )
  }
}
export default connect(state => ({
  users: state.hospital.users,
  bug: state.bugs.bug,
  replies: state.bugs.replies
}), { getBug, addReply })(Bug)
