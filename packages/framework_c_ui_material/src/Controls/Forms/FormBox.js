import React from 'react'
import { reduxForm } from 'redux-form'
import { FormBoxContext } from './FormBoxContext'
import { comparePaths } from '@proista/client-tools/lib/index'

class FormBoxPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeSideEffects: undefined
    }
  }

  static defaultProps = {
    destroyOnUnmount: true,
    readonly: false,
    debugMode: false
  }

  componentDidMount () {
    const { sideEffects = '' } = this.props
    if (sideEffects !== '') {
      try {
        this.setState({
          activeSideEffects: JSON.parse(sideEffects)
        })
      } catch (error) {

      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const sideEffects = comparePaths('sideEffects', this.props, prevProps, '')

    if (sideEffects.HasChanged) {
      if (sideEffects.Current !== '') {
        try {
          this.setState({
            activeSideEffects: JSON.parse(sideEffects.Current)
          })
        } catch (error) {

        }
      }
    }
  }

  render () {
    const { 'data-tid': testId = '', handleSubmit, loading = false, className, children, readonly = false, debugMode = false, onChange, onSubmit } = this.props
    const { activeSideEffects = {} } = this.state

    return (
      <FormBoxContext.Provider value={{ loading: loading, readonly: readonly, sideEffects: activeSideEffects, debugMode: debugMode }}>
        <form data-tid={testId} className={className} onSubmit={handleSubmit(onSubmit)} onChange={onChange} >
          {children}
        </form>
      </FormBoxContext.Provider>
    )
  }
}

export const FormBox = reduxForm({
})(FormBoxPlain)
