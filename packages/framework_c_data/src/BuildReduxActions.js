import _ from 'lodash'
import { FindRegisteredAction } from './DataManager'

export const BuildReduxActions = (actions) => {
  return (dispatch) => {
    const ret = {}
    _.forEach(actions, (a) => {
      try {
        const match = FindRegisteredAction({ name: a })
        if (match) {
          ret[match.propName || match.name] = match.action(dispatch)
        } else {

        }
      } catch (err) {
        throw Error(`Error setting dispatch function for action '${a}'`)
      }
    })
    return ret
  }
}

export default BuildReduxActions
