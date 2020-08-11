import { ah } from './Types'
import { AsDispatch } from '@proista/client-data/lib/AsDispatch'

export const SetNewLocation = (pathname, search, hash) => {
  return {
    type: ah.SetNewLocation,
    payload: {
      pathname,
      search,
      hash
    }
  }
}

export const AddPathName = (key, value, disabled) => {
  return {
    type: ah.AddPathName,
    payload: {
      key,
      value,
      disabled: disabled === true
    }
  }
}

export const ClearPathNames = () => {
  return {
    type: ah.ClearPathNames
  }
}

export const ActionList = [
  { name: ah.SetNewLocation, action: AsDispatch(SetNewLocation), propName: 'RouterSetNewLocation' },
  { name: ah.AddPathName, action: AsDispatch(AddPathName), propName: 'RouterAddPathName' },
  { name: ah.ClearPathNames, action: AsDispatch(ClearPathNames), propName: 'RouterClearPathNames' }
]

export default ActionList
