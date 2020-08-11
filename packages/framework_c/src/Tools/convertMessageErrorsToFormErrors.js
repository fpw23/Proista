import _ from 'lodash'
export const convertMessageErrorsToFormErrors = (messages) => {
  const ret = {
    fieldNames: [],
    errors: {},
    success: false
  }

  if (_.isArray(messages) === false) {
    ret.errors._error = 'Submit Failed: Errors are not an array!'
    return ret
  }

  const validationErrors = _.filter(messages, { Type: 'Rule' })

  if (validationErrors.length > 0) {
    ret.fieldNames = _.map(validationErrors, (ve) => ve.Field)

    _.each(validationErrors, (ve) => {
      if (ve.Field) {
        if (_.has(ret.errors, ve.Field)) {
          _.set(ret.errors, ve.Field, _.join([_.get(ret.errors, ve.Field), ve.Message], ','))
        } else {
          _.set(ret.errors, ve.Field, ve.Message)
        }
      }
    })
    ret.success = true
    return ret
  } else {
    return null
  }
}
