import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBug, getReplies, addReply } from './actions'

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
    this.props.getReplies(this.props.match.params.bug_id)
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onReply = (e) => {
    e.preventDefault()
    const {
      bug_id,
      reply
    } = this.state

    const data = {
      bug_id,
      reply
    }
    this.props.addReply(data)
    this.setState({ reply: "" })
  }

  render() {
    const { bug, replies } = this.props
    return (
      <div className="col-md-10 mx-auto">
        {bug ?
          <>
            <div className="list-group my-3 issues-list">
              <div className="list-group-item" >
                <small className="time-posted">{new Date(bug.created).toLocaleDateString("en-us")}</small>
                <b className="p-0 m-0">{bug.title}</b><br />
                <small>Posted</small>
                {/* <small>George, <i>Ombo Hospital</i></small> */}
                <p className="">{bug.description}</p>
                {bug.is_resolved ?
                  <span className="status-resolved">Resolved</span> :
                  <span className="status-open">Active</span>
                }
              </div>
            </div>
            <div className="my-3">
              <form onSubmit={this.onReply}>
                <div className="form-group">
                  <textarea className="form-control bg-transparent" name="reply"
                    value={this.state.reply} onChange={this.onChange} required={true}
                    placeholder="Type a reply"></textarea>
                </div>
                <button type="submit" className="btn btn-sm bg-primary text-light"
                  onSubmit={this.onReply}>Reply</button>
              </form>
            </div>
            {replies.length > 0 ?
              <div className="list-group my-3 issues-list">Replies
              {replies.map((reply, index) =>
                <div className="list-group-item" key={index}>
                  <small>Posted</small>
                  {/* <small>George, <i>Ombo Hospital</i></small> */}
                  <small className="time-posted">{new Date(new Date(reply.created)).toLocaleDateString("en-us")}</small>
                  <p>{reply.reply}</p>
                </div>)}
              </div> : null
            }
          </> : null
        }
      </div>
    )
  }
}
export default connect(state => ({
  bug: state.bugs.bug,
  replies: state.bugs.replies
}), { getBug, getReplies, addReply })(Bug)
