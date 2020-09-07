import React from 'react'
import { Field } from 'redux-form'
import { FieldLayoutBox } from '../FieldLayoutBox'
import { FieldValueFormatter, FieldValueParser, FieldValueConverters } from '../FieldValueConverters'
import InputLabel from '@material-ui/core/InputLabel'
import AsDebouncedInput from '../DebouncedInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import NumberFormat from 'react-number-format'

const DebouncedInput = AsDebouncedInput(OutlinedInput, { timeout: 500 })

const NumberFormatInput = (props) => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
    />
  )
}

export class NumberBoxClass extends React.Component {
  render () {
    const {
      type = 'standard',
      customFormat = {},
      ...rest
    } = this.props

    let inputProps = {}
    switch (type) {
      case 'standard':
        inputProps = { thousandSeparator: ',' }
        break

      case 'currency':
        inputProps = { thousandSeparator: ',', prefix: '$', decimalScale: 0 }
        break

      case 'currencyWithCents':
        inputProps = { thousandSeparator: ',', prefix: '$', fixedDecimalScale: true, decimalScale: 2 }
        break

      case 'custom':
        inputProps = customFormat
        break

      default:
        inputProps = {}
        break
    }

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
              fullWidth={true}
              label={readonly === true ? null : labelElement}
              value={value}
              id={htmlId}
              name={htmlId}
              inputComponent={NumberFormatInput}
              inputProps={inputProps}
            />
          </React.Fragment>
        }}
      </FieldLayoutBox>
    )
  }
};

export const NumberBox = ({ parse, format, fieldType = FieldValueConverters.Number, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={NumberBoxClass} /> } // eslint-disable-line
export default NumberBox
