import React from 'react'
import { Field } from 'redux-form'
import InputLabel from '@material-ui/core/InputLabel'
import { DatePicker, LocalizationProvider } from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import moment from 'moment'

import { FieldLayoutBox } from '../FieldLayoutBox'
import { FieldValueFormatter, FieldValueParser } from '../FieldValueConverters'

export class DateBoxClass extends React.Component {
  onChange = (e) => {
    const { input } = this.props
    const { onChange } = input
    const newDate = moment(e)
    newDate.isValid ? onChange(newDate.toISOString()) : onChange(null)
  }

  render () {
    const { displayFormat = 'M/D/YYYY', ...rest } = this.props
    return (
      <LocalizationProvider dateAdapter={MomentAdapter}>
        <FieldLayoutBox {...rest}>
          {({ showError, value, onChange, name, placeHolder, loading, readonly, testId, label }) => {
            const DateComponent = readonly === true
              ? FilledInput
              : DatePicker

            const htmlId = `date_${name}`
            const labelId = `datelb_${name}`
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
              <DateComponent
                {...rest}
                inputFormat={displayFormat}
                renderInput={(props) => <OutlinedInput fullWidth={true} {...props} />}
                data-tid={testId}
                onChange={onChange}
                label={readonly === true ? null : labelElement}
                value={readonly === true ? moment(value).format(displayFormat) : value}
                id={htmlId}
                name={htmlId}
              />
            </React.Fragment>
          }}
        </FieldLayoutBox>
      </LocalizationProvider>
    )
  }
};

export const DateBox = ({ parse, format, fieldType, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={DateBoxClass} /> } // eslint-disable-line
export default DateBox
