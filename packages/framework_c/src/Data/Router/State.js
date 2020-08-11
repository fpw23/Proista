import { sh } from './Types'
export const CurrentRoute = (state) => {
  return {
    pathname: state.Router.currentRoute.pathname,
    search: state.Router.currentRoute.search,
    hash: state.Router.currentRoute.hash
  }
}

export const PathNames = (state) => {
  return state.Router.pathNames || []
}

export const StateList = [
  { name: sh.CurrentRoute, action: CurrentRoute, propName: 'RouterCurrentRoute' },
  { name: sh.PathNames, action: PathNames, propName: 'RouterPathNames' }
]

export default StateList
