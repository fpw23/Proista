import React from 'react'
import _ from 'lodash'
import { comparePaths } from '@proista/client-tools/lib/index'

export const AsDebouncedInput = (WrappedComponent, config = { timeout: 500 }) => {
  return class DebouncedInput extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        value: this.props.value
      }
      this.sendTextChange = _.debounce(this.sendTextChange, config.timeout)
    }

    componentDidMount () {
      const { value: propValue } = this.props
      const { value: stateValue } = this.state

      if (propValue !== stateValue) {
        this.setState({
          value: stateValue
        })
      }
    }

    componentDidUpdate (prevprops, prevstate) {
      const propValue = comparePaths('value', this.props, prevprops, '')
      const { value } = this.state

      if (propValue.HasChanged && propValue.Current !== value) {
        this.setState({
          value: propValue.Current
        })
      }
    }

    handleTextChange = (e) => {
      // e.persist()
      this.setState({ value: e.target.value })
      this.sendTextChange(e.target.value)
    }

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

export const AsDebouncedInput2 = (WrappedComponent, config = { timeout: 500 }) => {
  class WithDebounce extends React.PureComponent {
    state = {};

    static getDerivedStateFromProps (nextProps, prevState) {
      const nextState = {}
      if (nextProps.onChange !== prevState.onChange) {
        nextState.onChange = nextProps.onChange
        nextState.onChangeDebounced = _.debounce(nextState.onChange, config.timeout)
      }
      return nextState
    };

    render () {
      const { forwardedRef, ...passThroughProps } = this.props
      const { onChangeDebounced } = this.state
      return (
        <WrappedComponent {...passThroughProps} ref={forwardedRef} onChange={onChangeDebounced} />
      )
    }
  }

  return React.forwardRef((props, ref) => {
    return <WithDebounce {...props} forwardedRef={ref}/>
  })
}

export default AsDebouncedInput
