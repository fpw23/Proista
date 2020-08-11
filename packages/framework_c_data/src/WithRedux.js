import { connect } from 'react-redux'
import BuildReduxActions from './BuildReduxActions'
import BuildReduxState from './BuildReduxState'

export const WithRedux = (states = [], actions = []) => {
  return connect(
    BuildReduxState(states),
    BuildReduxActions(actions)
  )
}
