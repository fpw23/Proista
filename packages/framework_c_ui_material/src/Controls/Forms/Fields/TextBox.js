import React from 'react'
import { Field } from 'redux-form'
import { FieldLayoutBox } from '../FieldLayoutBox'
import { FieldValueFormatter, FieldValueParser } from '../FieldValueConverters'
import InputLabel from '@material-ui/core/InputLabel'
import AsDebouncedInput from '../DebouncedInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'

const DebouncedInput = AsDebouncedInput(OutlinedInput, { timeout: 500 })

class TextBoxClass extends React.Component {
  render () {
    const { password = false, multiline = false, ...rest } = this.props
    var inputType = password ? 'password' : 'text'
    return (
      <FieldLayoutBox {...rest}>
        {({ showError, value, onChange, name, placeHolder, loading, readonly, testId, onBlur, label }) => {
          const InputComponent = readonly === true ? FilledInput : DebouncedInput

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
            <InputComponent
              data-tid={testId}
              onChange={onChange}
              onBlur={onBlur}
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
