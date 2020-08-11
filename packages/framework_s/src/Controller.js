import { FunctionResult, FunctionResultStatus } from '@proista/server-core/lib/FunctionResult'
import _ from 'lodash'

export const AsyncRoute = route => (req, res, next = console.error) => {
  Promise.resolve(route(req, res)).catch(next)
}

export const GenericControllerMethod = (config) => {
  /* config will be
     {
       inputModel: schema to validate as input
       preProcesser: method to perform security or other checks before the main processor
       processor: method that will accept function result, the parsed body and return function result, is required,
       postProcessor: method to perform logging or other post things after the main processor
       name: 'name of the method, is required
     }
  */

  return async (req, res) => {
    const ret = FunctionResult.new()
    try {
      if (_.isFunction(config.preProcessor)) {
        // pass the fr and req
        await config.preProcessor(ret, req, config.name)
      }

      let inputValue = {}
      if (_.isObject(config.inputModel) === true) {
        inputValue = config.inputModel.new(req.body)
      }

      // process the body
      if (_.isFunction(config.processor) === false) {
        ret.AddMessageError(`Invalid controller config for method ${config.name}, must have processor method`)
        ret.Status = FunctionResultStatus.Failure
        res.json(ret)
        return
      }

      await config.processor(inputValue, ret, req)
    } catch (err) {
      if (err.name === 'ModelErrors') {
        ret.AddMessages(err.Messages)
      } else if (_.isArray(err.Messages) === true) {
        ret.AddMessages(err.Messages)
      } else {
        ret.AddMessageError(err.Message || err.message)
      }
      ret.Status = FunctionResultStatus.Failure
    }

    try {
      if (_.isFunction(config.postProcessor) === true) {
        await config.postProcessor(ret, req, config.name)
      }
    } catch (errPost) {
      if (errPost.name === 'ModelErrors') {
        ret.AddMessages(errPost.Messages)
      } else if (_.isArray(errPost.Messages) === true) {
        ret.AddMessages(errPost.Messages)
      } else {
        ret.AddMessageError(errPost.Message || errPost.message)
      }
      ret.Status = FunctionResultStatus.Failure
    }

    res.json(ret)
  }
}
