import React, { Component, createRef } from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends Component {
  constructor(props) {
    super(props)

    this.videoRef = createRef()
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchStream(id)
    
    this.buildPlayer()
  }

  componentDidUpdate() {
    this.buildPlayer()
  }

  componentWillUnmount() {
    this.player.destroy()
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return
    }

    const { id } = this.props.match.params
    // obs -> settings -> stream -> rtmp://localhost/live then 1
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()
  }

  render() {
    if (!this.props.stream) {
      return <div>Fetching stream data...</div>
    }

    const { title, description, id, userId } = this.props.stream
    const authorJSX = userId ? <div>Created by: {userId}</div> : null
    
    return (
      <div>
        <video
          style={{ width: '100%' }}
          ref={this.videoRef}
          controls
        />
        <h1>{title}</h1>
        <div>Description: {description}</div>
        <div>ID: {id}</div>
        {authorJSX}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params

  return { stream: state.streams[id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)