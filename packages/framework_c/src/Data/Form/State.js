import { getFormValues, isDirty, isValid } from 'redux-form'

export const FormData = (formName) => {
  return (state) => {
    return getFormValues(formName)(state) || {}
  }
}

export const FormState = (formName) => {
  return (state) => {
    return {
      IsDirty: isDirty(formName)(state),
      IsValid: isValid(formName)(state)
    }
  }
}

export const StateList = [
  { name: 'FORM_DATA', action: FormData, propName: 'FormData' },
  { name: 'FORM_STATE', action: FormState, propName: 'FormState' }
]

export default StateList
