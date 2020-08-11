import React from 'react'

export class CatchError extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      info: null
    }
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error }
  }

  componentDidCatch (error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    })
  }

  renderError () {
    const { error, info } = this.state

    return <div>
      <h3>Error</h3>
      <p><b>Message</b></p>
      <p>{(error || {}).message}</p>
      <p><b>Stack Trace</b></p>
      <p>{(error || {}).stack}</p>
      <p><b>Component Trace</b></p>
      <p>{(info || {}).componentStack}</p>
    </div>
  }

  render () {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return this.renderError()
    }

    return children
  }
}
