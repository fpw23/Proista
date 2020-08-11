import React from 'react'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { compose, comparePaths } from '@proista/client-tools/lib/index'
import { FormBox } from '../FormBox'
import { ah as FActions } from '@proista/client/lib/Data/Form/Types'
import { DynamicFormBody } from './DynamicFormBody'
import _ from 'lodash'
import { convertMessageErrorsToFormErrors } from '@proista/client/lib/Tools/index'
import { withDynamicFormContext } from './DynamicFormContext'

class DynamicFormBoxPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      code: '',
      activeSideEffects: {},
      effectsError: ''
    }
  }

  componentDidMount () {
    const { sideEffectsCode, SectionName, dynamicFormContext = {} } = this.props
    this.setState({
      code: sideEffectsCode || ''
    })

    const { brokenRules = [] } = dynamicFormContext
    const myBrokenRules = _.filter(brokenRules.Current, { Section: SectionName })
    if (myBrokenRules.length > 0) {

    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { form, SectionName, FormClearValidation } = this.props
    const newState = {}

    const code = comparePaths('sideEffectsCode', this.props, prevProps, '')

    if (code.HasChanged) {
      newState.code = code.Current
    }

    const brokenRules = comparePaths('dynamicFormContext.brokenRules', this.props, prevProps, [])

    if (brokenRules.HasChanged) {
      const myBrokenRules = _.filter(brokenRules.Current, { Section: SectionName })
      if (myBrokenRules.length > 0) {
        this.processBrokenRules(myBrokenRules)
      } else {
        FormClearValidation(form)
      }
    }
  }

  processBrokenRules = (brokenRules) => {
    const ret = convertMessageErrorsToFormErrors(brokenRules)
    const { FormClearValidation, FormSetValidation, form } = this.props

    if (ret) {
      if (ret.success) {
        FormSetValidation(form, ret.errors, ret.fieldNames)
      }
    } else {
      FormClearValidation(form)
    }
  }

  componentWillUnmount () {
    const { FormDestroy, form, destroyOnUnmount = true } = this.props
    if (destroyOnUnmount === true) {
      FormDestroy(form)
    }
  }

  onChange = (values) => {
    const { code } = this.state

    const buildEffects = this.buildSideEffects(code, values)

    if (buildEffects.error) {
      this.setState({
        effectsError: buildEffects.error.stack
      })
    } else {
      const { onChange } = this.props
      if (_.isFunction(onChange) === true) {
        this.setState({
          activeSideEffects: JSON.stringify(buildEffects.newEffects, null, 4),
          effectsError: ''
        }, () => { onChange(values, buildEffects.newEffects) })
      } else {
        this.setState({
          activeSideEffects: JSON.stringify(buildEffects.newEffects, null, 4),
          effectsError: ''
        })
      }
    }
  }

  onSubmit = (values) => {
    console.log(values)
    const { onSubmit } = this.props
    if (_.isFunction(onSubmit) === true) {
      return onSubmit(values)
    }
  }

  buildSideEffects = (code, values) => {
    const ret = {
      newEffects: {},
      error: undefined
    }
    // if (_.isString(code) && code !== '') {
    //   try {
    //     const runner = new Interpreter(code, function (interpreter, scope) { // eslint-disable-line
    //       interpreter.setProperty(scope, 'AddSideEffect', interpreter.createNativeFunction(AddSideEffect(ret.newEffects)))
    //     })
    //     runner.setValueToScope('formData', runner.nativeToPseudo(values))
    //     runner.setValueToScope('_', runner.nativeToPseudo(_))
    //     runner.run()
    //   } catch (error) {
    //     ret.error = error
    //   }
    // }
    return ret
  }

  render () {
    const { loading = false, readonly = false, form, definition = '[]', initialValues, debugMode = false, enableReinitialize = true } = this.props
    const { activeSideEffects = '', effectsError = '' } = this.state
    return <React.Fragment>
      <FormBox enableReinitialize={enableReinitialize} debugMode={debugMode} readonly={readonly} loading={loading}
        form={form} destroyOnUnmount={false} initialValues={initialValues} sideEffects={activeSideEffects}
        onChange={this.onChange} onSubmit={this.onSubmit} >
        <span>{effectsError}</span>
        <DynamicFormBody definition={definition} />
      </FormBox>
    </React.Fragment>
  }
}

export const DynamicFormBox = compose(
  WithRedux([
  ], [
    FActions.Destroy,
    FActions.ClearValidation,
    FActions.SetValidation
  ]),
  withDynamicFormContext
)(DynamicFormBoxPlain)

export default DynamicFormBox
