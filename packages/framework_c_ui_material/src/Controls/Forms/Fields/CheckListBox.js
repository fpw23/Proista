import React from 'react'
import _ from 'lodash'
import { Field } from 'redux-form'
import FormGroup from '@material-ui/core/FormGroup'
// import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { FieldLayoutBox } from '../FieldLayoutBox'
import FormLabel from '@material-ui/core/FormLabel'
import { FieldValueFormatter, FieldValueParser } from '../FieldValueConverters'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3)
  }
}))

function CheckList (props) {
  const { options = [], textProp = 'Text', valueProp = 'Value', input = {}, inline = false, ...rest } = props
  const classes = useStyles()

  const handleChange = (event) => {
    if (_.isFunction(input.onChange) === true) {
      const { value = [] } = input
      if (event.target.checked === true) {
        input.onChange(_.union(value, [event.target.name]))
      } else {
        input.onChange(_.filter(value, (v) => { return v !== event.target.name }))
      }
    }
  }

  return (
    <FieldLayoutBox {...rest} input={input} component='fieldset' className={classes.formControl}>
      {({ name, placeHolder, loading, readonly, testId, onBlur, label }) => {
        const htmlId = `checklist_${name}`
        return <React.Fragment>
          {label ? <FormLabel component="legend">{label}</FormLabel> : null }
          <FormGroup id={htmlId} row={inline}>
            {_.map(options, (o) => {
              return <FormControlLabel
                control={<Checkbox checked={_.includes(input.value, o[valueProp])} onChange={handleChange} name={o[valueProp]} />}
                label={o[textProp]}
              />
            })}
          </FormGroup>
        </React.Fragment>
      }}
    </FieldLayoutBox>

  )
}

export class CheckListBoxClass extends React.Component {
  render () {
    const { options = [], textProp = 'Text', valueProp = 'Value', inline = false, input, meta, label } = this.props
    return (
      <CheckList
        label={label}
        input={input}
        meta={meta}
        inline={inline}
        textProp={textProp}
        valueProp={valueProp}
        options={options}
      />

    )
  }
}

  export const CheckListBox = ({ parse, format, fieldType, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={CheckListBoxClass} /> } // eslint-disable-line
export default CheckListBox
