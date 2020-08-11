import { sh } from './Types'
export const DrawerList = (state) => {
  return state.Drawer.drawers || []
}

export const StateList = [
  { name: sh.DrawerList, action: DrawerList, propName: 'DrawerList' }
]

export default StateList
