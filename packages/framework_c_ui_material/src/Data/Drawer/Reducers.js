import { ah } from './Types'
import _ from 'lodash'

const actions = {}

actions[ah.Register] = (state, action) => {
  const newState = _.merge({}, state)

  if (_.find(newState.drawers, { key: action.payload.key })) {
    throw new Error(`Drawer with key '${action.payload.key}' has already been registered!`)
  }

  newState.drawers = _.concat(newState.drawers, {
    key: action.payload.key,
    component: action.payload.component,
    isOpen: false,
    props: undefined
  })
  return newState
}

actions[ah.Show] = (state, action) => {
  const newState = _.merge({}, state)

  const foundDrawer = _.find(newState.drawers, { key: action.payload.key })

  if (!foundDrawer) {
    throw new Error(`Drawer with key '${action.payload.key}' does not exist!`)
  }

  foundDrawer.isOpen = true
  foundDrawer.props = action.payload.props
  foundDrawer.anchor = action.payload.anchor || 'right'

  return newState
}

actions[ah.Hide] = (state, action) => {
  const newState = _.merge({}, state)

  const foundDrawer = _.find(newState.drawers, { key: action.payload.key })

  if (!foundDrawer) {
    throw new Error(`Drawer with key '${action.payload.key}' does not exist!`)
  }

  foundDrawer.isOpen = false
  foundDrawer.props = undefined

  return newState
}

actions[ah.Unregister] = (state, action) => {
  const newState = _.merge({}, state)

  if (action.payload.key === 'all') {
    newState.drawers = []
  } else {
    newState.drawers = _.reject(newState.drawers, { key: action.payload.key })
  }
  return newState
}

export default (state = {
  drawers: []
}, action) => {
  if (_.startsWith(action.type, ah.Prefix)) {
    return actions[action.type](state, action)
  } else {
    return state
  }
}
