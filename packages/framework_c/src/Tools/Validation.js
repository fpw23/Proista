import _ from 'lodash'
import { MessageBuilder } from './FunctionResult'
import * as queryString from 'query-string'

export const JoiCore = require('joi')
const JoiMoment = require('./ValidationJoiDate')

export const Joi = JoiCore.extend(JoiMoment)

export const ConvertValidationErrorDetails = (details, section = '') => {
  return _.map(details, (d) => {
    const msg = d.message
    const pth = d.path.join('.')

    if (_.startsWith(msg, '"value" failed custom validation because ')) {
      const errorMessage = msg.substring(41)
      const errorMessageParts = _.split(errorMessage, '?PARAMS?')
      const messageParameters = errorMessageParts.length > 1 ? queryString.parse(errorMessageParts[1]) : {}
      const messageText = errorMessageParts[0]

      if (messageParameters.path) {
        const pathParts = _.split(pth, '.')
        pathParts.pop()
        pathParts.push(messageParameters.path)
        return MessageBuilder.Rule(messageText, _.join(pathParts, '.'), section)
      } else if (pth) {
        return MessageBuilder.Rule(messageText, pth, section)
      } else {
        return MessageBuilder.Error(messageText, section)
      }
    } else {
      return MessageBuilder.Rule(d.message, pth, section)
    }
  })
}

export const TestValidation = (schema, data, options) => {
  const valResults = schema.validate(data, options === undefined ? { abortEarly: false, allowUnknown: true } : options)

  if (valResults.error) {
    return ConvertValidationErrorDetails(valResults.error.details)
  } else {
    return []
  }
}
