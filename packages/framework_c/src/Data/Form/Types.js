export const ah = {
  Prefix: 'FORM_',
  InitValues: 'FORM_INITVALUES',
  ResetValues: 'FORM_RESETVALUES',
  Submit: 'FORM_SUBMIT',
  Destory: 'FORM_DESTORY',
  SetFieldValue: 'FORM_SETFIELDVALUE',
  SetValidation: 'FORM_SETVALIDATION',
  ClearValidation: 'FORM_CLEARVALIDATION',
  ClearFields: 'FORM_CLEARFIELDS'
}

export const sh = {
  Prefix: 'FORM_',
  Data: function (formName, propName) {
    return {
      name: 'FORM_DATA',
      propName: propName,
      args: [formName]
    }
  },
  State: function (formName, propName) {
    return {
      name: 'FORM_STATE',
      propName: propName,
      args: [formName]
    }
  }
}
