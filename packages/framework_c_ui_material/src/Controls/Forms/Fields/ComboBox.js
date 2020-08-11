import React from 'react'
import { Field } from 'redux-form'
import { FieldLayoutBox } from '../FieldLayoutBox'
import { FieldValueFormatter, FieldValueParser, LookupValueFormatter } from '../FieldValueConverters'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { compose } from '@proista/client-tools/lib/index'
import { ah as FActions } from '@proista/client/lib/Data/Form/Types'
import _ from 'lodash'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'

class ComboBoxClassPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      autosetComplete: false,
      optionsAvailable: false
    }
  }

  static defaultProps = {
    valueProp: 'Value',
    textProp: 'Text',
    options: [],
    autosetFirstOption: false
  }

  componentDidMount () {
    const {
      options = []
    } = this.props
    if (options.length > 0) {
      this.setState({
        optionsAvailable: true
      })
    }
  }

  componentDidUpdate ({
    options: prevOptions = []
  }, {
    optionsAvailable: prevOptionsAvailable
  }) {
    const {
      options: currOptions = [],
      FormSetFieldValue,
      meta,
      input,
      extraDataMap,
      textProp,
      valueProp,
      autosetFirstOption
    } = this.props

    const {
      optionsAvailable: currOptionsAvailable,
      autosetComplete
    } = this.state

    if (prevOptionsAvailable === false & currOptionsAvailable === true) {
      if (autosetFirstOption === true & autosetComplete === false) {
        // only auto set if initial value is null
        if (!meta.initial) {
          const firstOption = currOptions[0] || {}
          if (firstOption[valueProp]) {
            input.onChange(firstOption[valueProp])

            if (extraDataMap) {
              const extraData = firstOption.ExtraData || {}
              if (_.isString(extraDataMap)) {
                // just set this field to the Text of the selected value
                FormSetFieldValue(meta.form, extraDataMap, firstOption[textProp])
              } else if (_.isArray(extraDataMap)) {
                for (var mapInfo of extraDataMap) {
                  if (_.has(extraData, mapInfo.Source)) {
                    FormSetFieldValue(meta.form, mapInfo.Dest, extraData[mapInfo.Source])
                  }
                }
              } else if (_.isFunction(extraDataMap)) {
                extraDataMap(firstOption, extraData, (field, value) => {
                  FormSetFieldValue(meta.form, field, value, 'set')
                })
              } else {
                throw Error('Invalid extraDataMap, must be a string, array, or function!')
              }
            }
          }
        }
        this.setState({
          autosetComplete: true
        })
      }
    }

    if (prevOptions.length === 0 & currOptions.length > 0) {
      if (currOptionsAvailable === false) {
        this.setState({
          optionsAvailable: true
        })
      }
    }
  }

  renderOptions (options, value, sideEffects) {
    const { valueProp, textProp } = this.props

    return _.map(options, (o, i) => {
      const valuePropValue = o[valueProp || 'Value']
      const textPropValue = o[textProp || 'Text']

      return (
        <MenuItem key={valuePropValue} value={valuePropValue}>{textPropValue || valuePropValue}</MenuItem>
      )
    })
  }

  render () {
    const { options, valueProp, textProp, ...rest } = this.props
    const { optionsAvailable } = this.state
    return (
      <FieldLayoutBox {...rest}>
        {({ showError, value, onChange, name, placeHolder, loading, readonly, testId, onBlur, label, sideEffects }) => {
          let InputComponent
          const inputProps = {
            'data-tid': testId,
            onChange: onChange,
            onBlur: onBlur,
            id: `combo_${name}`,
            name: `combo_${name}`
          }

          const labelElement = label && (
            <React.Fragment>
              {label}
              {showError && '\u00a0*'}
            </React.Fragment>
          )

          if (optionsAvailable === true) {
            if (readonly) {
              InputComponent = <FilledInput {...inputProps} value={LookupValueFormatter(options, value).Text} />
            } else {
              InputComponent = <Select {...inputProps} value={value} label={labelElement}>
                {this.renderOptions(options, value, sideEffects)}
              </Select>
            }
          } else {
            InputComponent = <OutlinedInput {...inputProps} label={labelElement} disabled={true} value={'loading...'} />
          }

          return <React.Fragment>
            {label && (
              <InputLabel
                htmlFor={`combo_${name}`}
                id={`combolb_${name}`}
              >
                {label}
              </InputLabel>
            )}
            {InputComponent}
          </React.Fragment>
        }}
      </FieldLayoutBox>
    )
  }
};

const ComboBoxClass = compose(
  WithRedux([], [FActions.SetFieldValue])
)(ComboBoxClassPlain)

export const ComboBox = ({ parse, format, fieldType, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={ComboBoxClass} /> } // eslint-disable-line
export default ComboBox
