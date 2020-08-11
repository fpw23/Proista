import _ from 'lodash'

const ReduxStates = []
const ReduxActions = []

export const RegisterStates = (stateList) => {
  ReduxStates.push(...stateList)
}

export const RegisterActions = (actionList) => {
  ReduxActions.push(...actionList)
}

export const FindRegisteredState = (filter) => {
  return _.find(ReduxStates, filter)
}

export const FindRegisteredAction = (filter) => {
  return _.find(ReduxActions, filter)
}
