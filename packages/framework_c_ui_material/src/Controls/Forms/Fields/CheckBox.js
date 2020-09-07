import React from 'react'
import { Field } from 'redux-form'
import { FieldLayoutBox } from '../FieldLayoutBox'
import { FieldValueFormatter, FieldValueParser, FieldValueConverters } from '../FieldValueConverters'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'

export class CheckBoxClass extends React.Component {
    static defaultProps = {
      readonlyTrueValue: 'Yes',
      readonlyFalseValue: 'No'
    }

    render () {
      const { icon, checkedIcon, text, readonlyTrueValue, readonlyFalseValue, ...rest } = this.props

      return (
        <FieldLayoutBox {...rest}>
          {({ value, onChange, name, readonly, testId, onBlur, label }) => {
            const htmlId = `checkbox_${name}`
            const lbId = `checkboxlb_${name}`
            if (readonly === true) {
              return <React.Fragment>
                {label && (
                  <InputLabel
                    htmlFor={htmlId}
                    id={lbId}
                  >
                    {label}
                  </InputLabel>
                )}
                <FilledInput
                  data-tid={testId}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value === true ? readonlyTrueValue : readonlyFalseValue}
                  id={htmlId}
                  name={htmlId}
                />
              </React.Fragment>
            } else {
              if (label) {
                return <React.Fragment>
                  <FormLabel component="legend">{label}</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={onChange}
                      data-tid={testId}
                      checked={value}
                      icon={icon}
                      name={htmlId}
                      checkedIcon={checkedIcon}
                    />} label={text} />
                  </FormGroup>
                </React.Fragment>
              } else {
                return <FormControlLabel control={<Checkbox
                  onChange={onChange}
                  data-tid={testId}
                  checked={value}
                  icon={icon}
                  name={htmlId}
                  checkedIcon={checkedIcon}
                />} label={text} />
              }
            }
          }}
        </FieldLayoutBox>
      )
    }
};

export const CheckBox = ({ parse, format, fieldType = FieldValueConverters.Boolean, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={CheckBoxClass} /> } // eslint-disable-line
export default CheckBox
