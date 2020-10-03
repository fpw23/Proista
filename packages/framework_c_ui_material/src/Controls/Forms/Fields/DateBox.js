import React from 'react'
import { Field } from 'redux-form'
import InputLabel from '@material-ui/core/InputLabel'
import { DesktopDatePicker, MobileDatePicker, LocalizationProvider } from '@material-ui/pickers'
import MomentAdapter from '@material-ui/pickers/adapter/moment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import moment from 'moment'
import _ from 'lodash'

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
    const { displayMode = 'desktop', displayFormat = 'MM/DD/YYYY', ...rest } = this.props
    return (
      <LocalizationProvider dateAdapter={MomentAdapter}>
        <FieldLayoutBox {...rest}>
          {({ showError, value, onChange, name, placeHolder, loading, readonly, testId, label }) => {
            const DateComponent = readonly === true
              ? FilledInput
              : displayMode === 'desktop' ? DesktopDatePicker : MobileDatePicker

            const htmlId = `date_${name}`
            const labelId = `datelb_${name}`
            const labelElement = label && (
              <React.Fragment>
                {label}
                {showError && '\u00a0*'}
              </React.Fragment>
            )

            const dateProps = {
              ...rest,
              inputFormat: displayFormat,
              renderInput: (props) => <OutlinedInput {..._.omit(props, 'InputProps', 'helperText')} {...props.InputProps} fullWidth={true} />
            }

            if (displayMode === 'desktop') {
              dateProps.onChange = this.onChange
            } else {
              dateProps.onChange = () => {}
              dateProps.onAccept = this.onChange
            }

            return <React.Fragment>
              {label && (
                <InputLabel htmlFor={htmlId} id={labelId}>
                  {label}
                </InputLabel>
              )}
              <DateComponent
                {...dateProps}
                data-tid={testId}
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
