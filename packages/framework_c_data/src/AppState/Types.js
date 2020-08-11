export const ah = {
  Prefix: 'APPSTATE_',
  SetValue: 'APPSTATE_SETVALUE',
  ClearValue: 'APPSTATE_CLEARVALUE',
  AppendArrayValue: 'APPSTATE_APPENDARRAYVALUE',
  UpdateArrayValue: 'APPSTATE_UPDATEARRAYVALUE',
  ClearArrayValue: 'APPSTATE_CLEARARRAYVALUE'
}

export const sh = {
  Prefix: 'APPSTATE_',
  GetValues: function (appStateKey, propName) {
    return {
      name: 'APPSTATE_GETVALUES',
      propName: propName,
      args: [appStateKey]
    }
  }
}
