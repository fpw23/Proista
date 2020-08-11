import { ah } from './Types'
import { AsDispatch } from '@proista/client-data/lib/AsDispatch'

export const HideDrawer = (key) => {
  return {
    type: ah.Hide,
    payload: {
      key
    }
  }
}

export const ShowDrawer = (key, props, anchor) => {
  return {
    type: ah.Show,
    payload: {
      key,
      props,
      anchor
    }
  }
}

export const RegisterDrawer = (key, component) => {
  return {
    type: ah.Register,
    payload: {
      key,
      component
    }
  }
}

export const UnregisterDrawer = (key) => {
  return {
    type: ah.Unregister,
    payload: {
      key
    }
  }
}

export const ActionList = [
  { name: ah.Show, action: AsDispatch(ShowDrawer), propName: 'DrawerShow' },
  { name: ah.Hide, action: AsDispatch(HideDrawer), propName: 'DrawerHide' },
  { name: ah.Register, action: AsDispatch(RegisterDrawer), propName: 'DrawerRegister' },
  { name: ah.Unregister, action: AsDispatch(UnregisterDrawer), propName: 'DrawerUnregister' }
]

export default ActionList
