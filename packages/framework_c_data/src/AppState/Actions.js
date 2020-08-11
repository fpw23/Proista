import { AsDispatch } from '../AsDispatch'
import { ah } from './Types'

export const SetValue = (key, prop, value) => {
  return {
    type: ah.SetValue,
    payload: {
      key,
      prop,
      value
    }
  }
}

export const AppendArrayValue = (key, prop, value) => {
  return {
    type: ah.AppendArrayValue,
    payload: {
      key,
      prop,
      value
    }
  }
}

export const UpdateArrayValue = (key, prop, filterFunction, updateFunction, modifyFunction) => {
  return {
    type: ah.UpdateArrayValue,
    payload: {
      key,
      prop,
      filterFunction,
      updateFunction,
      modifyFunction
    }
  }
}

export const ClearArrayValue = (key, prop) => {
  return {
    type: ah.ClearArrayValue,
    payload: {
      key,
      prop
    }
  }
}

export const ClearValue = (key, prop) => {
  return {
    type: ah.ClearValue,
    payload: {
      key,
      prop
    }
  }
}

export const ActionList = [
  { name: ah.ClearValue, action: AsDispatch(ClearValue), propName: 'AppStateClearValue' },
  { name: ah.SetValue, action: AsDispatch(SetValue), propName: 'AppStateSetValue' },
  { name: ah.AppendArrayValue, action: AsDispatch(AppendArrayValue), propName: 'AppStateAppendArray' },
  { name: ah.UpdateArrayValue, action: AsDispatch(UpdateArrayValue), propName: 'AppStateUpdateArray' },
  { name: ah.ClearArrayValue, action: AsDispatch(ClearArrayValue), propName: 'AppStateClearArray' }
]

export default ActionList
