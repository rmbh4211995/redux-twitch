import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    
    this.props.fetchStream(id)
  }

  renderActions() {
    const { id } = this.props.match.params

    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteStream(id)} 
          className="ui button negative"
        >
          Delete
        </button>
        <Link
          to="/"
          className="ui button"
        >
          Cancel
        </Link>
      </Fragment>
    )
  }

  renderContent() {
    const { stream } = this.props 

    if (!stream) {
      return 'Fetching stream data...'
    }

    return (
      <div>
        <p>Are you sure you want to delete the stream: {stream.title}?</p>
        <div className="stream-delete-info-container">
          <p><p className="stream-delete-tag">ID: </p>{stream.id}</p>
          <p><p className="stream-delete-tag">Description: </p>{stream.description}</p>
          <p><p className="stream-delete-tag">Created by: </p>{stream.userId}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Modal 
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params

  return { stream: state.streams[id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)