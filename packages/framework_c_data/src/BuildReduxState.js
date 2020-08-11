import _ from 'lodash'
import { FindRegisteredState } from './DataManager'

export const BuildReduxState = (states) => {
  return (state) => {
    const ret = {}
    _.forEach(states, (s) => {
      if (_.isPlainObject(s)) {
        const match = FindRegisteredState({ name: s.name })
        if (match) {
          ret[s.propName || match.propName || match.name] = match.action(...s.args)(state)
        } else {
          throw Error(`Unable to get state from function for ${s.name}`)
        }
      } else if (_.isString(s)) {
        const match = FindRegisteredState({ name: s })
        if (match) {
          ret[match.propName || match.name] = match.action(state)
        } else {
          throw Error(`Unable to get state from string for ${s}`)
        }
      } else {
        throw Error(`Unable to get state, passed in name ${s} must be a function or string`)
      }
    })
    return ret
  }
}

export default BuildReduxState
