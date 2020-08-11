import _ from 'lodash'
import fs from 'fs'
import path from 'path'

export const BuildStaticEndPointsFromFolder = (folder) => {
  const ret = []

  if (_.isString(folder) && folder !== '') {
    const subFolders = fs.readdirSync(folder, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    _.each(subFolders, (sf) => {
      const indexFile = path.join(folder, sf, 'index.js')

      if (fs.existsSync(indexFile)) {
        const endPoint = require(indexFile).default
        ret.push(endPoint)
      }
    })
  }

  return ret
}
export const EndPointRoutes = ({
  staticEndPointsFolder = '',
  staticEndPoints = undefined,
  dynamicEndPointResolver = undefined
}) => {
  let eps
  let findEndPoint = (path) => { return _.find(eps, (ep) => { return _.startsWith(path, ep.name) }) }
  if (_.isArray(staticEndPoints)) {
    eps = staticEndPoints
    if (eps.length === 0) {
      console.warn('Passed in endpoints was an empty array!')
    }
  } else if (_.isFunction(dynamicEndPointResolver) === true) {
    findEndPoint = dynamicEndPointResolver
  } else if (_.isString(staticEndPointsFolder)) {
    eps = BuildStaticEndPointsFromFolder(staticEndPointsFolder)
    if (eps.length === 0) {
      console.warn(`Built static endpoints from folder ${staticEndPointsFolder} but result was empty array!`)
    }
  } else {
    throw new Error('EndPointRoutes must be called with either an endpoint array or a folder to process static endpoints from!')
  }

  return (req, res, next) => {
    if (req.method !== 'POST') {
      return next()
    }
    const foundEndPoint = findEndPoint(req.path)
    if (foundEndPoint) {
      const routeName = req.path.substring(foundEndPoint.name.length)
      const foundRoute = _.find(foundEndPoint.routes, { path: routeName })
      if (foundRoute) {
        return foundRoute.controller(req, res)
      } else {
        return next()
      }
    } else {
      return next()
    }
  }
}
