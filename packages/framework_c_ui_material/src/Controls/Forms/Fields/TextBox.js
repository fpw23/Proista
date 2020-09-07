import React from 'react'
import { Field } from 'redux-form'
import { FieldLayoutBox } from '../FieldLayoutBox'
import { FieldValueFormatter, FieldValueParser } from '../FieldValueConverters'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import { AsDebouncedInput } from '../DebouncedInput'
import _ from 'lodash'

const DebouncedOutlinedInput = AsDebouncedInput(OutlinedInput, { timeout: 500 })

export class TextBoxClass extends React.Component {
  onBlur = (e) => {
    const { input: { onBlur }, dontAutoTrim = false } = this.props
    if (_.isFunction(onBlur)) {
      if (!dontAutoTrim) {
        const trimmedValue = _.trim(e.target.value)
        onBlur(trimmedValue)
      } else {
        onBlur(e)
      }
    }
  }

  render () {
    const { password = false, multiline = false, debounced = true, ...rest } = this.props
    const inputType = password ? 'password' : 'text'
    return (
      <FieldLayoutBox {...rest}>
        {({ showError, value, onChange, name, placeHolder, loading, readonly, testId, label }) => {
          const TextComponent = readonly === true
            ? FilledInput
            : debounced === true
              ? DebouncedOutlinedInput
              : OutlinedInput

          const htmlId = `text_${name}`
          const labelId = `textlb_${name}`
          const labelElement = label && (
            <React.Fragment>
              {label}
              {showError && '\u00a0*'}
            </React.Fragment>
          )

          return <React.Fragment>
            {label && (
              <InputLabel htmlFor={htmlId} id={labelId}>
                {label}
              </InputLabel>
            )}
            <TextComponent
              data-tid={testId}
              onChange={onChange}
              onBlur={this.onBlur}
              fullWidth={true}
              label={readonly === true ? null : labelElement}
              value={value}
              id={htmlId}
              name={htmlId}
              type={inputType}
              multiline={multiline}
              rows={multiline === true ? '5' : ''}
            />
          </React.Fragment>
        }}
      </FieldLayoutBox>
    )
  }
};

export const TextBox = ({ parse, format, fieldType, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={TextBoxClass} /> } // eslint-disable-line
export default TextBox
