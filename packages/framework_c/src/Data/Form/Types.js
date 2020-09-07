export const ah = {
  Prefix: 'FORM_',
  InitValues: 'FORM_INITVALUES',
  ResetValues: 'FORM_RESETVALUES',
  Submit: 'FORM_SUBMIT',
  Destory: 'FORM_DESTORY',
  SetFieldValue: 'FORM_SETFIELDVALUE',
  SetValidation: 'FORM_SETVALIDATION',
  ClearValidation: 'FORM_CLEARVALIDATION',
  ClearFields: 'FORM_CLEARFIELDS',
  ArrayInsert: 'FORM_ARRAYINSERT',
  ArrayPush: 'FORM_ARRAYPUSH',
  ArrayPop: 'FORM_ARRAYPOP',
  ArrayMove: 'FORM_ARRAYMOVE',
  ArrayRemove: 'FORM_ARRAYREMOVE',
  ArrayRemoveAll: 'FORM_ARRAYREMOVEALL',
  ArrayShift: 'FORM_ARRAYSHIFT',
  ArrayUnshift: 'FORM_ARRAYUNSHIFT',
  ArraySplice: 'FORM_ARRAYSPLICE',
  ArraySwap: 'FORM_ARRAYSWAP'
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
