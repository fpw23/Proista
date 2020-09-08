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
import ListSubheader from '@material-ui/core/ListSubheader'

export class ComboBoxClassPlain extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      autosetComplete: false,
      optionsAvailable: false,
      firstDidUpdate: true
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

  componentDidUpdate (prevProps, prevState) {
    const {
      options: prevOptions = [],
      filterValue: prevFilterValue
    } = prevProps
    const {
      options: currOptions = [],
      filterValue: currFilterValue,
      FormSetFieldValue,
      meta,
      input,
      extraDataMap,
      textProp,
      valueProp,
      autosetFirstOption
    } = this.props

    const {
      optionsAvailable: prevOptionsAvailable
    } = prevState
    const {
      optionsAvailable: currOptionsAvailable,
      autosetComplete,
      firstDidUpdate
    } = this.state

    const filtersSame = _.isEqual(prevFilterValue, currFilterValue)

    if (filtersSame === false) {
      if (!firstDidUpdate) {
        FormSetFieldValue(meta.form, input.name, null)
      } else {
        this.setState({
          firstDidUpdate: false
        })
      }
    }

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

  renderOptions (options, value, filterValue) {
    const { valueProp, textProp, filterProp, groupProp } = this.props

    const opts = (
      filterValue
        ? _.filter(options, filterValue)
        : options
    )

    if (groupProp) {
      return _.map(_.toPairs(_.groupBy(opts, (i) => { return _.get(i, groupProp, '?') })), ([groupName, groupItems]) => {
        const ret = [
          <ListSubheader key={`group_${groupName}`}>
            {groupName}
          </ListSubheader>
        ]
        for (const value of groupItems) {
          const valuePropValue = value[valueProp || 'Value']
          const textPropValue = value[textProp || 'Text']
          ret.push(
            <MenuItem key={valuePropValue} value={valuePropValue}>{textPropValue || valuePropValue}</MenuItem>
          )
        }
        return ret
      })
    } else {
      return _.map(opts, (o, i) => {
        const valuePropValue = o[valueProp || 'Value']
        const textPropValue = o[textProp || 'Text']

        if (filterValue) {
          const filterPropValue = o[filterProp || 'ParentValue']
          if (filterValue !== filterPropValue) {

          }
        }

        return (
          <MenuItem key={valuePropValue} value={valuePropValue}>{textPropValue || valuePropValue}</MenuItem>
        )
      })
    }
  }

  render () {
    const { options, valueProp, textProp, filterValue, ...rest } = this.props
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
                {this.renderOptions(options, value, filterValue)}
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
  WithRedux([], [FActions.SetFieldValue, FActions.ClearFields])
)(ComboBoxClassPlain)

export const ComboBox = ({ parse, format, fieldType, ...rest }) => { return <Field parse={fieldType ? FieldValueParser(fieldType) : parse} format={fieldType ? FieldValueFormatter(fieldType) : format} {...rest} component={ComboBoxClass} /> } // eslint-disable-line
export default ComboBox
