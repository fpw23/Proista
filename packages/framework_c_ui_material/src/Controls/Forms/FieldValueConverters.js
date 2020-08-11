import _ from 'lodash'
import moment from 'moment'

export const FieldValueConverters = {
  Boolean: 'Boolean',
  Int: 'Int',
  Number: 'Number',
  TimeZoneData: 'TimeZoneData',
  CascaderData: 'CascaderData',
  Date: 'Date',
  TextUpper: 'TextUpper',
  TextLower: 'TextLower',
  TextNoSpaces: 'TextNoSpaces'
}

export const FieldValueFormatter = (formatter) => {
  if (_.isString(formatter)) {
    switch (formatter) {
      case FieldValueConverters.Boolean:
        return (v, n) => {
          if (_.isString(v)) {
            return v === 'true'
          } else if (_.isBoolean(v)) {
            return v
          } else {
            // eslint-disable-next-line eqeqeq
            return v == 'true'
          }
        }
      case FieldValueConverters.Date:
        return (v, n) => {
          if (_.isString(v)) {
            return moment(v)
          } else if (moment.isMoment(v)) {
            return v
          } else if (_.isDate(v)) {
            return moment(v)
          } else if (v !== null & v !== undefined) {
            console.log(v)
            throw Error('Can only convert from Strings or Date')
          } else {
            return v
          }
        }
      case FieldValueConverters.Int:
        return (v, n) => { return parseInt(v) }
      case FieldValueConverters.Number:
        return (v, n) => { return Number(v) }
      case FieldValueConverters.TimeZoneData:
        return (v, n) => {
          const parts = _.split(v, '/')
          const firstPart = parts.shift()
          return [
            firstPart,
            `${firstPart}/${_.join(parts, '/')}`
          ]
        }
      case FieldValueConverters.CascaderData:
        return (v, n) => {
          const parts = _.split(v, '/')
          return parts
        }
      default:
        return null
    }
  } else {
    return null
  }
}

export const FieldValueParser = (parser) => {
  if (_.isString(parser)) {
    switch (parser) {
      case FieldValueConverters.Date:
        return (v, n) => {
          if (_.isString(v)) {
            return moment(v).toDate()
          } else if (moment.isMoment(v)) {
            return v
          } else if (_.isDate(v)) {
            return v
          } else if (moment.isMoment(v)) {
            return v.toDate()
          } else if (v !== null & v !== undefined) {
            throw Error('Can only convert from Strings or Date')
          } else {
            return v
          }
        }
      case FieldValueConverters.Boolean:
        return (v, n) => {
          if (_.isString(v)) {
            return v === 'true'
          } else if (_.isBoolean(v)) {
            return v
          } else {
            // eslint-disable-next-line eqeqeq
            return v == 'true'
          }
        }
      case FieldValueConverters.Int:
        return (v, n) => { return parseInt(v) }
      case FieldValueConverters.Number:
        return (v, n) => { return Number(v) }
      case FieldValueConverters.TimeZoneData:
      case FieldValueConverters.CascaderData:
        return (v, n) => {
          const part = _.last(v)
          return part
        }
      case FieldValueConverters.TextUpper:
        return (v, n) => { return _.toUpper(v) }
      case FieldValueConverters.TextLower:
        return (v, n) => { return _.toLower(v) }
      case FieldValueConverters.TextNoSpaces:
        return (v, n) => { return _.replace(v, ' ', '') }
      default:
        return null
    }
  } else {
    return null
  }
}

function walkOptions (options, searchValue, collectedData, propNames) {
  for (var option of options) {
    if (option[propNames.valueProp] === searchValue) {
      collectedData.push(_.pick(option, [propNames.textProp, propNames.valueProp]))
      return
    }
    if (_.isArray(option[propNames.childrenProp])) {
      collectedData.push(_.pick(option, [propNames.textProp, propNames.valueProp]))
      walkOptions(option[propNames.childrenProp], searchValue, collectedData, propNames)
    }
  }
}

export const LookupValueFormatter = (options, value, valueProp = 'Value', textProp = 'Text', childrenProp = 'Children') => {
  if (!options || !value) {
    return {
      Text: '',
      Keys: []
    }
  }

  const searchOptions = _.clone(options) || []
  const searchValue = _.isArray(value) ? _.last(value) : value
  let displayValues = []

  for (var searchOption of searchOptions) {
    walkOptions([searchOption], searchValue, displayValues, { valueProp, textProp, childrenProp })
    if (searchValue === (_.last(displayValues) || {})[valueProp]) {
      break
    }
    displayValues = []
  }
  if (displayValues.length > 0) {
    return {
      Text: _.join(_.map(displayValues, textProp), ' / '),
      Keys: _.map(displayValues, valueProp)
    }
  } else {
    return {
      Text: '',
      Keys: []
    }
  }
}
