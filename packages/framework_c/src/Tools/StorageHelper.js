var sessionStorageManager = require('store2').session
var localStorageManager = require('store2')

var getSessionData = (key) => {
  return sessionStorageManager.get(key)
}

var saveSessionData = (key, value) => {
  sessionStorageManager.set(key, value)
}

var getLocalData = (key) => {
  return localStorageManager.get(key)
}

var saveLocalData = (key, value) => {
  localStorageManager.set(key, value)
}

export const Storage = {
  Get: getSessionData,
  Save: saveSessionData,
  GetLocal: getLocalData,
  SaveLocal: saveLocalData,
  GetSession: getSessionData,
  SaveSession: saveSessionData
}
export default Storage
