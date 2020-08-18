import { initialize, reset, submit, destroy, change, clearSubmitErrors, setSubmitFailed, stopSubmit, setSubmitSucceeded } from 'redux-form'
import _ from 'lodash'
import { ah } from './Types'

export const formInitValues = (dispatch) => {
  return (formName, data, keepDirty = false, options) => {
    dispatch(initialize(formName, _.extend({}, data), keepDirty, options))
  }
}

export const formResetValues = (dispatch) => {
  return (formName) => {
    dispatch(reset(formName))
  }
}

export const formSubmit = (dispatch) => {
  return (formName) => {
    dispatch(submit(formName))
  }
}

export const formDestroy = (dispatch) => {
  return (formName) => {
    dispatch(destroy(formName))
  }
}

export const formSetFieldValue = (dispatch) => {
  return (formName, fieldName, value) => {
    dispatch(change(formName, fieldName, value))
  }
}

export const formSetValidation = (dispatch) => {
  return (formName, errors, fieldNames) => {
    dispatch(stopSubmit(formName, errors))
    if (_.isArray(fieldNames)) {
      dispatch(setSubmitFailed(formName, ...fieldNames))
    } else {
      const fields = _.keys(errors)
      if (!_.isEmpty(errors)) {
        dispatch(setSubmitFailed(formName, ...fields))
      }
    }
  }
}

export const formClearValidation = (dispatch) => {
  return (formName) => {
    dispatch(clearSubmitErrors(formName))
    dispatch(setSubmitSucceeded(formName))
  }
}

export const ActionList = [
  { name: ah.InitValues, action: formInitValues, propName: 'FormInitValues' },
  { name: ah.ResetValues, action: formResetValues, propName: 'FormResetValues' },
  { name: ah.Submit, action: formSubmit, propName: 'FormSubmit' },
  { name: ah.Destroy, action: formDestroy, propName: 'FormDestroy' },
  { name: ah.SetFieldValue, action: formSetFieldValue, propName: 'FormSetFieldValue' },
  { name: ah.SetValidation, action: formSetValidation, propName: 'FormSetValidation' },
  { name: ah.ClearValidation, action: formClearValidation, propName: 'FormClearValidation' }
]

export default ActionList
