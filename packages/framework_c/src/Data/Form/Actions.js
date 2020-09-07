import {
  initialize, reset, submit, destroy, change, clearSubmitErrors, setSubmitFailed, stopSubmit, setSubmitSucceeded, clearFields,
  arrayInsert, arrayMove, arrayPop, arrayPush, arrayRemove, arrayRemoveAll, arrayShift, arraySplice, arraySwap, arrayUnshift
} from 'redux-form'
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

export const formClearFields = (dispatch) => {
  return (formName, keepTouched = false, persistentSubmitErrors = false, fields = []) => {
    dispatch(clearFields(formName, keepTouched, persistentSubmitErrors, ...fields))
  }
}

export const formClearValidation = (dispatch) => {
  return (formName) => {
    dispatch(clearSubmitErrors(formName))
    dispatch(setSubmitSucceeded(formName))
  }
}

export const formArrayInsert = (dispatch) => {
  return (formName, fieldName, value) => {
    dispatch(arrayInsert(formName, fieldName, value))
  }
}

export const formArrayPush = (dispatch) => {
  return (formName, fieldName, value) => {
    dispatch(arrayPush(formName, fieldName, value))
  }
}

export const formArrayPop = (dispatch) => {
  return (formName, fieldName) => {
    dispatch(arrayPop(formName, fieldName))
  }
}

export const formArrayMove = (dispatch) => {
  return (formName, fieldName, from, to) => {
    dispatch(arrayMove(formName, fieldName, from, to))
  }
}

export const formArrayRemove = (dispatch) => {
  return (formName, fieldName, index) => {
    dispatch(arrayRemove(formName, fieldName, index))
  }
}

export const formArrayRemoveAll = (dispatch) => {
  return (formName, fieldName) => {
    dispatch(arrayRemoveAll(formName, fieldName))
  }
}

export const formArrayShift = (dispatch) => {
  return (formName, fieldName) => {
    dispatch(arrayShift(formName, fieldName))
  }
}

export const formArrayUnshift = (dispatch) => {
  return (formName, fieldName, value) => {
    dispatch(arrayUnshift(formName, fieldName, value))
  }
}

export const formArraySplice = (dispatch) => {
  return (formName, fieldName, index, removeNum, value) => {
    dispatch(arraySplice(formName, fieldName, index, removeNum, value))
  }
}

export const formArraySwap = (dispatch) => {
  return (formName, fieldName, indexA, indexB) => {
    dispatch(arraySwap(formName, fieldName, indexA, indexB))
  }
}

export const ActionList = [
  { name: ah.InitValues, action: formInitValues, propName: 'FormInitValues' },
  { name: ah.ResetValues, action: formResetValues, propName: 'FormResetValues' },
  { name: ah.Submit, action: formSubmit, propName: 'FormSubmit' },
  { name: ah.Destroy, action: formDestroy, propName: 'FormDestroy' },
  { name: ah.SetFieldValue, action: formSetFieldValue, propName: 'FormSetFieldValue' },
  { name: ah.SetValidation, action: formSetValidation, propName: 'FormSetValidation' },
  { name: ah.ClearValidation, action: formClearValidation, propName: 'FormClearValidation' },
  { name: ah.ClearFields, action: formClearFields, propName: 'FormClearFields' },
  { name: ah.ArrayPush, action: formArrayPush, propName: 'FormArrayPush' },
  { name: ah.ArrayPop, action: formArrayPop, propName: 'FormArrayPop' },
  { name: ah.ArrayInsert, action: formArrayInsert, propName: 'FormArrayInsert' },
  { name: ah.ArrayMove, action: formArrayMove, propName: 'FormArrayMove' },
  { name: ah.ArrayRemove, action: formArrayRemove, propName: 'FormArrayRemove' },
  { name: ah.ArrayRemoveAll, action: formArrayRemoveAll, propName: 'FormArrayRemoveAll' },
  { name: ah.ArrayShift, action: formArrayShift, propName: 'FormArrayShift' },
  { name: ah.ArrayUnshift, action: formArrayUnshift, propName: 'FormArrayUnshift' },
  { name: ah.ArraySplice, action: formArraySplice, propName: 'FormArraySplice' },
  { name: ah.ArraySwap, action: formArraySwap, propName: 'FormArraySwap' }
]

export default ActionList
