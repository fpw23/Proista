import React from 'react'
import _ from 'lodash'

export const AsDebouncedInput = (WrappedComponent, config = { timeout: 500 }) => {
  return class DebouncedInput extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        value: this.props.value
      }
      this.sendTextChange = _.debounce(this.sendTextChange, config.timeout)
    }

      handleTextChange = (e) => {
        this.setState({ value: e.target.value })
        this.sendTextChange(e.target.value)
      };

      sendTextChange = (e) => {
        this.props.onChange(e)
      }

      render () {
        return (
          <WrappedComponent {...this.props} value={this.state.value} onChange={this.handleTextChange.bind(this)} />
        )
      }
  }
}

export default AsDebouncedInput
